'use client'

import { usePathname } from 'next/navigation'
import { type ReactNode } from 'react'

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div
      key={pathname}
      style={{ animation: 'page-fade-in 0.4s ease-out both' }}
    >
      {children}
    </div>
  )
}
