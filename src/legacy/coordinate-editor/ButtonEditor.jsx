/**
 * @deprecated Coordinate editing is retained for old button-array workflows.
 * Active hit regions are defined by data-button-id in the controller SVGs.
 */
import { useRef, useState, useEffect } from 'react'
import ControllerArtwork from '../../modules/controllers/ControllerArtwork'
import { getControllerConfig } from '../../modules/controllers/registry'
import ButtonEditorForm from './ButtonEditorForm'
import ButtonEditorList from './ButtonEditorList'
function ButtonEditor({ controller, initialButtons, onExport }) {
  const containerRef = useRef(null)
  const [buttons, setButtons] = useState(initialButtons)
  const [selectedButton, setSelectedButton] = useState(null)
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null)

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
      <div className="controller-svg-container" style={{ width: getControllerConfig(controller).width }}>
        <ControllerArtwork controller={controller} selectedButton={selectedButton}
          onButtonClick={(id, _, event) => {
            const button = buttons.find(item => item.id === id)
            if (button) handleButtonClick(id, button, event)
          }} />

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
