import type { ReactElement, Ref } from 'react'
import Slide from '@mui/material/Slide'
import type { TransitionProps } from '@mui/material/transitions'

type SlideTransitionProps = TransitionProps & { children: ReactElement; ref?: Ref<unknown> }

export function SlideUp({ ref, ...props }: SlideTransitionProps) {
  return <Slide direction="up" ref={ref} {...props} />
}

export function SlideDown({ ref, ...props }: SlideTransitionProps) {
  return <Slide direction="down" ref={ref} {...props} />
}
