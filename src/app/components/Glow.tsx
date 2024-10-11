'use client'

import { useEffect, useRef } from 'react';

export default function Glow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      ref.current!.style.background = `radial-gradient(600px at ${x}px ${y}px, rgba(6, 12, 211, 0.1), transparent 80%)`
    }

    if (ref.current) {
      window.addEventListener('mousemove', onMouseMove)
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition duration-300 glow"
      ref={ref}
    />
  )
}