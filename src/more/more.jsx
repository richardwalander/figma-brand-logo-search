import { h } from 'preact'
import Accordion from '../components/accordion/accordion'
import { useAppState } from '../context/appstate'
import './more.css'
import * as mixpanel from 'mixpanel-figma'

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
                mixpanel.track('change_setting', { setting: 'format' })
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
            {/* <input
              type="text"
              className="input"
              value={data.value?.size}
              onChange={(e) => {
                const size = e.target.value
                const { format, greyscale } = data.value
                parent.postMessage({ pluginMessage: { type: 'save-config', config: { format, size, greyscale } } }, '*')
              }}
            /> */}
            <select
              className="input"
              name="size"
              id="size"
              onChange={(e) => {
                const size = e.target.value
                const { format, greyscale } = data.value
                parent.postMessage({ pluginMessage: { type: 'save-config', config: { format, size, greyscale } } }, '*')
                mixpanel.track('change_setting', { setting: 'size' })
              }}
            >
              <option value="16" selected={data.value?.size === '16'}>
                16px
              </option>
              <option value="24" selected={data.value?.size === '24'}>
                24px
              </option>
              <option value="32" selected={data.value?.size === '32'}>
                32px
              </option>
              <option value="48" selected={data.value?.size === '48'}>
                48px
              </option>
              <option value="56" selected={data.value?.size === '56'}>
                56px
              </option>
              <option value="64" selected={data.value?.size === '64'}>
                64px
              </option>
              <option value="72" selected={data.value?.size === '72'}>
                72px
              </option>
              <option value="96" selected={data.value?.size === '96'}>
                96px
              </option>
              <option value="128" selected={data.value?.size === '128'}>
                128px
              </option>
              <option value="256" selected={data.value?.size === '256'}>
                256px
              </option>
            </select>
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
                mixpanel.track('change_setting', { setting: 'greyscale' })
              }}
            />
          </div>
        </div>

        <div className="col-sm-12 row">
          <button
            className="primary small"
            onClick={() => {
              parent.postMessage({ pluginMessage: { type: 'save-config', config: { format: 'png', size: '128', greyscale: false } } }, '*')
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
