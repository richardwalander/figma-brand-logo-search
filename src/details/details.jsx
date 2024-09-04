import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'wouter-preact'
import BackButton from '../components/backbutton/backbutton'
import './details.css'
import Accordion from '../components/accordion/accordion'
import LogoTile from '../components/tiles/logotile'

const Details = () => {
  const [brand, setBrand] = useState()
  const { domain } = useParams()
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'search-logo', query: domain } }, '*')
    window.onmessage = (event) => {
      const msg = event.data.pluginMessage
      switch (msg.type) {
        case 'search-result':
          const b = msg.data.find((d) => d.domain === domain)
          console.log('details', b)
          setBrand(b)
          // setResult(msg.data)
          break
        default:
          break
      }
    }
  }, [])
  return (
    <div className="container details">
      <div className="row header">
        <div className="col-sm-2">
          <BackButton></BackButton>
        </div>
        <div className="col-sm">
          <h5>Brand assets</h5>
        </div>
      </div>
      {brand ? (
        <>
          <div className="row info">
            <div className="col-sm-3">
              <div className="logo circular" style={`background-image: url(${brand.logo_url}`}></div>
            </div>
            <div className="col-sm-7 text">
              <strong className="name">{brand.name}</strong>
              <span>{brand.domain}</span>
            </div>
          </div>
          <Accordion title="Logotypes">
            <div className="col-sm-12 row">
              <div className="col-sm-6">
                <LogoTile domain={brand.domain} format="png"></LogoTile>
              </div>
              <div className="col-sm-6">
                <LogoTile domain={brand.domain} format="jpg"></LogoTile>
              </div>
            </div>
            <div className="col-sm-12 row" style={{ paddingTop: 10 }}>
              <div className="col-sm-6">
                <LogoTile domain={brand.domain} greyscale={true}></LogoTile>
              </div>
            </div>
          </Accordion>
          <Accordion title="Colors"></Accordion>
        </>
      ) : (
        <div className="row">
          <div className="col-sm">Loading...</div>
        </div>
      )}
    </div>
  )
}

export default Details
