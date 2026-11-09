import type { ReactNode } from 'react'

export default function SectionTitle({ children }: { children: ReactNode }) {
  return <span className="text-[1.5rem] font-bold uppercase tracking-[5px]">{children}</span>
}
