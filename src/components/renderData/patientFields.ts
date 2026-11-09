import type { Patient } from '../../types'

export interface PatientForm {
  name: string
  surname: string
  age: string
  phoneNumber: string
  occupation: string
}

export const emptyPatientForm: PatientForm = {
  name: '',
  surname: '',
  age: '',
  phoneNumber: '',
  occupation: '',
}

export const patientFields: readonly { name: keyof PatientForm; label: string; type?: string }[] = [
  { name: 'name', label: 'Imię' },
  { name: 'surname', label: 'Nazwisko' },
  { name: 'age', label: 'Wiek', type: 'number' },
  { name: 'phoneNumber', label: 'Telefon' },
  { name: 'occupation', label: 'Zawód/Praca/Aktywność' },
]

export const patientToForm = (patient: Patient): PatientForm => ({
  name: patient.name ?? '',
  surname: patient.surname ?? '',
  age: patient.age == null ? '' : String(patient.age),
  phoneNumber: patient.phone_number ?? '',
  occupation: patient.occupation ?? '',
})

/** Format zapisu w Firebase (klucz phone_number jak w istniejących danych). */
export const formToPatient = (form: PatientForm) => ({
  name: form.name,
  surname: form.surname,
  age: form.age,
  phone_number: form.phoneNumber,
  occupation: form.occupation,
})
