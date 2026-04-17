import { CheckCircle2 } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'

type Props = {
  message: string | null
}

export function Toast({ message }: Props) {
  const { isDarkMode } = useTheme()

  if (!message) return null

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex justify-center px-4">
      <div
        role="status"
        aria-live="polite"
        className={cn(
          'pointer-events-auto flex max-w-[min(90vw,22rem)] items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium shadow-lg animate-toast-in',
          isDarkMode
            ? 'border-emerald-800/60 bg-zinc-900/95 text-emerald-100 backdrop-blur-sm'
            : 'border-emerald-200/80 bg-white text-emerald-900 shadow-emerald-900/10',
        )}
      >
        <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />
        <span>{message}</span>
      </div>
    </div>
  )
}
