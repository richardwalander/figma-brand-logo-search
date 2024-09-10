import { h } from 'preact'
import './colortile.css'

const ColorTile = ({ color }) => {
  return (
    <div
      className="color-tile rounded"
      style={`background-color:${color.hex};`}
      onClick={() => {
        parent.postMessage({ pluginMessage: { type: 'create-color', color } }, '*')
      }}
    >
      <span className="label" style={`color: ${getContrastColor(color.hex)};`}>
        {color.hex.toUpperCase()}
      </span>
    </div>
  )
}

function getContrastColor(hexColor) {
  // Remove the # if present
  hexColor = hexColor.replace('#', '')

  // Convert hex to RGB
  const r = parseInt(hexColor.substr(0, 2), 16)
  const g = parseInt(hexColor.substr(2, 2), 16)
  const b = parseInt(hexColor.substr(4, 2), 16)

  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#FFFFFF'
}

export default ColorTile
