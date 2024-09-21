// import { extractColors } from 'extract-colors'
const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN
const secret = import.meta.env.VITE_LOGO_DEV_API_SECRET

figma.showUI(__html__, { themeColors: true })
figma.ui.resize(400, 620)
figma.root.setRelaunchData({ open: '' })

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'show-news':
      console.log('show-news', msg)
      handleShowNews(msg)
      break

    case 'open-url':
      console.log('open-url', msg)
      figma.openExternal(message.url)
      break

    case 'save-config':
      handleSaveConfig(msg.config)
      break

    case 'get-config':
      handleGetConfig()
      break

    case 'get-details':
      handleGetDetails(msg.domain)
      break

    case 'create-logo':
      handleCreateLogo(msg)
      break

    case 'create-color':
      handleCreateColor(msg)
      break

    case 'search-logo':
      handleSearch(msg.query)
      break

    case 'error':
      // console.log(msg.e);
      // figma.notify(msg.e);
      break

    case 'request-uuid':
      const uuid = await getOrGenerateUUID()

      // Send the UUID to the UI
      figma.ui.postMessage({ type: 'uuid-response', uuid })
      break

    case 'cancel':
      figma.closePlugin()
      break

    default:
      break
  }
}

async function handleShowNews(msg) {
  try {
    let version = await figma.clientStorage.getAsync('newsVersion')
    if (!version) {
      await figma.clientStorage.setAsync('newsVersion', msg.version)
      figma.ui.postMessage({ type: 'show-news', showNews: true })
    } else {
      console.log('handleShowNews', version, msg.version)
      await figma.clientStorage.setAsync('newsVersion', msg.version)
      figma.ui.postMessage({ type: 'show-news', showNews: version !== msg.version })
    }
  } catch (error) {
    console.error('Error generating or retrieving config:', error)
    throw error // Handle the error gracefully
  }
}

async function handleSaveConfig(config) {
  try {
    await figma.clientStorage.setAsync('userConfig', config)
    console.log('handleSaveConfig', config)
    figma.ui.postMessage({ type: 'got-config', config })
  } catch (error) {
    console.error('Error generating or retrieving config:', error)
    throw error // Handle the error gracefully
  }
}

async function handleGetConfig() {
  try {
    let config = await figma.clientStorage.getAsync('userConfig')
    if (!config) {
      await figma.clientStorage.setAsync('userConfig', { format: 'png', size: '128', greyscale: false })
      figma.ui.postMessage({ type: 'got-config', config: { format: 'png', size: '128', greyscale: false } })
    } else {
      figma.ui.postMessage({ type: 'got-config', config })
    }
  } catch (error) {
    console.error('Error generating or retrieving config:', error)
    throw error // Handle the error gracefully
  }
}

async function handleGetDetails(domain) {
  try {
    let url = `https://api.logo.dev/search?q=${domain}`
    const response = await fetch(url, {
      headers: {
        Bearer: secret,
      },
    })

    if (response.ok) {
      const json = await response.json()
      const info = json || []
      const details = info.find((d) => d.domain === domain)
      const image = await figma.createImageAsync(`https://img.logo.dev/${domain}?token=${token}`)
      const imageData = await image.getBytesAsync()
      console.log('handleGetDetails', details, imageData)
      figma.ui.postMessage({ type: 'got-details', details, imageData })
    } else {
      // figma.ui.postMessage({ type: 'search-result', data: [] })
      // setResult([]) // Optional: Handle cases where the response is not OK
    }
  } catch (error) {
    console.log('handleGetDetails', error, `https://img.logo.dev/${domain}?token=${token}`)
  }
}

async function handleCreateColor(msg) {
  console.log('handleCreateColor', msg)
  const rect = figma.createRectangle()

  // Set size and position (optional)
  rect.resize(100, 100)
  rect.x = 50
  rect.y = 50
  rect.cornerRadius = 4

  // Set color fill
  // const fillColor = { r: 1, g: 0.5, b: 0.2 } // Orange color
  const fillColor = hexToRgb(msg.color.hex) // Orange color
  rect.fills = [{ type: 'SOLID', color: fillColor }]

  // Create a fill style
  const styleName = 'LogoFetch/' + msg.color.hex
  const style = figma.createPaintStyle()
  style.name = styleName
  style.paints = [{ type: 'SOLID', color: fillColor }]

  // Apply the style to the rectangle
  await rect.setFillStyleIdAsync(style.id)
  // rect.fillStyleId = style.id
}

async function handleCreateLogo(msg) {
  console.log(msg)
  const { domain, format, greyscale, size } = msg
  const nodes = figma.currentPage.selection
  const image = await figma.createImageAsync(
    `https://img.logo.dev/${domain}?token=${token}&size=${size}&format=${format}&greyscale=${greyscale}`
  )
  if (nodes.length > 0) {
    nodes.forEach((node) => {
      // let image = figma.createImage(msg.imageArray)
      if (node.type !== 'SLICE' && node.type !== 'GROUP') {
        let fills = clone(node.fills)
        fills.push({ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash })
        node.fills = fills
        node.setRelaunchData({ edit: '' })
      }
    })
  } else {
    const node = figma.createRectangle()
    // const { width, height } = await image.getSizeAsync()
    node.resize(parseInt(size), parseInt(size))
    node.fills = [
      {
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL',
      },
    ]
    node.setRelaunchData({ edit: '' })
    nodes.push(node)
    figma.currentPage.selection = nodes
    // figma.notify('Please select a layer')
  }
}

function hexToRgb(hex) {
  // Remove the hash if it's there
  hex = hex.replace(/^#/, '')

  // Parse the hex values
  const bigint = parseInt(hex, 16)
  const r = ((bigint >> 16) & 255) / 255
  const g = ((bigint >> 8) & 255) / 255
  const b = (bigint & 255) / 255

  return { r, g, b }
}

function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

// Function to get or generate and store a UUID
function generateSimpleUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

async function getOrGenerateUUID() {
  try {
    let uuid = await figma.clientStorage.getAsync('userId')
    if (!uuid) {
      uuid = generateSimpleUUID() // Use the simpler UUID generator
      await figma.clientStorage.setAsync('userId', uuid)
    }
    return uuid
  } catch (error) {
    console.error('Error generating or retrieving UUID:', error)
    throw error // Handle the error gracefully
  }
}

async function handleSearch(query) {
  try {
    let url = `https://api.logo.dev/search?q=${query}`
    const response = await fetch(url, {
      headers: {
        Bearer: secret,
      },
    })

    if (response.ok) {
      const json = await response.json()
      const data = json || []
      figma.ui.postMessage({ type: 'search-result', data })
    } else {
      figma.ui.postMessage({ type: 'search-result', data: [] })
      // setResult([]) // Optional: Handle cases where the response is not OK
    }
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    figma.ui.postMessage({ type: 'search-result', data: [] })
    // setResult([]) // Handle fetch error
  }
}
