import { useCallback, useEffect, useState, type DragEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import IconButton from '@mui/material/IconButton'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined'
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined'
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined'
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined'
import SendIcon from '@mui/icons-material/Send'
import { ACCEPTED_FILE_TYPES, formatFileSize, isAcceptedFile, pluralizeDocuments } from '../lib/files'
import { errorMessage, isDriveConfigured, loadGoogleIdentity, uploadPatientFile } from '../lib/googleDrive'

type FileStatus = 'pending' | 'uploading' | 'done' | 'error'

interface SelectedFile {
  key: number
  file: File
  status: FileStatus
  error?: string
}

let nextFileKey = 0

/** Miniatura zdjęcia albo ikona typu dokumentu. */
function FileThumbnail({ file }: { file: File }) {
  // np. HEIC z telefonu — przeglądarka nie wyświetli, pokazujemy ikonę.
  const [previewFailed, setPreviewFailed] = useState(false)

  // Adres blob: żyje tyle, co element <img> (callback ref ze sprzątaniem, React 19).
  const attachPreview = useCallback(
    (img: HTMLImageElement | null) => {
      if (!img) return
      const url = URL.createObjectURL(file)
      img.src = url
      return () => URL.revokeObjectURL(url)
    },
    [file],
  )

  if (file.type.startsWith('image/') && !previewFailed) {
    return (
      <img
        ref={attachPreview}
        alt=""
        className="size-12 shrink-0 rounded object-cover"
        onError={() => setPreviewFailed(true)}
      />
    )
  }

  const Icon = file.type === 'application/pdf' ? PictureAsPdfOutlinedIcon : DescriptionOutlinedIcon
  return (
    <div className="flex size-12 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500">
      <Icon />
    </div>
  )
}

/** Formularz wysyłki dokumentów — treść i przyciski okna dialogowego AddPatientDocument. */
export default function AddDoc({ id, onClose }: { id: string; onClose: () => void }) {
  const [files, setFiles] = useState<SelectedFile[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [skippedCount, setSkippedCount] = useState(0)

  // Wczesne załadowanie GIS — okno logowania Google otworzy się od razu po kliknięciu „Wyślij”.
  useEffect(() => {
    if (isDriveConfigured) loadGoogleIdentity().catch(console.error)
  }, [])

  const queued = files.filter((item) => item.status === 'pending' || item.status === 'error')
  const hasErrors = files.some((item) => item.status === 'error')
  const allDone = files.length > 0 && files.every((item) => item.status === 'done')

  const addFiles = (fileList: FileList | null) => {
    const selected = Array.from(fileList ?? [])
    const accepted = selected.filter(isAcceptedFile)
    setSkippedCount(selected.length - accepted.length)
    setFiles((current) => [
      ...current,
      ...accepted.map((file): SelectedFile => ({ key: ++nextFileKey, file, status: 'pending' })),
    ])
  }

  const updateFile = (key: number, patch: Partial<SelectedFile>) =>
    setFiles((current) => current.map((item) => (item.key === key ? { ...item, ...patch } : item)))

  const removeFile = (key: number) => setFiles((current) => current.filter((item) => item.key !== key))

  const upload = async () => {
    const batch = queued
    const keys = new Set(batch.map((item) => item.key))
    setUploading(true)
    setSkippedCount(0)
    setFiles((current) =>
      current.map((item) => (keys.has(item.key) ? { ...item, status: 'uploading', error: undefined } : item)),
    )
    await Promise.all(
      batch.map(async (item) => {
        try {
          await uploadPatientFile(item.file, id)
          updateFile(item.key, { status: 'done' })
        } catch (error) {
          updateFile(item.key, { status: 'error', error: errorMessage(error) })
        }
      }),
    )
    setUploading(false)
  }

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    if (!uploading) setDragging(true)
  }

  const handleDragLeave = (event: DragEvent<HTMLLabelElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setDragging(false)
  }

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault()
    setDragging(false)
    if (!uploading) addFiles(event.dataTransfer.files)
  }

  if (allDone) {
    return (
      <>
        <DialogContent>
          <Alert severity="success">Dodano {pluralizeDocuments(files.length)}!</Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFiles([])}>Dodaj kolejne</Button>
          <Button variant="contained" onClick={onClose}>
            Zamknij
          </Button>
        </DialogActions>
      </>
    )
  }

  const dropZoneState = dragging
    ? 'border-brand bg-brand-light'
    : 'border-gray-300 bg-gray-50 hover:border-brand hover:bg-brand-light'

  return (
    <>
      <DialogContent className="flex flex-col gap-4">
        {!isDriveConfigured && (
          <Alert severity="warning">
            Moduł dokumentów jest wyłączony — ustaw <code>VITE_GOOGLE_CLIENT_ID</code> w pliku <code>.env</code>.
          </Alert>
        )}

        <label
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex cursor-pointer flex-col items-center gap-1 rounded-lg border-2 border-dashed px-6 py-8 text-center transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${dropZoneState} ${uploading ? 'pointer-events-none opacity-60' : ''}`}
        >
          <CloudUploadOutlinedIcon className="text-brand" sx={{ fontSize: 48 }} />
          <span className="font-medium text-gray-800">
            Przeciągnij pliki tutaj lub <span className="text-brand underline">wybierz z komputera</span>
          </span>
          <span className="text-sm text-gray-500">Zdjęcia, PDF lub Word · można dodać kilka plików naraz</span>
          <input
            type="file"
            multiple
            accept={ACCEPTED_FILE_TYPES}
            className="sr-only"
            disabled={uploading}
            onChange={(event) => {
              addFiles(event.target.files)
              // Pozwala ponownie wybrać ten sam plik po usunięciu go z listy.
              event.target.value = ''
            }}
          />
        </label>

        {skippedCount > 0 && (
          <Alert severity="info" onClose={() => setSkippedCount(0)}>
            Pominięto pliki w nieobsługiwanym formacie ({skippedCount}). Dozwolone są zdjęcia, PDF i Word.
          </Alert>
        )}

        {files.length > 0 && (
          <ul className="flex flex-col gap-2" aria-label="Wybrane pliki">
            {files.map((item) => (
              <li key={item.key} className="flex items-center gap-3 rounded-lg border border-gray-200 p-2">
                <FileThumbnail file={item.file} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900" title={item.file.name}>
                    {item.file.name}
                  </p>
                  {item.status === 'error' ? (
                    <p className="line-clamp-2 text-xs text-red-600" title={item.error}>
                      {item.error}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500">{formatFileSize(item.file.size)}</p>
                  )}
                </div>
                {item.status === 'uploading' && <CircularProgress size={22} aria-label="Wysyłanie" />}
                {item.status === 'done' && <CheckCircleIcon color="success" aria-label="Wysłano" />}
                {item.status === 'error' && <ErrorOutlinedIcon color="error" aria-label="Błąd wysyłania" />}
                {(item.status === 'pending' || item.status === 'error') && (
                  <IconButton
                    size="small"
                    onClick={() => removeFile(item.key)}
                    disabled={uploading}
                    aria-label={`Usuń ${item.file.name} z listy`}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </li>
            ))}
          </ul>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} disabled={uploading}>
          Anuluj
        </Button>
        <Button
          variant="contained"
          color="secondary"
          disabled={!isDriveConfigured || uploading || queued.length === 0}
          endIcon={uploading ? <CircularProgress size={18} color="inherit" /> : <SendIcon />}
          onClick={() => void upload()}
        >
          {uploading
            ? 'Wysyłanie…'
            : hasErrors
              ? 'Wyślij ponownie'
              : queued.length > 1
                ? `Wyślij (${queued.length})`
                : 'Wyślij'}
        </Button>
      </DialogActions>
    </>
  )
}
