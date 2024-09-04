import { h } from 'preact'
import './logotile.css'

const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN

const LogoTile = ({ domain, format = 'png', greyscale = false }) => {
  const url = `https://img.logo.dev/${domain}?token=${token}&format=${format}&greyscale=${greyscale}`
  return (
    <div className="logo-tile rounded">
      <div className="logo rounded" style={`background-image: url(${url})`}></div>
      <span className="label">{greyscale ? 'GREYSCALE' : format.toUpperCase()}</span>
    </div>
  )
}

export default LogoTile
