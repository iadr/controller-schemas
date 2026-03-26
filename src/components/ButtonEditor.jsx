import { useRef, useState, useEffect } from 'react'
import { renderLabel, getButtonOverlayStyle } from '../utils/controllerHelpers'
import ButtonEditorForm from './ButtonEditorForm'
import ButtonEditorList from './ButtonEditorList'

function ButtonEditor({ controller, initialButtons, onExport }) {
  const containerRef = useRef(null)
  const [buttons, setButtons] = useState(initialButtons)
  const [selectedButton, setSelectedButton] = useState(null)
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Update buttons when controller changes
  useEffect(() => {
    setButtons(initialButtons)
    setSelectedButton(null)
    setSelectedButtonInfo(null)
  }, [controller, initialButtons])

  // Update selectedButtonInfo when buttons change (keep form in sync)
  useEffect(() => {
    if (selectedButton) {
      const updatedButton = buttons.find(btn => btn.id === selectedButton)
      if (updatedButton) {
        setSelectedButtonInfo(updatedButton)
      }
    }
  }, [buttons, selectedButton])

  // Handle button click to show in editor form
  const handleButtonClick = (buttonId, buttonInfo, event) => {
    setSelectedButton(buttonId)
    setSelectedButtonInfo(buttonInfo)
  }

  // Update button properties
  const handleUpdateButton = (buttonId, updatedProps) => {
    setButtons(prev => prev.map(btn => 
      btn.id === buttonId ? { ...btn, ...updatedProps } : btn
    ))
  }

  // Add new button
  const handleAddButton = () => {
    const newButton = {
      id: `button_${Date.now()}`,
      x: 50,
      y: 50,
      label: 'New',
      shape: 'circle',
      size: 32,
      hideLabel: false,
      type: 'button'
    }
    setButtons(prev => [...prev, newButton])
  }

  // Delete button
  const handleDeleteButton = (buttonId) => {
    setButtons(prev => prev.filter(btn => btn.id !== buttonId))
    if (selectedButton === buttonId) {
      setSelectedButton(null)
      setSelectedButtonInfo(null)
    }
  }

  // Export button array
  const handleExport = () => {
    const exportText = `const buttons = ${JSON.stringify(buttons, null, 2)}`
    
    // Copy to clipboard
    navigator.clipboard.writeText(exportText).then(() => {
      alert('Button array copied to clipboard!')
    }).catch(err => {
      console.error('Failed to copy: ', err)
      // Fallback: show in modal
      onExport?.(exportText)
    })
  }

  // Get controller-specific image and style
  const getControllerConfig = () => {
    switch (controller) {
      case 'xbox':
        return {
          src: '/controllers/xbox-one.svg',
          alt: 'Xbox Controller',
          style: { width: '600px' }
        }
      case 'switch':
        return {
          src: '/controllers/switch.svg',
          alt: 'Nintendo Switch Controller',
          style: { maxWidth: '600px', height: '78vh', maxHeight: '100%' }
        }
      case 'steamdeck':
        return {
          src: '/controllers/steam-deck.svg',
          alt: 'Steam Deck Controller',
          style: { width: '700px', height: '400px' }
        }
      default:
        return {
          src: '/controllers/xbox-one.svg',
          alt: 'Controller',
          style: { width: '600px' }
        }
    }
  }

  const controllerConfig = getControllerConfig()

  return (
    <div className="controller-with-list" ref={containerRef}>
      {/* Left Side List */}
      <ButtonEditorList
        buttons={buttons}
        selectedButton={selectedButton}
        onButtonClick={handleButtonClick}
        onDeleteButton={handleDeleteButton}
        onAddButton={handleAddButton}
        onExport={handleExport}
        side="left"
      />

      {/* Controller Image and Buttons */}
      <div className="controller-svg-container">
        <img 
          src={controllerConfig.src}
          alt={controllerConfig.alt}
          className="controller-svg"
          style={controllerConfig.style}
        />
        {buttons.map(button => {
          const isSelected = selectedButton === button.id
          const overlayStyle = getButtonOverlayStyle(button)

          return (
            <div
              key={button.id}
              data-button-id={button.id}
              className={`button-marker ${isSelected ? 'selected' : ''} button-editor-marker`}
              style={{
                left: `${button.x}%`,
                top: `${button.y}%`
              }}
              onClick={(e) => handleButtonClick(button.id, button, e)}
            >
              <div className="button-marker-circle" style={overlayStyle}>
                {!button.hideLabel && renderLabel(button.label)}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right Side - Button Editor Form */}
      <ButtonEditorForm
        buttonInfo={selectedButtonInfo}
        onUpdate={handleUpdateButton}
      />
    </div>
  )
}

export default ButtonEditor
