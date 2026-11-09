const DOCUMENT_TYPES = new Set([
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
])

/** Wartość atrybutu `accept` pola wyboru pliku. */
export const ACCEPTED_FILE_TYPES = ['image/*', ...DOCUMENT_TYPES].join(',')

/** Zdjęcia, PDF i dokumenty Word — to samo, co `ACCEPTED_FILE_TYPES` (dla plików przeciąganych). */
export const isAcceptedFile = (file: Pick<File, 'type'>) =>
  file.type.startsWith('image/') || DOCUMENT_TYPES.has(file.type)

const sizeFormat = new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 1 })

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${sizeFormat.format(bytes / 1024)} KB`
  return `${sizeFormat.format(bytes / 1024 ** 2)} MB`
}

/** 1 dokument, 2–4 dokumenty, 5+ dokumentów (12–14 dokumentów). */
export function pluralizeDocuments(count: number) {
  const lastDigit = count % 10
  const lastTwoDigits = count % 100
  if (count === 1) return '1 dokument'
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return `${count} dokumenty`
  return `${count} dokumentów`
}
