import { useMemo } from 'react'
import Alert from '@mui/material/Alert'
import { useVisits } from '../lib/db'
import { sortVisitsByDateDesc } from '../lib/visit'
import type { Patient } from '../types'
import AddVisit from './AddVisit'
import PrintVisits from './PrintVisits'
import ViewVisit from './ViewVisit'
import SectionTitle from './ui/SectionTitle'

export default function GetVisitInfo({ id, patient }: { id: string; patient: Patient }) {
  const { data: visits, error } = useVisits(id)
  const sortedVisits = useMemo(() => sortVisitsByDateDesc(visits ?? []), [visits])

  return (
    <section className="my-4 rounded-[10px] bg-white p-4 text-black shadow">
      <Alert icon={false} severity="info" variant="filled">
        <div className="flex items-center justify-between">
          <SectionTitle>Wizyty</SectionTitle>
          <div className="flex items-center gap-4">
            <PrintVisits visits={sortedVisits} patient={patient} />
            <AddVisit patientId={id} />
          </div>
        </div>
      </Alert>
      {error && (
        <Alert severity="error" className="my-4">
          Nie udało się wczytać wizyt: {error.message}
        </Alert>
      )}
      {visits !== undefined &&
        (sortedVisits.length > 0 ? (
          sortedVisits.map((visit) => (
            <div className="my-4" key={visit.id}>
              <ViewVisit visit={visit} patientId={id} />
            </div>
          ))
        ) : (
          <Alert severity="warning" className="my-4">
            Brak wizyt!
          </Alert>
        ))}
    </section>
  )
}
