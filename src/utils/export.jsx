import React from 'react'
import { toPng } from 'html-to-image'
import { createRoot } from 'react-dom/client'
import ControllerExportView from '../components/ControllerExportView'

// Export scheme as JSON file
export const exportToJSON = (data, filename) => {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Import scheme from JSON file
export const importFromJSON = (file, callback) => {
  const reader = new FileReader()
  
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result)
      callback(data)
    } catch (error) {
      alert('Error reading file: Invalid JSON format')
      console.error('Import error:', error)
    }
  }
  
  reader.readAsText(file)
}

// Export diagram as PNG
export const exportToPNG = async (element, filename) => {
  if (!element) {
    alert('No diagram to export')
    return
  }

  try {
    const dataUrl = await toPng(element, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff'
    })
    
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    alert('Error exporting PNG. Please try again.')
    console.error('PNG export error:', error)
  }
}

// Preload image helper
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = (error) => {
      console.error('Failed to preload image:', src, error)
      reject(new Error(`Failed to load image: ${src}`))
    }
    img.src = src
    // Add timeout
    setTimeout(() => reject(new Error(`Image load timeout: ${src}`)), 5000)
  })
}

// Get controller image path
const getControllerImagePath = (controller) => {
  const imageMap = {
    'xbox': './controllers/xbox-one.svg',
    'switch': './controllers/switch.svg',
    'steamdeck': './controllers/steam-deck.svg',
    'keyboardmouse': './controllers/QWERTY_en_mouse.svg',
    'keyboard': './controllers/QWERTY_keyboard_en.svg'
  }
  return imageMap[controller] || ''
}

// Export controller mapping as image
export const exportControllerToImage = async (controller, context, mappings) => {
  let container = null
  let root = null

  try {
    // Preload controller image FIRST
    const imagePath = getControllerImagePath(controller)
    if (imagePath) {
      console.log(`Preloading image for ${controller}: ${imagePath}`)
      await preloadImage(imagePath)
      console.log(`Image preloaded successfully for ${controller}`)
    }

    // Create a temporary container
    container = document.createElement('div')
    container.style.position = 'absolute'
    container.style.left = '-9999px'
    container.style.top = '-9999px'
    container.style.width = '1200px'
    container.style.visibility = 'hidden' // Hide but keep layout
    document.body.appendChild(container)

    // Render the export view
    root = createRoot(container)
    
    // Render and wait for component to mount
    await new Promise((resolve) => {
      root.render(
        <ControllerExportView 
          controller={controller}
          context={context}
          mappings={mappings}
        />
      )
      // Give React time to render
      setTimeout(resolve, 500)
    })

    // Double-check images are loaded
    const images = container.querySelectorAll('img')
    console.log(`Found ${images.length} images in container`)
    
    if (images.length > 0) {
      const imageLoadPromises = Array.from(images).map((img, index) => {
        return new Promise((resolve) => {
          if (img.complete && img.naturalHeight !== 0) {
            console.log(`Image ${index} already loaded:`, img.src)
            resolve()
          } else {
            console.log(`Waiting for image ${index} to load:`, img.src)
            const timeout = setTimeout(() => {
              console.warn(`Image ${index} load timeout:`, img.src)
              resolve() // Continue anyway
            }, 3000)
            
            img.onload = () => {
              clearTimeout(timeout)
              console.log(`Image ${index} loaded successfully`)
              resolve()
            }
            
            img.onerror = (error) => {
              clearTimeout(timeout)
              console.error(`Image ${index} failed to load:`, img.src, error)
              resolve() // Continue anyway
            }
          }
        })
      })
      
      await Promise.all(imageLoadPromises)
    }

    // Additional delay to ensure everything is stable
    await new Promise(resolve => setTimeout(resolve, 300))

    // Make visible for capture
    container.style.visibility = 'visible'

    // Generate the image with CORS-safe options
    console.log(`Generating image for ${controller} - ${context}`)
    const dataUrl = await toPng(container.firstChild, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: 1200,
      height: container.firstChild.offsetHeight,
      cacheBust: true, // Force fresh capture each time
      skipFonts: true,
      skipAutoScale: false
    })
    
    console.log(`Image generated successfully for ${controller} - ${context}`)

    // Download the image
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${controller}-${context}-mapping.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

  } catch (error) {
    console.error('Error exporting controller image:', error)
    throw error
  } finally {
    // Thorough cleanup
    console.log(`Cleaning up export for ${controller} - ${context}`)
    
    if (root) {
      try {
        await new Promise(resolve => {
          root.unmount()
          setTimeout(resolve, 100) // Give time for unmount
        })
      } catch (e) {
        console.warn('Error unmounting root:', e)
      }
    }
    
    if (container && container.parentNode) {
      try {
        container.parentNode.removeChild(container)
      } catch (e) {
        console.warn('Error removing container:', e)
      }
    }
    
    // Force garbage collection hint
    container = null
    root = null
  }
}
