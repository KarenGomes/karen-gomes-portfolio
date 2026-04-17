import type { ButtonHTMLAttributes } from 'react'
import { cn } from '../../utils/cn'

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'outline' | 'ghost'
}

export function Button({ className, variant = 'primary', ...props }: Props) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg text-sm font-bold transition-all'

  const variants: Record<NonNullable<Props['variant']>, string> = {
    primary: 'bg-[#7C3AED] hover:bg-[#6D28D9] text-white transform hover:scale-105',
    outline: 'border border-zinc-700 hover:bg-zinc-800 text-white',
    ghost: 'hover:bg-zinc-800',
  }

  return <button className={cn(base, variants[variant], className)} {...props} />
}

