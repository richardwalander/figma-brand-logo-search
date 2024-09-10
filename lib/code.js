import { prominent } from 'color.js'
// import { extractColors } from 'extract-colors'
const token = import.meta.env.VITE_LOGO_DEV_API_TOKEN
const secret = import.meta.env.VITE_LOGO_DEV_API_SECRET

figma.showUI(__html__, { themeColors: true })
figma.ui.resize(400, 620)

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'get-details':
      handleGetDetails(msg.domain)
      break

    case 'create-logo':
      handleCreateLogo(msg)
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

async function handleCreateLogo(msg) {
  console.log(msg)
  const nodes = figma.currentPage.selection
  const image = await figma.createImageAsync(`https://img.logo.dev/${msg.domain}?token=${token}`)
  if (nodes.length > 0) {
    nodes.forEach((node) => {
      // let image = figma.createImage(msg.imageArray)
      if (node.type !== 'SLICE' && node.type !== 'GROUP') {
        let fills = clone(node.fills)
        fills.push({ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash })
        node.fills = fills
      }
    })
  } else {
    const node = figma.createRectangle()
    const { width, height } = await image.getSizeAsync()
    node.resize(width, height)
    node.fills = [
      {
        type: 'IMAGE',
        imageHash: image.hash,
        scaleMode: 'FILL',
      },
    ]
    nodes.push(node)
    figma.currentPage.selection = nodes
    // figma.notify('Please select a layer')
  }
}

function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

// Function to get or generate and store a UUID
function generateSimpleUUID() {
  debugger
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
