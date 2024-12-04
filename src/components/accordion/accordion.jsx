import { h } from 'preact'
import './accordion.css'
import { useState } from 'preact/hooks'

const Accordion = ({ title, children, open }) => {
  const [isOpen, setIsOpen] = useState(open || true)
  return (
    <>
      <div
        className="row accordion-title"
        onClick={() => {
          setIsOpen(!isOpen)
        }}
      >
        <div className="col-sm">
          <h5>{title}</h5>
        </div>
        <div className="col-sm-1">{isOpen ? <i className="la la-angle-down"></i> : <i className="la la-angle-right"></i>}</div>
      </div>
      {isOpen ? <div className="row accordion-content">{children}</div> : null}
    </>
  )
}

export default Accordion
