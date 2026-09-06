import { type ReactNode } from 'react'
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
      {eyebrow && (
        <span
          className="mb-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
          style={{
            background: 'rgba(115,66,226,0.12)',
            color: '#7342E2',
            border: '1px solid rgba(115,66,226,0.18)',
          }}
        >
          <span
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: 'linear-gradient(90deg, #7342E2, #9B6BFF)' }}
          />
          {eyebrow}
        </span>
      )}
      <h1
        className={accent ? 'mb-5' : 'mb-5'}
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 5vw, 3rem)',
          lineHeight: 1.08,
          letterSpacing: '-0.02em',
          color: '#192837',
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
          className="opacity-80"
          style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', lineHeight: 1.65 }}
        >
          {description}
        </p>
      )}
      {children}
    </div>
  )
}
