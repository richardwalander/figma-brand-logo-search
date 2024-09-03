import { h } from 'preact'
import './list-item.css'
import * as mixpanel from 'mixpanel-figma'

const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN

const ListItem = ({ logo, name, domain, onClick }) => {
  return (
    <div
      className="card fluid"
      onClick={() => {
        parent.postMessage({ pluginMessage: { type: 'create-logo', domain } }, '*')
        window.sa_event('insert_logo', { domain })
        mixpanel.track('insert_logo', { domain })
      }}
    >
      <div className="section row">
        <div className="col-sm-2">
          <div className="logo rounded" style={`background-image: url(https://img.logo.dev/${domain}?token=${token}`}></div>
        </div>
        <div className="col-sm-10">
          <strong className="name">{name}</strong>
          <span>{domain}</span>
        </div>
      </div>
    </div>
  )
}

export default ListItem
