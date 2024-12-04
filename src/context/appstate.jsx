import { h, createContext } from 'preact'
import { useContext } from 'preact/hooks'
import { signal, effect } from '@preact/signals'

const AppStateContext = createContext()

export function AppStateProvider({ children }) {
  const data = signal(null)
  const loading = signal(true)
  const error = signal(null)

  // Simulating data fetching on app start
  effect(() => {
    const onMessage = (event) => {
      const msg = event.data.pluginMessage
      if (msg.type === 'got-config') {
        console.log('got-config', msg)
        data.value = msg.config
      }
    }
    window.addEventListener('message', onMessage)

    parent.postMessage({ pluginMessage: { type: 'get-config' } }, '*')

    return () => {
      window.removeEventListener('message', onMessage)
    }
  })

  return <AppStateContext.Provider value={{ data, loading, error }}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  return useContext(AppStateContext)
}
