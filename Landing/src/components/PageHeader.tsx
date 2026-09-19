import { type ReactNode } from 'react'
import Badge from './ui/Badge'
import GradientText from './GradientText'

export default function PageHeader({
  eyebrow,
  title,
  accent,
  description,
  children,
  align = 'left',
  maxWidth = 720,
}: {
  eyebrow?: string
  title: ReactNode
  accent?: string
  description?: ReactNode
  children?: ReactNode
  align?: 'left' | 'center'
  maxWidth?: number
}) {
  return (
    <div
      className={align === 'center' ? 'mx-auto text-center' : ''}
      style={{ maxWidth }}
    >
      {eyebrow && <Badge className="mb-5">{eyebrow}</Badge>}
      <h1
        className="mb-5 font-bold text-ink"
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
        }}
      >
        {title}
        {accent && (
          <>
            {' '}
            <GradientText>{accent}</GradientText>
          </>
        )}
      </h1>
      {description && (
        <p
          className="text-ink-2"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.65 }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
