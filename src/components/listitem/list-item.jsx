import { h } from 'preact'
import { useLocation } from 'wouter-preact'
import { useAppState } from '../../context/appstate'
import './list-item.css'
import * as mixpanel from 'mixpanel-figma'

const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN

const ListItem = ({ logo, name, domain }) => {
  const [location, setLocation] = useLocation()
  const { data } = useAppState()
  const { format, size, greyscale } = data.value
  return (
    <div
      className="list-item card fluid"
      onClick={() => {
        parent.postMessage({ pluginMessage: { type: 'create-logo', domain, format, greyscale, size } }, '*')
        window.sa_event('insert_logo', { domain })
        mixpanel.track('insert_logo', { domain })
      }}
    >
      <div className="section row">
        <div className="col-sm-2">
          <div className="logo circular" style={`background-image: url(https://img.logo.dev/${domain}?token=${token}`}></div>
        </div>
        <div className="col-sm-8">
          <strong className="name">{name}</strong>
          <span>{domain}</span>
        </div>
        <div className="col-sm-2 last">
          <div
            className="more-btn circular"
            onClick={(e) => {
              console.log('Click more', domain)
              e.stopPropagation()
              mixpanel.track('view_details', { domain })
              setLocation(`/details/${domain}`)
            }}
          >
            <i className="la la-ellipsis-v"></i>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListItem
