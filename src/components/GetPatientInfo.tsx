import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import PhoneInTalkOutlinedIcon from '@mui/icons-material/PhoneInTalkOutlined'
import { usePatient } from '../lib/db'
import AddInterview from './AddInterview'
import AddPatientDocument from './AddPatientDocument'
import GetVisitInfo from './GetVisitInfo'
import PatientDocuments from './PatientDocuments'
import UpdatePatientData from './UpdatePatientData'
import ViewInterview from './ViewInterview'
import SectionTitle from './ui/SectionTitle'

export default function GetPatientInfo({ id }: { id: string }) {
  const { data: patient, error } = usePatient(id)

  if (error) {
    return (
      <Alert severity="error" className="my-4">
        Nie udało się wczytać danych pacjenta: {error.message}
      </Alert>
    )
  }

  if (patient === undefined) {
    return (
      <div className="flex justify-center p-10">
        <CircularProgress />
      </div>
    )
  }

  if (patient === null) {
    return (
      <Alert severity="warning" className="my-4">
        Nie znaleziono pacjenta.
      </Alert>
    )
  }

  const { name, surname, phone_number, age, occupation, interview } = patient

  return (
    <div className="text-black">
      <section className="my-4 flex flex-col gap-4 rounded-[10px] bg-white p-4 shadow">
        <Alert icon={false} variant="filled" severity="info">
          <div className="flex items-center justify-between">
            <SectionTitle>Dane pacjenta</SectionTitle>
            <UpdatePatientData patient={patient} id={id} />
          </div>
        </Alert>
        <Alert icon={false} variant="outlined" severity="success">
          <strong>Imię i nazwisko: </strong>
          {name} {surname}
        </Alert>
        <Alert icon={false} variant="outlined" severity="success">
          <strong>Wiek: </strong>
          {age}
        </Alert>
        <Alert icon={false} variant="outlined" severity="success">
          <span className="flex items-center gap-2">
            <PhoneInTalkOutlinedIcon fontSize="small" aria-label="Telefon" />
            {phone_number}
          </span>
        </Alert>
        <Alert icon={false} variant="outlined" severity="success">
          <strong>Zawód/Praca/Aktywność: </strong>
          {occupation}
        </Alert>
        {interview ? (
          <ViewInterview interview={interview} id={id} />
        ) : (
          <Alert severity="warning">
            <strong>Brak wywiadu!</strong>
            <div className="mt-4">
              <AddInterview id={id} />
            </div>
          </Alert>
        )}
        <div className="flex flex-wrap gap-4">
          <PatientDocuments id={id} />
          <AddPatientDocument id={id} />
        </div>
      </section>
      <GetVisitInfo id={id} patient={patient} />
    </div>
  )
}
