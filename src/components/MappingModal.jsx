import { useEffect, useRef } from 'react'
import MappingEditor from './MappingEditor'

function MappingModal({ 
  selectedButton, 
  buttonInfo, 
  mapping, 
  onUpdateMapping, 
  onDeleteMapping,
  onClose,
  buttonPosition 
}) {
  const modalRef = useRef(null)

  useEffect(() => {
    if (!modalRef.current || !buttonPosition) return

    const modal = modalRef.current
    const modalRect = modal.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // Calculate initial position next to the button
    let left = buttonPosition.left + buttonPosition.width + 20
    let top = buttonPosition.top

    // Adjust if modal would go off screen to the right
    if (left + modalRect.width > viewportWidth) {
      left = buttonPosition.left - modalRect.width - 20
    }

    // Adjust if modal would go off screen on the left
    if (left < 20) {
      left = 20
    }

    // Adjust if modal would go off screen at the bottom
    if (top + modalRect.height > viewportHeight) {
      top = viewportHeight - modalRect.height - 20
    }

    // Adjust if modal would go off screen at the top
    if (top < 20) {
      top = 20
    }

    modal.style.left = `${left}px`
    modal.style.top = `${top}px`
  }, [buttonPosition])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        // Check if the click was on a controller button
        const clickedElement = e.target
        const isControllerButton = clickedElement.closest('.controller-button, .stick, .dpad-button')
        
        // Only close if not clicking on a controller button
        if (!isControllerButton) {
          onClose()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  if (!selectedButton) return null

  return (
    <>
      <div className="modal-backdrop" />
      <div className="mapping-modal" ref={modalRef}>
        <div className="modal-header">
          <h3>Edit Mapping</h3>
          <button className="btn-close" onClick={onClose} title="Close (Esc)">
            ×
          </button>
        </div>
        <div className="modal-body">
          <MappingEditor
            selectedButton={selectedButton}
            buttonInfo={buttonInfo}
            mapping={mapping}
            onUpdateMapping={onUpdateMapping}
            onDeleteMapping={onDeleteMapping}
          />
        </div>
      </div>
    </>
  )
}

export default MappingModal
