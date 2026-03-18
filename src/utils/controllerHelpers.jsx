/**
 * Helper function to render label (supports text, Unicode, and icon classes)
 * @param {string} label - The label to render (can be text, Unicode, or icon class)
 * @returns {JSX.Element|string|null} - Returns an icon element, text, or null
 */
export const renderLabel = (label) => {
  if (!label) return null
  
  // Check if it's a Bootstrap Icon (bi bi-*) or Font Awesome icon (fa fa-*, fas fa-*, etc.)
  const isIcon = /^(bi bi-|fa[sbrldt]? fa-|fa )/.test(label)
  
  if (isIcon) {
    return <i className={label} />
  }
  
  // Return plain text or Unicode character
  return label
}

/**
 * Generate style object for button overlay based on button properties
 * @param {Object} button - Button object with shape, size, width, height, borderRadius properties
 * @param {number} scaleFactor - Optional scale factor to adjust size (default: 1)
 * @returns {Object} - Style object with width, height, borderRadius
 */
export const getButtonOverlayStyle = (button, scaleFactor = 1) => {
  const baseStyle = {}
  
  // Handle different shapes
  switch (button.shape) {
    case 'circle': {
      // For circles, size represents the diameter in pixels
      const diameter = (button.size || 32) * scaleFactor
      baseStyle.width = `${diameter}px`
      baseStyle.height = `${diameter}px`
      baseStyle.borderRadius = '50%'
      break
    }
    
    case 'rect': {
      // For rectangles, use width and height
      const width = (button.width || 32) * scaleFactor
      const height = (button.height || 32) * scaleFactor
      baseStyle.width = `${width}px`
      baseStyle.height = `${height}px`
      baseStyle.borderRadius = button.borderRadius ? `${button.borderRadius * scaleFactor}px` : '4px'
      break
    }
    
    case 'capsule': {
      // For capsules (elongated rounded rectangles)
      const width = (button.width || 32) * scaleFactor
      const height = (button.height || 32) * scaleFactor
      baseStyle.width = `${width}px`
      baseStyle.height = `${height}px`
      // Capsules typically have height/2 borderRadius for pill shape
      baseStyle.borderRadius = button.borderRadius 
        ? `${button.borderRadius * scaleFactor}px` 
        : `${height / 2}px`
      break
    }
    
    case 'dpad': {
      // For d-pad buttons, use size as diameter
      const size = (button.size || 32) * scaleFactor
      baseStyle.width = `${size}px`
      baseStyle.height = `${size}px`
      baseStyle.borderRadius = '20%'
      break
    }
    
    default: {
      // Default fallback to circle
      const diameter = (button.size || 32) * scaleFactor
      baseStyle.width = `${diameter}px`
      baseStyle.height = `${diameter}px`
      baseStyle.borderRadius = '50%'
    }
  }
  
  return baseStyle
}
