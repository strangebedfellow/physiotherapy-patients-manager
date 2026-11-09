import { cristaIliacaRotations, sacrumRotations, type RotationIcon } from './rotationIcons'

export type BodyPartName =
  | 'cristaIliaca'
  | 'sips'
  | 'sacrum'
  | 'ilium'
  | 'l6'
  | 'l5'
  | 'l4'
  | 'l3'
  | 'l2'
  | 'l1'
  | 'c1'

export interface BodyPart {
  name: BodyPartName
  fullName: string
  /** Części z ikonami rotacji; pozostałe mają pole opisu. */
  rotations?: readonly RotationIcon[]
}

const bodyParts: readonly BodyPart[] = [
  { name: 'cristaIliaca', fullName: 'Crista iliaca', rotations: cristaIliacaRotations },
  { name: 'sips', fullName: 'SIPS', rotations: cristaIliacaRotations },
  { name: 'sacrum', fullName: 'Sacrum', rotations: sacrumRotations },
  { name: 'ilium', fullName: 'Wadliwe ustawienie Ilium i rotacja C1 w tym samym kierunku + staw TF' },
  { name: 'l6', fullName: 'Ilium, Th6, C6, C2, C1 + staw TF' },
  { name: 'l5', fullName: 'L5, Th5, C5 (często C2 i C1)' },
  { name: 'l4', fullName: 'L4, Th4, C4' },
  { name: 'l3', fullName: 'L3, Th3, C3' },
  { name: 'l2', fullName: 'L2, Th2, C2 (kompleksem C0 - C2)' },
  { name: 'l1', fullName: 'L1, Th1, C1 (kompleksem C0 - C2)' },
  { name: 'c1', fullName: 'Stopa, miednica, C1' },
]

export default bodyParts

export const getBodyPartLabel = (name: string) =>
  bodyParts.find((part) => part.name === name)?.fullName ?? name
