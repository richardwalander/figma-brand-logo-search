import { h } from 'preact'
import './backbutton.css'

const BackButton = () => {
  return (
    <div
      className="back-button circular"
      onClick={() => {
        history.back()
      }}
    >
      <i className="la la-arrow-left"></i>
    </div>
  )
}

export default BackButton
