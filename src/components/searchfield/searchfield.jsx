import { h } from 'preact'
import './searchfield.css'

const SearchField = ({ domain, onSearch, onClear }) => {
  return (
    <div className="input col-sm-12">
      <input id="domain" value={domain} onKeyUp={onSearch} placeholder="Search for domain or brandname" />
      {domain !== '' && (
        <div className="close" onClick={onClear}>
          <i className="las la-times"></i>
        </div>
      )}
    </div>
  )
}

export default SearchField
