import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import { signOut } from 'firebase/auth'
import { isPermissionDenied } from '../lib/db'
import { auth } from '../lib/firebase'

/** Ekran zamiast pustej strony, gdy reguły bazy odmówiły dostępu do listy pacjentów. */
export default function AccessDenied({ error }: { error: Error }) {
  const user = auth.currentUser

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert
        severity="error"
        className="max-w-xl"
        action={
          <Button color="inherit" size="small" onClick={() => void signOut(auth)}>
            Wyloguj
          </Button>
        }
      >
        {isPermissionDenied(error) ? (
          <>
            <AlertTitle>Brak dostępu do danych pacjentów</AlertTitle>
            <p>
              Konto <strong>{user?.email}</strong> nie ma uprawnień. Administrator musi dopisać jego UID do reguł
              bazy (Firebase → Realtime Database → Rules, plik <code>database.rules.json</code>).
            </p>
            <p className="mt-2">
              UID: <code className="select-all rounded bg-red-50 px-1">{user?.uid}</code>
            </p>
          </>
        ) : (
          <>
            <AlertTitle>Nie udało się wczytać danych</AlertTitle>
            <p>{error.message}</p>
          </>
        )}
      </Alert>
    </div>
  )
}
