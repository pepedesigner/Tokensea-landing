export default function Tabs({
  items,
  active,
  onChange,
  grow = false,
  className = '',
}: {
  items: readonly string[]
  active: number
  onChange: (index: number) => void
  grow?: boolean
  className?: string
}) {
  return (
    <div
      role="tablist"
      className={`flex gap-1 border border-black/10 bg-paper-2 p-1 ${className}`}
    >
      {items.map((item, i) => (
        <button
          key={item}
          role="tab"
          aria-selected={i === active}
          onClick={() => onChange(i)}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            grow ? 'flex-1' : ''
          } ${
            i === active
              ? 'bg-white text-ink shadow-sm'
              : 'text-ink-2 hover:text-ink'
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  )
}
