import type { InterviewKey } from './components/renderData/interviewQuestions'

export type Interview = Partial<Record<InterviewKey, string>>

/** Węzeł `patients/{id}` w Realtime Database. */
export interface Patient {
  name?: string
  surname?: string
  age?: string | number
  phone_number?: string
  occupation?: string
  interview?: Interview
}

export interface PatientWithId extends Patient {
  id: string
}

/**
 * Wpis badania manualnego: [część ciała, wybrane ikony rotacji | opis].
 * Puste tablice nie są zapisywane przez Firebase, stąd opcjonalna wartość.
 */
export type ManualEntry = [part: string, value?: string[] | string | false]

/** Węzeł `patients/{id}/visits/{visitId}`. */
export interface VisitData {
  date: string
  consultation?: string
  notes?: string
  manual?: ManualEntry[]
}

export interface Visit extends VisitData {
  id: string
}
