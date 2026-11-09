import { describe, expect, it } from 'vitest'
import { formatFileSize, isAcceptedFile, pluralizeDocuments } from './files'

describe('isAcceptedFile', () => {
  it('accepts images, PDF and Word documents', () => {
    expect(isAcceptedFile({ type: 'image/jpeg' })).toBe(true)
    expect(isAcceptedFile({ type: 'image/heic' })).toBe(true)
    expect(isAcceptedFile({ type: 'application/pdf' })).toBe(true)
    expect(isAcceptedFile({ type: 'application/msword' })).toBe(true)
    expect(
      isAcceptedFile({ type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
    ).toBe(true)
  })

  it('rejects other types', () => {
    expect(isAcceptedFile({ type: 'application/zip' })).toBe(false)
    expect(isAcceptedFile({ type: 'text/plain' })).toBe(false)
    expect(isAcceptedFile({ type: '' })).toBe(false)
  })
})

describe('formatFileSize', () => {
  it('uses B, KB and MB with Polish decimal comma', () => {
    expect(formatFileSize(512)).toBe('512 B')
    expect(formatFileSize(1536)).toBe('1,5 KB')
    expect(formatFileSize(3 * 1024 ** 2)).toBe('3 MB')
    expect(formatFileSize(2.25 * 1024 ** 2)).toBe('2,3 MB')
  })
})

describe('pluralizeDocuments', () => {
  it.each([
    [1, '1 dokument'],
    [2, '2 dokumenty'],
    [4, '4 dokumenty'],
    [5, '5 dokumentów'],
    [12, '12 dokumentów'],
    [14, '14 dokumentów'],
    [22, '22 dokumenty'],
    [25, '25 dokumentów'],
  ])('%i → %s', (count, expected) => {
    expect(pluralizeDocuments(count)).toBe(expected)
  })
})
