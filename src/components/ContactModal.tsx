import HCaptcha from '@hcaptcha/react-hcaptcha'
import { ArrowLeft, Linkedin, Mail, X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import { getContactConfig } from '../config/contact'
import { useTheme } from '../hooks/useTheme'
import { cn } from '../utils/cn'
import { Button } from './ui/Button'

type Step = 'choose' | 'form'

const SUCCESS_FEEDBACK = 'Mensagem enviada. Obrigada pelo contato!'

type Props = {
  open: boolean
  onClose: () => void
  onSubmitSuccess?: (message: string) => void
}

export function ContactModal({ open, onClose, onSubmitSuccess }: Props) {
  const { isDarkMode } = useTheme()
  const titleId = useId()
  const formRef = useRef<HTMLFormElement>(null)
  const captchaRef = useRef<InstanceType<typeof HCaptcha>>(null)

  const { linkedinProfileUrl, hcaptchaSiteKey, web3formsAccessKey } = getContactConfig()

  const [step, setStep] = useState<Step>('choose')
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [feedback, setFeedback] = useState('')

  const resetForm = useCallback(() => {
    setStatus('idle')
    setFeedback('')
    setCaptchaToken(null)
    captchaRef.current?.resetCaptcha()
    formRef.current?.reset()
  }, [])

  useEffect(() => {
    if (!open) {
      setStep('choose')
      resetForm()
    }
  }, [open, resetForm])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const panelClass = isDarkMode
    ? 'bg-[#18181B] border-[#27272A] text-[#EDEDED]'
    : 'bg-white border-zinc-200 text-[#111827]'

  const inputClass = cn(
    'w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors',
    'focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED]',
    isDarkMode
      ? 'border-[#27272A] bg-[#0A0A0A] text-[#EDEDED] placeholder:text-zinc-500'
      : 'border-zinc-200 bg-white text-[#111827] placeholder:text-zinc-400',
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!web3formsAccessKey) {
      setStatus('error')
      setFeedback('Configure VITE_WEB3FORMS_ACCESS_KEY no arquivo .env e reinicie o servidor.')
      return
    }
    if (!hcaptchaSiteKey) {
      setStatus('error')
      setFeedback('Configure VITE_HCAPTCHA_SITEKEY no arquivo .env e reinicie o servidor.')
      return
    }
    if (!captchaToken) {
      setStatus('error')
      setFeedback('Complete a verificação antes de enviar.')
      return
    }

    setStatus('loading')
    setFeedback('')

    const fd = new FormData(e.currentTarget)
    fd.set('access_key', web3formsAccessKey)
    fd.set('h-captcha-response', captchaToken)
    fd.append('subject', 'Contato pelo portfólio')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: fd,
      })

      let data: { success?: boolean; message?: string }
      try {
        data = await response.json()
      } catch {
        setStatus('error')
        setFeedback('Resposta inválida do servidor. Tente novamente.')
        return
      }

      if (!response.ok || !data.success) {
        setStatus('error')
        setFeedback(data.message ?? 'Não foi possível enviar. Tente de novo em instantes.')
        captchaRef.current?.resetCaptcha()
        setCaptchaToken(null)
        return
      }

      formRef.current?.reset()
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
      setStatus('idle')
      setFeedback('')
      onClose()
      onSubmitSuccess?.(SUCCESS_FEEDBACK)
    } catch {
      setStatus('error')
      setFeedback('Erro de rede. Verifique sua conexão e tente novamente.')
      captchaRef.current?.resetCaptcha()
      setCaptchaToken(null)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center p-0 sm:p-4"
      role="presentation"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" aria-hidden />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          'relative z-[101] w-full max-w-lg max-h-[min(90vh,640px)] overflow-y-auto rounded-t-2xl sm:rounded-2xl border shadow-xl',
          panelClass,
        )}
      >
        <div
          className={cn(
            'sticky top-0 flex items-center justify-between gap-3 px-5 py-4 border-b',
            isDarkMode ? 'border-[#27272A] bg-[#18181B]/95' : 'border-zinc-200 bg-white/95',
          )}
        >
          <h2 id={titleId} className="text-lg font-bold">
            {step === 'choose' ? 'Contato' : 'Enviar mensagem'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              'p-2 rounded-lg transition-colors',
              isDarkMode ? 'hover:bg-zinc-800 text-zinc-300' : 'hover:bg-zinc-100 text-zinc-600',
            )}
            aria-label="Fechar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5">
          {step === 'choose' && (
            <div className="flex flex-col gap-3">
              <p className="text-sm opacity-80">Escolha como prefere falar comigo.</p>

              <button
                type="button"
                onClick={() => {
                  setStep('form')
                  setStatus('idle')
                  setFeedback('')
                }}
                className={cn(
                  'flex items-center gap-3 w-full text-left rounded-xl border p-4 transition-all',
                  'hover:border-[#7C3AED] hover:bg-[#7C3AED]/10',
                  isDarkMode ? 'border-[#27272A]' : 'border-zinc-200',
                )}
              >
                <div className="p-2 rounded-lg bg-[#7C3AED]/15 text-[#7C3AED]">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="font-semibold">E-mail pelo site</p>
                  <p className="text-xs opacity-70 mt-0.5">Me mande uma mensagem pelo e-mail!</p>
                </div>
              </button>

              {linkedinProfileUrl ? (
                <a
                  href={linkedinProfileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'flex items-center gap-3 w-full rounded-xl border p-4 transition-all',
                    'hover:border-[#7C3AED] hover:bg-[#7C3AED]/10',
                    isDarkMode ? 'border-[#27272A]' : 'border-zinc-200',
                  )}
                >
                  <div className="p-2 rounded-lg bg-[#0A66C2]/15 text-[#0A66C2]">
                    <Linkedin size={22} />
                  </div>
                  <div>
                    <p className="font-semibold">LinkedIn</p>
                    <p className="text-xs opacity-70 mt-0.5">Entre em contato pelo LinkedIn</p>
                  </div>
                </a>
              ) : (
                <p className="text-sm text-amber-600 dark:text-amber-400" role="note">
                  Defina <code className="text-xs">VITE_LINKEDIN_PROFILE_URL</code> no <code className="text-xs">.env</code> para o
                  atalho do LinkedIn.
                </p>
              )}
            </div>
          )}

          {step === 'form' && (
            <div className="flex flex-col gap-4">
              <button
                type="button"
                onClick={() => {
                  setStep('choose')
                  resetForm()
                }}
                className="inline-flex items-center gap-2 text-sm font-medium w-fit text-[#7C3AED] hover:underline"
              >
                <ArrowLeft size={16} aria-hidden />
                Voltar
              </button>

              {(!web3formsAccessKey || !hcaptchaSiteKey) && (
                <p className="text-sm text-amber-600 dark:text-amber-400" role="alert">
                  {!web3formsAccessKey && (
                    <>
                      Defina <code className="text-xs">VITE_WEB3FORMS_ACCESS_KEY</code> no <code className="text-xs">.env</code>.
                      {!hcaptchaSiteKey ? ' ' : ''}
                    </>
                  )}
                  {!hcaptchaSiteKey && (
                    <>
                      Defina <code className="text-xs">VITE_HCAPTCHA_SITEKEY</code> no <code className="text-xs">.env</code> (site key
                      público do hCaptcha / Web3Forms).
                    </>
                  )}
                </p>
              )}

              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold mb-1.5 opacity-90">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={inputClass}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold mb-1.5 opacity-90">
                    E-mail
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={inputClass}
                    disabled={status === 'loading'}
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="block text-xs font-semibold mb-1.5 opacity-90">
                    Mensagem
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    className={cn(inputClass, 'resize-y min-h-[120px]')}
                    disabled={status === 'loading'}
                  />
                </div>

                <div className="w-full flex flex-col gap-2 min-w-0">
                  <span className="text-xs font-semibold opacity-90">Verificação</span>
                  <div className="w-full flex justify-center sm:justify-start min-w-0 overflow-x-auto">
                    {hcaptchaSiteKey ? (
                      <HCaptcha
                        ref={captchaRef}
                        sitekey={hcaptchaSiteKey}
                        reCaptchaCompat={false}
                        theme={isDarkMode ? 'dark' : 'light'}
                        size="normal"
                        onVerify={(token) => {
                          setCaptchaToken(token)
                          setFeedback('')
                        }}
                        onExpire={() => setCaptchaToken(null)}
                        onError={() => {
                          setCaptchaToken(null)
                          setStatus('error')
                          setFeedback('Verificação indisponível. Atualize a página ou tente mais tarde.')
                        }}
                      />
                    ) : null}
                  </div>
                </div>

                {feedback ? (
                  <p role="alert" className="text-sm text-red-600 dark:text-red-400">
                    {feedback}
                  </p>
                ) : null}

                <Button
                  type="submit"
                  className="w-full justify-center min-h-[3rem] px-4 py-3.5 text-base disabled:opacity-60 disabled:hover:scale-100"
                  disabled={
                    status === 'loading' || !web3formsAccessKey || !hcaptchaSiteKey
                  }
                >
                  {status === 'loading' ? 'Enviando…' : 'Enviar mensagem'}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
