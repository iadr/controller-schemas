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
