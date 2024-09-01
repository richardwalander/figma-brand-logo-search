import { h } from 'preact'
import './list-item.css'

const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN

const ListItem = ({ logo, name, domain, onClick, url }) => {
  return (
    <div className="card fluid" onClick={onClick}>
      <div className="section row">
        <div className="col-sm-2">
          <div className="logo rounded" style={`background-image: url(${url})`}></div>
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
