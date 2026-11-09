import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function ConfigError({ missing }: { missing: string[] }) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Alert severity="error" className="max-w-xl">
        <AlertTitle>Brak konfiguracji Firebase</AlertTitle>
        <p>
          Uzupełnij w pliku <code>.env</code> (wzór: <code>.env.example</code>) zmienne:
        </p>
        <ul className="my-2 list-disc pl-5 font-mono text-sm">
          {missing.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
        <p>
          Po zmianie <code>.env</code> uruchom ponownie <code>npm run dev</code>.
        </p>
      </Alert>
    </div>
  )
}
