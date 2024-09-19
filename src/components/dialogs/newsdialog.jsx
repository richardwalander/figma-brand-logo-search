import { h } from 'preact'
import './newsdialog.css'
import { useEffect, useState } from 'preact/hooks'

const NewsDialog = () => {
  const [showNews, setShowNews] = useState(false)
  useEffect(() => {
    const onMessage = (event) => {
      const msg = event.data.pluginMessage
      if (msg.type === 'show-news') {
        setShowNews(msg.showNews)
      }
    }

    window.addEventListener('message', onMessage)
    parent.postMessage({ pluginMessage: { type: 'show-news', version: 'v1' } }, '*')
    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [])
  return (
    <>
      <input type="checkbox" id="modal-control" class="modal" checked={showNews}></input>
      <div>
        <div id="newsdialog" class="card">
          <label
            class="modal-close"
            onClick={() => {
              setShowNews(false)
            }}
          ></label>
          <h3 class="section">News</h3>
          <div className="section">
            <p className="icon">🎉</p>
            <h4>🚀 What’s New in LogoFetch</h4>
            <p>
              <strong>🌐 New Logo.dev API</strong>
            </p>
            <p>Faster, more reliable logos with better brand coverage.</p>
            <p>
              <strong>🛠️ Custom Logo Size & Format</strong>
            </p>
            <p>Set default size and choose PNG, JPG, or Greyscale formats.</p>
            <p>
              <strong>🎨 Extract Logo Colors</strong>
            </p>
            <p>Automatically extract and add logo colors as styles to your document.</p>
            <p>
              <strong>🖼️ No Layer Selection Needed</strong>
            </p>
            <p>Insert logos without selecting a layer—a new layer will be created automatically.</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewsDialog
