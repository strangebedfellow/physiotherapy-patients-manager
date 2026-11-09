import { useState, type FormEvent } from 'react'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import logoSrc from '../img/klogo.jpg'
import { auth } from '../lib/firebase'

const signInErrors: Record<string, string> = {
  'auth/invalid-email': 'Błędny adres e-mail',
  'auth/user-not-found': 'Nie znaleziono użytkownika',
  'auth/wrong-password': 'Błędne hasło',
  // Nowsze projekty Firebase (ochrona przed enumeracją e-maili) zwracają tylko ten kod.
  'auth/invalid-credential': 'Błędny użytkownik lub hasło',
  'auth/too-many-requests': 'Zbyt wiele prób logowania. Spróbuj ponownie za chwilę.',
  'auth/network-request-failed': 'Brak połączenia z serwerem',
}

export default function AppLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const signIn = async (event: FormEvent) => {
    event.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      const code = err instanceof FirebaseError ? err.code : ''
      setError(signInErrors[code] ?? 'Nie udało się zalogować')
      setSubmitting(false)
    }
  }

  return (
    <div
      className="flex h-screen items-center justify-center"
      style={{ background: `top / contain no-repeat url(${logoSrc})` }}
    >
      <Paper variant="outlined">
        <form noValidate autoComplete="off" onSubmit={signIn} className="flex min-h-[30vh] w-[330px] flex-col justify-evenly gap-2 px-10">
          <TextField name="email" type="email" label="użytkownik" variant="standard" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth />
          <TextField name="password" type="password" label="hasło" variant="standard" value={password} onChange={(e) => setPassword(e.target.value)} fullWidth />
          {error && <Alert severity="error">{error}</Alert>}
          <Button type="submit" variant="contained" color="primary" disabled={submitting}>
            Zaloguj
          </Button>
        </form>
      </Paper>
    </div>
  )
}
