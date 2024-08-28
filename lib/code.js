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

figma.showUI(__html__, { themeColors: true })
figma.ui.resize(400, 520)

function clone(val) {
  return JSON.parse(JSON.stringify(val))
}

figma.ui.onmessage = async (msg) => {
  switch (msg.type) {
    case 'create-logo':
      const nodes = figma.currentPage.selection
      if (nodes.length > 0) {
        nodes.forEach((node) => {
          let image = figma.createImage(msg.imageArray)
          if (node.type !== 'SLICE' && node.type !== 'GROUP') {
            let fills = clone(node.fills)
            fills.push({ type: 'IMAGE', scaleMode: 'FILL', imageHash: image.hash })
            node.fills = fills
          }
        })
      } else {
        figma.notify('Please select a layer')
      }
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
