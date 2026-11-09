import { describe, expect, it } from 'vitest'
import type { Visit } from '../types'
import {
  createManualTestState,
  formatVisitDate,
  manualTestReducer,
  serializeManualTest,
  sortVisitsByDateDesc,
} from './visit'

describe('formatVisitDate', () => {
  it('formats dates as yyyy.MM.dd with zero padding', () => {
    expect(formatVisitDate(new Date(2026, 0, 5))).toBe('2026.01.05')
    expect(formatVisitDate(new Date(2025, 11, 31))).toBe('2025.12.31')
  })
})

describe('sortVisitsByDateDesc', () => {
  it('puts the newest visit first without mutating the input', () => {
    const visits: Visit[] = [
      { id: 'a', date: '2025.03.01' },
      { id: 'b', date: '2026.01.15' },
      { id: 'c', date: '2025.12.31' },
    ]
    expect(sortVisitsByDateDesc(visits).map((visit) => visit.id)).toEqual(['b', 'c', 'a'])
    expect(visits.map((visit) => visit.id)).toEqual(['a', 'b', 'c'])
  })
})

describe('manual test form', () => {
  it('serializes nothing when no body part is chosen', () => {
    expect(serializeManualTest(createManualTestState())).toEqual([])
  })

  it('serializes chosen parts in body-part order, keeping the legacy Firebase format', () => {
    let state = createManualTestState()
    state = manualTestReducer(state, { type: 'toggle', part: 'l5' })
    state = manualTestReducer(state, { type: 'describe', part: 'l5', value: 'blokada' })
    state = manualTestReducer(state, { type: 'toggle', part: 'sacrum' })
    state = manualTestReducer(state, { type: 'toggleRotation', part: 'sacrum', rotation: 'i13' })
    state = manualTestReducer(state, { type: 'toggle', part: 'cristaIliaca' })
    state = manualTestReducer(state, { type: 'toggle', part: 'ilium' })

    expect(serializeManualTest(state)).toEqual([
      ['cristaIliaca', []],
      ['sacrum', ['i13']],
      ['ilium', false],
      ['l5', 'blokada'],
    ])
  })

  it('toggling a rotation twice deselects it', () => {
    let state = manualTestReducer(createManualTestState(), { type: 'toggle', part: 'sips' })
    state = manualTestReducer(state, { type: 'toggleRotation', part: 'sips', rotation: 'i9' })
    state = manualTestReducer(state, { type: 'toggleRotation', part: 'sips', rotation: 'i9' })
    expect(serializeManualTest(state)).toEqual([['sips', []]])
  })

  it('reset clears every choice', () => {
    const chosen = manualTestReducer(createManualTestState(), { type: 'toggle', part: 'c1' })
    expect(manualTestReducer(chosen, { type: 'reset' })).toEqual(createManualTestState())
  })
})
