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
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage
      if (msg.type === 'got-config') {
        console.log('got-config', msg)
        data.value = msg.config
      }
    }
    parent.postMessage({ pluginMessage: { type: 'get-config' } }, '*')
  })

  // async function fetchData() {
  //   try {
  //     loading.value = true
  //     // Simulating API call
  //     const response = await new Promise((resolve) => setTimeout(() => resolve({ message: 'Hello from AppState!' }), 1000))
  //     data.value = response
  //   } catch (err) {
  //     error.value = err.message
  //   } finally {
  //     loading.value = false
  //   }
  // }

  // const refreshData = () => {
  //   fetchData()
  // }

  return <AppStateContext.Provider value={{ data, loading, error }}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  return useContext(AppStateContext)
}
