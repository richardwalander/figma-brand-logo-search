import { render } from 'preact'
import App from './app.jsx'
import * as mixpanel from 'mixpanel-figma'
// import './index.css'

const token = import.meta.env.VITE_MIXPANEL_PROJECT_TOKEN

mixpanel.init(token, {
  disable_cookie: true,
  disable_persistence: true,
})

function requestUUID() {
  parent.postMessage({ pluginMessage: { type: 'request-uuid' } }, '*')
}

window.onmessage = (event) => {
  if (event.data.pluginMessage.type === 'uuid-response') {
    const uuid = event.data.pluginMessage.uuid
    console.log('Received UUID:', uuid)
    mixpanel.identify(uuid)
    // Do something with the UUID in the UI, e.g., display it
  }
}

requestUUID()

render(<App />, document.getElementById('app'))
