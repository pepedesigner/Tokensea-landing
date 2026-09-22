import { Link } from 'react-router-dom'
import logoImg from '../assets/logo.svg'

export function LogoTile({ size = 36 }: { size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center overflow-hidden border border-black/10 bg-white p-1 transition-all duration-200 hover:border-accent-500"
      style={{ width: size, height: size }}
    >
      <img src={logoImg} alt="io.run logo" className="h-full w-full object-contain" />
    </span>
  )
}

export function LogoLockup({
  to,
  size = 36,
  className = '',
}: {
  to?: string
  size?: number
  className?: string
}) {
  const inner = (
    <>
      <LogoTile size={size} />
      <span className="text-base font-bold tracking-tight text-ink transition-colors group-hover:text-accent-600">
        io<span className="text-accent-600">.run</span>
      </span>
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        aria-label="io.run home"
        className={`group flex items-center gap-2.5 ${className}`}
      >
        {inner}
      </Link>
    )
  }

  return <div className={`group flex items-center gap-2.5 ${className}`}>{inner}</div>
}

export default LogoTile
