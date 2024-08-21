import { h } from 'preact'
import './list-item.css'

const ListItem = ({ logo, name, domain, onClick }) => {
  return (
    <div className="card fluid" onClick={onClick}>
      {/* <style>{`
        .logo {
          height: 50px;
          width: 50px;
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          background-color: #eee;
        }
        .card {
          cursor: pointer;
        }
        .card:hover {
          border: solid 1px var(--input-focus-color);
        }
      `}</style> */}
      <div className="section row">
        <div className="col-sm-2">
          <div className="logo rounded" style={`background-image: url(${logo})`}></div>
        </div>
        <div className="col-sm-10">
          <strong>{name}</strong>
          <br />
          <span>{domain}</span>
        </div>
      </div>
    </div>
  )
}

export default ListItem
