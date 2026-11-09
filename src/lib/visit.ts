import { format } from 'date-fns'
import bodyParts, { type BodyPartName } from '../components/renderData/bodyParts'
import type { RotationIconName } from '../components/renderData/rotationIcons'
import type { ManualEntry, Visit } from '../types'

/** Data wizyty w formacie zapisywanym w bazie, np. 2026.11.09. */
export const formatVisitDate = (date: Date) => format(date, 'yyyy.MM.dd')

/** Najnowsze wizyty pierwsze (daty yyyy.MM.dd sortują się leksykograficznie). */
export const sortVisitsByDateDesc = (visits: readonly Visit[]) =>
  [...visits].sort((a, b) => {
    const left = a.date ?? ''
    const right = b.date ?? ''
    return left < right ? 1 : left > right ? -1 : 0
  })

interface RotationItem {
  chosen: boolean
  direction: Partial<Record<RotationIconName, boolean>>
}

interface DescriptionItem {
  chosen: boolean
  description: string | false
}

export type ManualTestItem = RotationItem | DescriptionItem

export type ManualTestState = Record<BodyPartName, ManualTestItem>

export type ManualTestAction =
  | { type: 'toggle'; part: BodyPartName }
  | { type: 'describe'; part: BodyPartName; value: string }
  | { type: 'toggleRotation'; part: BodyPartName; rotation: RotationIconName }
  | { type: 'reset' }

export function createManualTestState(): ManualTestState {
  return Object.fromEntries(
    bodyParts.map((part) => [
      part.name,
      part.rotations
        ? { chosen: false, direction: Object.fromEntries(part.rotations.map((icon) => [icon.name, false])) }
        : { chosen: false, description: false },
    ]),
  ) as ManualTestState
}

export function manualTestReducer(state: ManualTestState, action: ManualTestAction): ManualTestState {
  switch (action.type) {
    case 'toggle': {
      const item = state[action.part]
      return { ...state, [action.part]: { ...item, chosen: !item.chosen } }
    }
    case 'describe': {
      const item = state[action.part]
      if ('direction' in item) return state
      return { ...state, [action.part]: { ...item, description: action.value } }
    }
    case 'toggleRotation': {
      const item = state[action.part]
      if (!('direction' in item)) return state
      const direction = { ...item.direction, [action.rotation]: !item.direction[action.rotation] }
      return { ...state, [action.part]: { ...item, direction } }
    }
    case 'reset':
      return createManualTestState()
  }
}

/** Zamienia stan formularza na listę wybranych części ciała zapisywaną w Firebase. */
export function serializeManualTest(state: ManualTestState): ManualEntry[] {
  return bodyParts.flatMap((part): ManualEntry[] => {
    const item = state[part.name]
    if (!item.chosen) return []
    if ('direction' in item) {
      const chosenIcons = Object.entries(item.direction)
        .filter(([, selected]) => selected)
        .map(([name]) => name)
      return [[part.name, chosenIcons]]
    }
    return [[part.name, item.description]]
  })
}
