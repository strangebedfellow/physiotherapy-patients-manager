import i8 from '../../img/i8.png'
import i9 from '../../img/i9.png'
import i10 from '../../img/i10.png'
import i11 from '../../img/i11.png'
import i12 from '../../img/i12.png'
import i13 from '../../img/i13.png'

export type RotationIconName = 'i8' | 'i9' | 'i10' | 'i11' | 'i12' | 'i13'

export interface RotationIcon {
  name: RotationIconName
  src: string
}

export const cristaIliacaRotations: readonly RotationIcon[] = [
  { name: 'i8', src: i8 },
  { name: 'i9', src: i9 },
  { name: 'i10', src: i10 },
  { name: 'i11', src: i11 },
]

export const sacrumRotations: readonly RotationIcon[] = [
  { name: 'i12', src: i12 },
  { name: 'i13', src: i13 },
]

const allIcons = [...cristaIliacaRotations, ...sacrumRotations]

/** Ikona rotacji zapisanej w wizycie (używane w ViewVisit). */
export const getRotationIcon = (name: string) => allIcons.find((icon) => icon.name === name)
