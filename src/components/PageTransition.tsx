import type { ReactNode } from 'react'

/**
 * PageTransition — passthrough. The actual ink curtain lives in
 * <RouteCurtain /> at the app root so wrapping pages in extra
 * motion.div containers doesn't interfere with sticky / scroll-linked
 * sections (Process, ProjectsRail).
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <>{children}</>
}
