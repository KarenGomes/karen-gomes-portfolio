import { useEffect, useMemo, useState } from 'react'
import type { PortfolioData } from '../models/portfolio'
import { fetchPortfolioData } from '../services/portfolioApi'

type State =
  | { status: 'idle' | 'loading'; data: null; error: null }
  | { status: 'success'; data: PortfolioData; error: null }
  | { status: 'error'; data: null; error: Error }

export function usePortfolioData() {
  const [state, setState] = useState<State>({
    status: 'loading',
    data: null,
    error: null,
  })

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', data: null, error: null })

    fetchPortfolioData(controller.signal)
      .then((data) => setState({ status: 'success', data, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setState({
          status: 'error',
          data: null,
          error: err instanceof Error ? err : new Error('Unknown error'),
        })
      })

    return () => controller.abort()
  }, [])

  return useMemo(() => {
    return {
      data: state.status === 'success' ? state.data : null,
      isLoading: state.status === 'loading' || state.status === 'idle',
      error: state.status === 'error' ? state.error : null,
    }
  }, [state])
}

