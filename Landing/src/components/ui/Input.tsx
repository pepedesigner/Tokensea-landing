import type { InputHTMLAttributes } from 'react'

export const INPUT_CLASSES =
  'w-full border border-black/10 bg-white px-4 py-2.5 text-sm text-ink placeholder:text-ink-3/60 transition-all duration-150 focus:border-ink focus:ring-1 focus:ring-accent-500/40 focus:outline-none disabled:cursor-not-allowed disabled:bg-paper-2'

export function Input({
  className = '',
  ...rest
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${INPUT_CLASSES} ${className}`} {...rest} />
}

export function Field({
  label,
  className = '',
  ...rest
}: { label: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      <Input className={className} {...rest} />
    </label>
  )
}
