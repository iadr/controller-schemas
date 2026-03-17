import { useRef, useEffect, useState } from 'react'

function SteamDeckController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [buttonPositions, setButtonPositions] = useState({})
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments

  const buttons = [
    // Face buttons
    { id: 'A', x: 70, y: 45, label: 'A' },
    { id: 'B', x: 75, y: 40, label: 'B' },
    { id: 'X', x: 65, y: 40, label: 'X' },
    { id: 'Y', x: 70, y: 35, label: 'Y' },
    
    // D-pad
    { id: 'DpadUp', x: 30, y: 35, label: '↑' },
    { id: 'DpadDown', x: 30, y: 45, label: '↓' },
    { id: 'DpadLeft', x: 25, y: 40, label: '←' },
    { id: 'DpadRight', x: 35, y: 40, label: '→' },
    
    // Bumpers and triggers
    { id: 'L1', x: 15, y: 20, label: 'L1' },
    { id: 'L2', x: 10, y: 15, label: 'L2' },
    { id: 'R1', x: 85, y: 20, label: 'R1' },
    { id: 'R2', x: 90, y: 15, label: 'R2' },
    
    // Sticks
    { id: 'L3', x: 25, y: 55, label: 'L3' },
    { id: 'R3', x: 75, y: 55, label: 'R3' },
    
    // Back buttons
    { id: 'L4', x: 5, y: 35, label: 'L4' },
    { id: 'L5', x: 5, y: 45, label: 'L5' },
    { id: 'R4', x: 95, y: 35, label: 'R4' },
    { id: 'R5', x: 95, y: 45, label: 'R5' },
    
    // Center buttons
    { id: 'Menu', x: 45, y: 25, label: '≡' },
    { id: 'Steam', x: 50, y: 30, label: '⚙' },
    { id: 'View', x: 55, y: 25, label: '⊡' },
    { id: 'QuickAccess', x: 50, y: 65, label: '...' },
    
    // Touchpads
    { id: 'LeftPad', x: 20, y: 70, label: 'L◯' },
    { id: 'RightPad', x: 80, y: 70, label: 'R◯' }
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

      <div style={{ width: '700px', height: '400px', position: 'relative' }}>
        {/* Steam Deck outline SVG */}
        <svg width="100%" height="100%" viewBox="0 0 100 60">
          <defs>
            <linearGradient id="deckGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#374151', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          
          {/* Main body */}
          <rect x="10" y="20" width="80" height="35" rx="5" fill="url(#deckGradient)" stroke="#1f2937" strokeWidth="1"/>
          
          {/* Left grip */}
          <ellipse cx="15" cy="42" rx="8" ry="15" fill="url(#deckGradient)" stroke="#1f2937" strokeWidth="1"/>
          
          {/* Right grip */}
          <ellipse cx="85" cy="42" rx="8" ry="15" fill="url(#deckGradient)" stroke="#1f2937" strokeWidth="1"/>
          
          {/* Screen area */}
          <rect x="25" y="25" width="50" height="25" rx="2" fill="#1a1a1a" stroke="#000" strokeWidth="0.5"/>
          
          {/* Left touchpad */}
          <circle cx="18" cy="48" r="4" fill="#2c2c2c" stroke="#1f2937" strokeWidth="0.5"/>
          
          {/* Right touchpad */}
          <circle cx="82" cy="48" r="4" fill="#2c2c2c" stroke="#1f2937" strokeWidth="0.5"/>
          
          {/* Left stick  */}
          <circle cx="22" cy="35" r="3" fill="#4b5563" stroke="#1f2937" strokeWidth="0.5"/>
          
          {/* Right stick */}
          
          {/* Face buttons area */}
          <circle cx="72" cy="30" r="1.5" fill="#6b7280"/>
          <circle cx="76" cy="30" r="1.5" fill="#6b7280"/>
          <circle cx="72" cy="34" r="1.5" fill="#6b7280"/>
          <circle cx="76" cy="34" r="1.5" fill="#6b7280"/>
          
          {/* D-pad */}
          <path d="M 28 30 L 30 30 L 30 28 L 32 28 L 32 30 L 34 30 L 34 32 L 32 32 L 32 34 L 30 34 L 30 32 L 28 32 Z" fill="#4b5563" stroke="#1f2937" strokeWidth="0.3"/>
        </svg>

        {/* Clickable button overlays */}
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

export default SteamDeckController
