import { h } from 'preact'
import Accordion from '../components/accordion/accordion'
import { useAppState } from '../context/appstate'
import './more.css'

const More = () => {
  const { data } = useAppState()
  return (
    <div id="more" className="more container">
      <Accordion title="General settings">
        <div className="col-sm-12 row">
          <div className="col-sm-4">
            <span className="label">Default format</span>
          </div>
          <div className="col-sm-8">
            <select
              className="input"
              name="format"
              id="format"
              onChange={(e) => {
                const format = e.target.value
                const { size, greyscale } = data.value
                parent.postMessage({ pluginMessage: { type: 'save-config', config: { format, size, greyscale } } }, '*')
              }}
            >
              <option value="png" selected={data.value?.format === 'png'}>
                PNG
              </option>
              <option value="jpg" selected={data.value?.format === 'jpg'}>
                JPG
              </option>
            </select>
          </div>
        </div>

        <div className="col-sm-12 row">
          <div className="col-sm-4">
            <span className="label">Default size (px)</span>
          </div>
          <div className="col-sm-8">
            <input
              type="text"
              className="input"
              value={data.value?.size}
              onChange={(e) => {
                const size = e.target.value
                const { format, greyscale } = data.value
                parent.postMessage({ pluginMessage: { type: 'save-config', config: { format, size, greyscale } } }, '*')
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 row">
          <div className="col-sm-4">
            <span className="label">Insert greyscale</span>
          </div>
          <div className="col-sm-8">
            <input
              type="checkbox"
              className=""
              checked={data.value?.greyscale}
              onChange={(e) => {
                const greyscale = e.target.checked
                console.log('change greyscalse', e.target.checked)
                const { size, format } = data.value
                parent.postMessage({ pluginMessage: { type: 'save-config', config: { format, size, greyscale } } }, '*')
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 row">
          <button
            className="primary small"
            onClick={() => {
              parent.postMessage({ pluginMessage: { type: 'save-config', config: { format: 'png', size: 128, greyscale: false } } }, '*')
            }}
          >
            Reset
          </button>
        </div>
      </Accordion>
    </div>
  )
}

export default More
