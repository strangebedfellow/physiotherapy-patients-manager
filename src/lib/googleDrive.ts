/**
 * Dokumenty pacjentów na Google Drive.
 *
 * Autoryzacja: Google Identity Services (token client) — zastępuje wyłączone
 * przez Google `gapi.auth2` / `react-google-login`. Zapytania: Drive API v3 przez fetch.
 * Pliki pacjenta rozpoznajemy po nazwie zawierającej jego ID z Firebase.
 */

const GIS_SCRIPT_SRC = 'https://accounts.google.com/gsi/client'
const DRIVE_SCOPE = 'https://www.googleapis.com/auth/drive'
const DRIVE_API = 'https://www.googleapis.com/drive/v3'
const DRIVE_UPLOAD_API = 'https://www.googleapis.com/upload/drive/v3'
/** Folder, do którego aplikacja wysyłała dokumenty przed migracją. */
const LEGACY_FOLDER_ID = '17Ui0Dd04vmg1Mnmxa3lao-fJtubzEw4X'

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
const uploadFolderId = import.meta.env.VITE_GOOGLE_DRIVE_FOLDER_ID || LEGACY_FOLDER_ID

export const isDriveConfigured = Boolean(clientId)

/** Błąd wymagający ponownego zalogowania do Google (np. zamknięte okno, wygasła sesja). */
export class DriveAuthError extends Error {}

export interface DriveFile {
  id: string
  name: string
  mimeType: string
  thumbnailLink?: string
  webViewLink?: string
}

const DISPLAYABLE_IMAGE_TYPES = new Set(['image/jpeg', 'image/png', 'image/gif', 'image/webp'])
export const isDisplayableImage = (file: DriveFile) => DISPLAYABLE_IMAGE_TYPES.has(file.mimeType)

let gisScript: Promise<void> | null = null

/** Ładuje skrypt GIS; warto wywołać zawczasu, żeby okno logowania otworzyło się od razu po kliknięciu. */
export function loadGoogleIdentity(): Promise<void> {
  if (typeof google !== 'undefined' && google.accounts?.oauth2) return Promise.resolve()
  gisScript ??= new Promise<void>((resolve, reject) => {
    const script = document.createElement('script')
    script.src = GIS_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => {
      gisScript = null
      script.remove()
      reject(new Error('Nie udało się załadować logowania Google. Sprawdź połączenie z internetem.'))
    }
    document.head.appendChild(script)
  })
  return gisScript
}

let cachedToken: { value: string; expiresAt: number } | null = null
let pendingToken: Promise<string> | null = null
let hasConsented = false

async function requestToken(): Promise<string> {
  if (!clientId) throw new Error('Brak VITE_GOOGLE_CLIENT_ID w pliku .env.')
  await loadGoogleIdentity()

  return new Promise<string>((resolve, reject) => {
    const client = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: DRIVE_SCOPE,
      callback: (response) => {
        if (response.error) {
          reject(new DriveAuthError(response.error_description || response.error))
          return
        }
        hasConsented = true
        // Odświeżamy minutę przed faktycznym wygaśnięciem.
        const lifetimeMs = (Number(response.expires_in) - 60) * 1000
        cachedToken = { value: response.access_token, expiresAt: Date.now() + lifetimeMs }
        resolve(response.access_token)
      },
      error_callback: (error) => {
        const message =
          error.type === 'popup_failed_to_open'
            ? 'Przeglądarka zablokowała okno logowania Google. Zezwól na wyskakujące okna i spróbuj ponownie.'
            : 'Logowanie do Google zostało przerwane.'
        reject(new DriveAuthError(message))
      },
    })
    // Po pierwszej zgodzie nie pokazujemy ponownie wyboru konta.
    client.requestAccessToken(hasConsented ? { prompt: '' } : undefined)
  })
}

/** Token dostępu do Drive; w razie potrzeby otwiera okno logowania Google. */
export function getAccessToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.expiresAt) return Promise.resolve(cachedToken.value)
  // Współbieżne wywołania (np. StrictMode) czekają na to samo okno logowania.
  pendingToken ??= requestToken().finally(() => {
    pendingToken = null
  })
  return pendingToken
}

/** Google API zwraca błędy jako { error: { message } } — wyciągamy sam komunikat. */
async function readApiError(response: Response) {
  const body = await response.text()
  try {
    const parsed = JSON.parse(body) as { error?: { message?: string } }
    return parsed.error?.message ?? body
  } catch {
    return body || response.statusText
  }
}

async function driveFetch(url: string, init: RequestInit & { headers?: Record<string, string> } = {}) {
  const token = await getAccessToken()
  const response = await fetch(url, {
    ...init,
    headers: { ...init.headers, Authorization: `Bearer ${token}` },
  })
  if (response.status === 401) {
    cachedToken = null
    throw new DriveAuthError('Sesja Google wygasła. Zaloguj się ponownie.')
  }
  if (!response.ok) {
    throw new Error(`Błąd Google Drive (${response.status}): ${await readApiError(response)}`)
  }
  return response
}

const escapeQueryValue = (value: string) => value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

export async function listPatientFiles(patientId: string): Promise<DriveFile[]> {
  const id = escapeQueryValue(patientId)
  const query = `(name = '${id}' or name contains '${id}') and trashed = false`
  const files: DriveFile[] = []
  let pageToken: string | undefined

  do {
    const params = new URLSearchParams({
      q: query,
      fields: 'nextPageToken, files(id, name, mimeType, thumbnailLink, webViewLink)',
      pageSize: '1000',
    })
    if (pageToken) params.set('pageToken', pageToken)
    const response = await driveFetch(`${DRIVE_API}/files?${params}`)
    const page = (await response.json()) as { files?: DriveFile[]; nextPageToken?: string }
    files.push(...(page.files ?? []))
    pageToken = page.nextPageToken
  } while (pageToken)

  return files.filter((file) => file.name.includes(patientId))
}

/** Pobiera treść pliku i zwraca adres blob: (zwolnij go przez URL.revokeObjectURL). */
export async function fetchFileObjectUrl(fileId: string): Promise<string> {
  const response = await driveFetch(`${DRIVE_API}/files/${encodeURIComponent(fileId)}?alt=media`)
  return URL.createObjectURL(await response.blob())
}

/** Wysyła plik do folderu dokumentów; nazwa pliku = ID pacjenta (jak w poprzedniej wersji). */
export async function uploadPatientFile(file: File, patientId: string): Promise<void> {
  const boundary = `physio-${crypto.randomUUID()}`
  const contentType = file.type || 'application/octet-stream'
  const metadata = { name: patientId, mimeType: contentType, parents: [uploadFolderId] }

  const body = new Blob([
    `--${boundary}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`,
    `--${boundary}\r\nContent-Type: ${contentType}\r\n\r\n`,
    file,
    `\r\n--${boundary}--`,
  ])

  await driveFetch(`${DRIVE_UPLOAD_API}/files?uploadType=multipart&fields=id`, {
    method: 'POST',
    headers: { 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
  })
}

export const errorMessage = (error: unknown) =>
  error instanceof Error ? error.message : 'Wystąpił nieznany błąd.'
