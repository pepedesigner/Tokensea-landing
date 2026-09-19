import type { CSSProperties, ReactNode } from 'react'

export default function Card({
  children,
  className = '',
  hover = false,
  style,
}: {
  children: ReactNode
  className?: string
  hover?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className={`border border-black/10 bg-white shadow-sm transition-all duration-200 ease-out ${
        hover ? 'hover:border-bronze-400 hover:shadow-[0_4px_20px_rgba(8,6,5,0.12)]' : ''
      } ${className}`}
      style={style}
    >
      {children}
    </div>
  )
}
