import { Fragment, useEffect, useState } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import Divider from '@mui/material/Divider'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import documentIcon from '../img/document.jpg'
import {
  errorMessage,
  fetchFileObjectUrl,
  getAccessToken,
  isDisplayableImage,
  isDriveConfigured,
  listPatientFiles,
  type DriveFile,
} from '../lib/googleDrive'

interface LoadedImage {
  id: string
  name: string
  url: string
}

type DocsState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; images: LoadedImage[]; documents: DriveFile[] }

function DocumentThumbnail({ file }: { file: DriveFile }) {
  const [failed, setFailed] = useState(false)
  const src = file.thumbnailLink && !failed ? file.thumbnailLink : documentIcon
  return (
    <a href={file.webViewLink} target="_blank" rel="noreferrer" title={file.name}>
      <img referrerPolicy="no-referrer" src={src} alt={file.name} className="max-w-[300px]" onError={() => setFailed(true)} />
    </a>
  )
}

export default function GetDocs({ id }: { id: string }) {
  const [state, setState] = useState<DocsState>({ status: 'loading' })
  const [attempt, setAttempt] = useState(0)
  const [lightboxIndex, setLightboxIndex] = useState(-1)

  useEffect(() => {
    if (!isDriveConfigured) return
    let cancelled = false
    const objectUrls: string[] = []

    const load = async () => {
      try {
        const files = await listPatientFiles(id)
        const images = await Promise.all(
          files.filter(isDisplayableImage).map(async (file) => {
            const url = await fetchFileObjectUrl(file.id)
            objectUrls.push(url)
            return { id: file.id, name: file.name, url }
          }),
        )
        if (cancelled) {
          objectUrls.forEach((url) => URL.revokeObjectURL(url))
          return
        }
        setState({ status: 'ready', images, documents: files.filter((file) => !isDisplayableImage(file)) })
      } catch (error) {
        if (!cancelled) setState({ status: 'error', message: errorMessage(error) })
      }
    }
    void load()

    return () => {
      cancelled = true
      objectUrls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [id, attempt])

  // Logowanie musi wyjść z kliknięcia, inaczej przeglądarka zablokuje okno Google.
  const signInAndRetry = () => {
    setState({ status: 'loading' })
    getAccessToken()
      .then(() => setAttempt((current) => current + 1))
      .catch((error: unknown) => setState({ status: 'error', message: errorMessage(error) }))
  }

  if (!isDriveConfigured) {
    return (
      <div className="m-10 max-w-[500px]">
        <Alert severity="warning">
          Moduł dokumentów jest wyłączony — ustaw <code>VITE_GOOGLE_CLIENT_ID</code> w pliku <code>.env</code>.
        </Alert>
      </div>
    )
  }

  if (state.status === 'loading') {
    return (
      <div className="m-10 flex items-center justify-center p-20">
        <CircularProgress />
      </div>
    )
  }

  if (state.status === 'error') {
    return (
      <div className="m-10 flex min-w-[min(500px,80vw)] flex-col gap-4">
        <Alert severity="error">Błąd! {state.message}</Alert>
        <Button variant="contained" color="primary" onClick={signInAndRetry}>
          Zaloguj do Google i spróbuj ponownie
        </Button>
      </div>
    )
  }

  const { images, documents } = state

  return (
    <div className="w-[800px] max-w-full">
      {images.length === 0 && documents.length === 0 && (
        <Alert severity="warning" className="m-10">
          Brak dokumentów!
        </Alert>
      )}
      {documents.map((file) => (
        <Fragment key={file.id}>
          <div className="my-4 flex items-center justify-center">
            <DocumentThumbnail file={file} />
          </div>
          <Divider variant="middle" />
        </Fragment>
      ))}
      {images.map((image, index) => (
        <Fragment key={image.id}>
          <div className="my-4 flex items-center justify-center">
            <button type="button" className="cursor-zoom-in" onClick={() => setLightboxIndex(index)}>
              <img src={image.url} alt={image.name} className="w-[200px]" />
            </button>
          </div>
          <Divider variant="middle" />
        </Fragment>
      ))}
      <Lightbox
        open={lightboxIndex >= 0}
        index={Math.max(lightboxIndex, 0)}
        close={() => setLightboxIndex(-1)}
        slides={images.map((image) => ({ src: image.url, alt: image.name }))}
      />
    </div>
  )
}
