import { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import { onAuthStateChanged } from 'firebase/auth'
import AppLogin from './components/AppLogin'
import ViewPatients from './components/ViewPatients'
import { auth } from './lib/firebase'

type AuthStatus = 'loading' | 'signed' | 'notSigned'

export default function App() {
  const [status, setStatus] = useState<AuthStatus>('loading')

  useEffect(() => onAuthStateChanged(auth, (user) => setStatus(user ? 'signed' : 'notSigned')), [])

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <CircularProgress color="primary" size={100} thickness={5} />
      </div>
    )
  }

  return status === 'signed' ? <ViewPatients /> : <AppLogin />
}
