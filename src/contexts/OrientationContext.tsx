import { createContext, useContext, type ReactNode } from 'react'
import { useDeviceOrientation } from '@/hooks/useDeviceOrientation'
import type { OrientationState, OrientationActions } from '@/hooks/useDeviceOrientation'

export type { OrientationState, OrientationActions }

type OrientationTuple = [OrientationState, OrientationActions]

const OrientationContext = createContext<OrientationTuple | null>(null)

export function OrientationProvider({ children }: { children: ReactNode }) {
  const value = useDeviceOrientation()
  return (
    <OrientationContext.Provider value={value}>
      {children}
    </OrientationContext.Provider>
  )
}

export function useOrientation(): OrientationTuple {
  const ctx = useContext(OrientationContext)
  if (!ctx) throw new Error('useOrientation must be used within <OrientationProvider>')
  return ctx
}
