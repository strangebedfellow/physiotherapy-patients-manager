import { useEffect, useState } from 'react'
import { onValue, ref, type DataSnapshot } from 'firebase/database'
import type { Patient, PatientWithId, Visit, VisitData } from '../types'
import { db } from './firebase'

const paths = {
  patients: () => 'patients',
  patient: (id: string) => `patients/${id}`,
  interview: (id: string) => `patients/${id}/interview`,
  visits: (patientId: string) => `patients/${patientId}/visits`,
  visit: (patientId: string, visitId: string) => `patients/${patientId}/visits/${visitId}`,
}

export const patientsRef = () => ref(db, paths.patients())
export const patientRef = (id: string) => ref(db, paths.patient(id))
export const interviewRef = (id: string) => ref(db, paths.interview(id))
export const visitsRef = (patientId: string) => ref(db, paths.visits(patientId))
export const visitRef = (patientId: string, visitId: string) => ref(db, paths.visit(patientId, visitId))

export function showWriteError(error: unknown) {
  console.error(error)
  window.alert('Nie udało się zapisać zmian. Spróbuj ponownie.')
}

/** `data === undefined && error === null` oznacza, że dane jeszcze się ładują. */
export interface DbResult<T> {
  data: T | undefined
  error: Error | null
}

/** Odmowa przez reguły bezpieczeństwa (konto spoza listy `admins`). */
export const isPermissionDenied = (error: Error) => error.message.includes('permission_denied')

function useDbSubscription<T>(path: string, read: (snapshot: DataSnapshot) => T): DbResult<T> {
  const [state, setState] = useState<{ path: string; data?: T; error?: Error }>()

  useEffect(
    () =>
      onValue(
        ref(db, path),
        (snapshot) => setState({ path, data: read(snapshot) }),
        (error) => {
          console.error(`Błąd odczytu ${path}`, error)
          setState({ path, error })
        },
      ),
    [path, read],
  )

  // Po zmianie ścieżki nie pokazujemy danych poprzedniego węzła.
  if (state?.path !== path) return { data: undefined, error: null }
  return { data: state.data, error: state.error ?? null }
}

/** Dzieci węzła jako lista, z kluczem Firebase w polu `id`. */
function readList<T>(snapshot: DataSnapshot): (T & { id: string })[] {
  const items: (T & { id: string })[] = []
  snapshot.forEach((child) => {
    items.push({ ...(child.val() as T), id: child.key })
  })
  return items
}

// Stabilne referencje — funkcje odczytu są zależnością efektu subskrypcji.
const readPatients = (snapshot: DataSnapshot): PatientWithId[] => readList<Patient>(snapshot)
const readPatient = (snapshot: DataSnapshot) => snapshot.val() as Patient | null
const readVisits = (snapshot: DataSnapshot): Visit[] => readList<VisitData>(snapshot)

export const usePatients = () => useDbSubscription(paths.patients(), readPatients)
export const usePatient = (id: string) => useDbSubscription(paths.patient(id), readPatient)
export const useVisits = (patientId: string) => useDbSubscription(paths.visits(patientId), readVisits)
