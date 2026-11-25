'use client'

import { useISTClock } from '@/hooks/useISTClock'

export default function IstClock({ className }: { className?: string }) {
  const istTime = useISTClock()

  return <p className={className}>{istTime}</p>
}
