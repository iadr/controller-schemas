import { useRef, useEffect, useState } from 'react'

function SwitchController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [buttonPositions, setButtonPositions] = useState({})
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments

  const buttons = [
    { id: 'A', x: 80, y: 60, label: 'A' },
    { id: 'B', x: 85, y: 55, label: 'B' },
    { id: 'X', x: 75, y: 55, label: 'X' },
    { id: 'Y', x: 80, y: 50, label: 'Y' },
    { id: 'L', x: 20, y: 25, label: 'L' },
    { id: 'R', x: 80, y: 25, label: 'R' },
    { id: 'ZL', x: 15, y: 15, label: 'ZL' },
    { id: 'ZR', x: 85, y: 15, label: 'ZR' },
    { id: 'LStick', x: 25, y: 55, label: 'L↻' },
    { id: 'RStick', x: 65, y: 70, label: 'R↻' },
    { id: 'DpadUp', x: 35, y: 50, label: '↑' },
    { id: 'DpadDown', x: 35, y: 60, label: '↓' },
    { id: 'DpadLeft', x: 30, y: 55, label: '←' },
    { id: 'DpadRight', x: 40, y: 55, label: '→' },
    { id: 'Plus', x: 60, y: 45, label: '+' },
    { id: 'Minus', x: 40, y: 45, label: '-' },
    { id: 'Home', x: 50, y: 65, label: '⌂' },
    { id: 'Capture', x: 50, y: 55, label: '◉' }
  ]

  useEffect(() => {
    if (containerRef.current) {
      const updatePositions = () => {
        const container = containerRef.current
        const rect = container.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })

        const newPositions = {}
        buttons.forEach(button => {
          const marker = container.querySelector(`[data-button-id="${button.id}"]`)
          if (marker) {
            const markerRect = marker.getBoundingClientRect()
            newPositions[button.id] = {
              x: markerRect.left - rect.left + markerRect.width / 2,
              y: markerRect.top - rect.top + markerRect.height / 2
            }
          }
        })
        setButtonPositions(newPositions)
      }

      updatePositions()
      window.addEventListener('resize', updatePositions)
      setTimeout(updatePositions, 100)

      return () => window.removeEventListener('resize', updatePositions)
    }
  }, [mappings])

  const getMappingLabel = (buttonId) => {
    const mapping = mappings[buttonId]
    if (!mapping) return null
    if (typeof mapping === 'string') return mapping
    if (typeof mapping === 'object' && mapping.action) return mapping.action
    return null
  }

  const buttonsWithMappings = buttons
    .map(button => ({
      ...button,
      mappingLabel: getMappingLabel(button.id)
    }))
    .filter(button => button.mappingLabel)

  // Helper function to determine which side a button should be on
  const getButtonSide = (button) => {
    // Check if there's a manual override
    if (buttonSideOverrides[button.id]) {
      return buttonSideOverrides[button.id]
    }
    // Otherwise use the default x position
    return button.x < 50 ? 'left' : 'right'
  }

  // Split buttons into left and right based on position or override
  const leftButtons = buttonsWithMappings.filter(button => getButtonSide(button) === 'left')
  const rightButtons = buttonsWithMappings.filter(button => getButtonSide(button) === 'right')

  // Drag and drop handlers
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverSide, setDragOverSide] = useState(null)

  const handleDragStart = (e, button) => {
    setDraggedItem(button)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverSide(null)
  }

  const handleDragOver = (e, side) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSide(side)
  }

  const handleDragLeave = (e) => {
    // Only clear if we're leaving the container, not a child
    if (e.currentTarget === e.target) {
      setDragOverSide(null)
    }
  }

  const handleDrop = (e, targetSide) => {
    e.preventDefault()
    setDragOverSide(null)
    
    if (!draggedItem) return

    // Determine the current side of the dragged item
    const currentSide = getButtonSide(draggedItem)
    
    // If dropping on the same side, do nothing
    if (currentSide === targetSide) return

    // Update the button side override to move it to the target side
    setButtonSideOverrides(prev => ({
      ...prev,
      [draggedItem.id]: targetSide
    }))
  }

  return (
    <div className="controller-with-list" ref={containerRef}>
      <svg className="guide-lines-svg" style={{ width: dimensions.width, height: dimensions.height }}>
        {buttonsWithMappings.map((button) => {
          const buttonPos = buttonPositions[button.id]
          if (!buttonPos) return null

          const listItem = document.querySelector(`[data-list-button="${button.id}"]`)
          if (!listItem) return null

          const listRect = listItem.getBoundingClientRect()
          const containerRect = containerRef.current?.getBoundingClientRect()
          if (!containerRect) return null

          const endX = listRect.left - containerRect.left
          const endY = listRect.top - containerRect.top + listRect.height / 2

          return (
            <line
              key={button.id}
              x1={buttonPos.x}
              y1={buttonPos.y}
              x2={endX}
              y2={endY}
              className={`guide-line ${selectedButton === button.id ? 'selected' : ''}`}
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          )
        })}
      </svg>

      {/* Left Side List */}
      <div 
        className={`mappings-list-container ${dragOverSide === 'left' ? 'drag-over' : ''}`}
        onDragOver={(e) => handleDragOver(e, 'left')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'left')}
      >
        <h4 className="mappings-list-title">Left Side</h4>
          {leftButtons.length === 0 ? (
            <div className="no-mappings-message">
              <p>No left side mappings</p>
            </div>
          ) : (
            leftButtons.map(button => (
              <div
                key={button.id}
                data-list-button={button.id}
                className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, button)}
                onDragEnd={handleDragEnd}
                onClick={() => onButtonClick(button.id)}
              >
                <div className="mapping-list-button-label">{button.label}</div>
                <div className="mapping-list-actions">
                  <div className="mapping-list-action">
                    <span className="action-name">{button.mappingLabel}</span>
                  </div>
                </div>
              </div>
            ))
          )}
      </div>

      <div className="controller-svg-container">
        <img 
          src="/controllers/switch.svg" 
          alt="Nintendo Switch Controller" 
          className="controller-svg"
          style={{ width: '600px' }}
        />
        {buttons.map(button => {
          const mappingLabel = getMappingLabel(button.id)
          const isSelected = selectedButton === button.id
          const hasMapping = !!mappingLabel

          return (
            <div
              key={button.id}
              data-button-id={button.id}
              className={`button-marker ${isSelected ? 'selected' : ''} ${hasMapping ? 'has-mapping' : ''}`}
              style={{
                left: `${button.x}%`,
                top: `${button.y}%`
              }}
              onClick={() => onButtonClick(button.id)}
            >
              <div className="button-marker-circle">
                {button.label}
              </div>
            </div>
          )
        })}
      </div>

      {/* Right Side List */}
      <div 
        className={`mappings-list-container ${dragOverSide === 'right' ? 'drag-over' : ''}`}
        onDragOver={(e) => handleDragOver(e, 'right')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'right')}
      >
        <h4 className="mappings-list-title">Right Side</h4>
          {rightButtons.length === 0 ? (
            <div className="no-mappings-message">
              <p>No right side mappings</p>
            </div>
          ) : (
            rightButtons.map(button => (
              <div
                key={button.id}
                data-list-button={button.id}
                className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, button)}
                onDragEnd={handleDragEnd}
                onClick={() => onButtonClick(button.id)}
              >
                <div className="mapping-list-button-label">{button.label}</div>
                <div className="mapping-list-actions">
                  <div className="mapping-list-action">
                    <span className="action-name">{button.mappingLabel}</span>
                  </div>
                </div>
              </div>
            ))
          )}
      </div>
    </div>
  )
}

export default SwitchController
