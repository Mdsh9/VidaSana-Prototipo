import { ArrowLeft, User } from 'lucide-react'

interface HeaderProps {
  title: string
  showBackButton?: boolean
  onBack?: () => void
  onProfileClick?: () => void
}

export function Header({ title, showBackButton = false, onBack, onProfileClick }: HeaderProps) {
  return (
    <header className="bg-[var(--color-primary)] p-6 flex items-center justify-between text-[var(--color-white)] shadow-md">
      <div className="flex items-center">
        {showBackButton && (
          <button onClick={onBack} className="mr-4">
            <ArrowLeft className="w-8 h-8" />
          </button>
        )}
        <h1 className="text-3xl font-bold">{title}</h1>
      </div>
      {onProfileClick && (
        <button onClick={onProfileClick} className="p-3 rounded-full bg-[var(--color-white)]">
          <User className="w-8 h-8 text-[var(--color-primary)]" />
        </button>
      )}
    </header>
  )
}

