import { toPng } from 'html-to-image'

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
