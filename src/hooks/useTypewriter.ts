import { useEffect, useState } from 'react'

export function useTypewriter(fullText: string, speedMs = 40) {
  const [typedText, setTypedText] = useState('')

  useEffect(() => {
    let i = 0
    setTypedText('')
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, i))
      i++
      if (i > fullText.length) clearInterval(interval)
    }, speedMs)
    return () => clearInterval(interval)
  }, [fullText, speedMs])

  return typedText
}

