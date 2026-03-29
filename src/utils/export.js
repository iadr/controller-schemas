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

// Export controller mapping as image
export const exportControllerToImage = async (controller, context, mappings) => {
  // Create a temporary container
  const container = document.createElement('div')
  container.style.position = 'absolute'
  container.style.left = '-9999px'
  container.style.top = '-9999px'
  container.style.width = '1200px'
  document.body.appendChild(container)

  try {
    // Render the export view
    const root = createRoot(container)
    
    await new Promise((resolve) => {
      root.render(
        <ControllerExportView 
          controller={controller}
          context={context}
          mappings={mappings}
        />
      )
      // Wait for images and fonts to load
      setTimeout(resolve, 1000)
    })

    // Wait a bit more to ensure all assets are loaded
    await new Promise(resolve => setTimeout(resolve, 200))

    // Generate the image
    const dataUrl = await toPng(container.firstChild, {
      quality: 1,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      width: 1200,
      height: container.firstChild.offsetHeight,
      cacheBust: true,
      skipFonts: false
    })
    
    // Download the image
    const link = document.createElement('a')
    link.href = dataUrl
    link.download = `${controller}-${context}-mapping.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Cleanup
    root.unmount()
  } catch (error) {
    console.error('Error exporting controller image:', error)
    throw error
  } finally {
    document.body.removeChild(container)
  }
}
