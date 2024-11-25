import { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  color?: 'primary' | 'secondary' | 'accent'
  icon?: ReactNode
  className?: string
}

export function Button({ children, onClick, color = 'primary', icon, className = '' }: ButtonProps) {
  const colorClasses = {
    primary: 'bg-[var(--color-primary)] text-[var(--color-white)]',
    secondary: 'bg-[var(--color-secondary)] text-[var(--color-white)]',
    accent: 'bg-[var(--color-accent)] text-[var(--color-text)]',
  }

  return (
    <button
      onClick={onClick}
      className={`${colorClasses[color]} text-xl font-bold py-6 px-8 rounded-xl flex items-center justify-center w-full transition-all duration-300 ease-in-out hover:opacity-90 shadow-lg ${className}`}
    >
      {icon && <span className="mr-3 text-2xl">{icon}</span>}
      {children}
    </button>
  )
}

