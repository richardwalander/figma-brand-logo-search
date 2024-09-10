import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { useParams } from 'wouter-preact'
import BackButton from '../components/backbutton/backbutton'
import './details.css'
import Accordion from '../components/accordion/accordion'
import LogoTile from '../components/tiles/logotile'
import { prominent } from 'color.js'
import { extractColors } from 'extract-colors'
import ColorTile from '../components/tiles/colortile'

const Details = () => {
  const [brand, setBrand] = useState()
  const [colors, setColors] = useState([])
  const { domain } = useParams()
  useEffect(() => {
    parent.postMessage({ pluginMessage: { type: 'get-details', domain } }, '*')
    window.onmessage = async (event) => {
      const msg = event.data.pluginMessage
      switch (msg.type) {
        case 'got-details':
          const { details, imageData } = msg
          const url = URL.createObjectURL(new Blob([imageData]))
          let extractedColors = await extractColors(url, {
            pixels: 84000,
            distance: 0.12,
            saturationDistance: 0.1,
            lightnessDistance: 0.1,
            // hueDistance: 0.033333333,
          })
          extractedColors = extractedColors.filter((c) => c.area > 0.01)
          extractedColors = extractedColors.sort((a, b) => b.area - a.area)
          // const b = data.find((d) => d.domain === domain)
          console.log('got-details', details, extractedColors)

          setColors(extractedColors)
          setBrand(details)
          // setResult(msg.data)
          break
        default:
          break
      }
    }
  }, [])

  // useEffect(() => {
  //   const img = document.querySelector('#logo-img')
  //   prominent(img, { amount: 1, format: 'hex' })
  //     .then((color) => {
  //       console.log(color)
  //       debugger
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //       debugger
  //     })
  // }, [brand])
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
              <img id="logo-img" className="logo circular" src={brand.logo_url}></img>
            </div>
            <div className="col-sm-7 text">
              <strong className="name">{brand.name}</strong>
              <span>{brand.domain}</span>
            </div>
          </div>
          <Accordion title="Logotype variants">
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
          <Accordion title="Logo colors">
            {colors.map((color) => (
              <div className="col-sm-6" style={{ paddingTop: 10 }}>
                <ColorTile color={color}></ColorTile>
              </div>
            ))}
          </Accordion>
        </>
      ) : (
        <div className="loading row">
          <div className="col-sm">
            <h1 style={{ fontSize: 128, textAlign: 'center' }}>⏳</h1>
            <p style={{ textAlign: 'center' }}>Loading...</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Details
