import { useRef, useEffect, useState } from 'react'

function KeyboardMouseDisplay({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [buttonPositions, setButtonPositions] = useState({})
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  const keyboardLayout = [
    // Row 1
    { id: 'Esc', x: 2, y: 5, w: 3, label: 'Esc' },
    { id: 'F1', x: 8, y: 5, w: 3, label: 'F1' },
    { id: 'F2', x: 12, y: 5, w: 3, label: 'F2' },
    { id: 'F3', x: 16, y: 5, w: 3, label: 'F3' },
    { id: 'F4', x: 20, y: 5, w: 3, label: 'F4' },
    { id: 'F5', x: 25, y: 5, w: 3, label: 'F5' },
    { id: 'F6', x: 29, y: 5, w: 3, label: 'F6' },
    { id: 'F7', x: 33, y: 5, w: 3, label: 'F7' },
    { id: 'F8', x: 37, y: 5, w: 3, label: 'F8' },
    { id: 'F9', x: 42, y: 5, w: 3, label: 'F9' },
    { id: 'F10', x: 46, y: 5, w: 3, label: 'F10' },
    { id: 'F11', x: 50, y: 5, w: 3, label: 'F11' },
    { id: 'F12', x: 54, y: 5, w: 3, label: 'F12' },
    
    // Row 2 - Numbers
    { id: '`', x: 2, y: 12, w: 3, label: '`' },
    { id: '1', x: 6, y: 12, w: 3, label: '1' },
    { id: '2', x: 10, y: 12, w: 3, label: '2' },
    { id: '3', x: 14, y: 12, w: 3, label: '3' },
    { id: '4', x: 18, y: 12, w: 3, label: '4' },
    { id: '5', x: 22, y: 12, w: 3, label: '5' },
    { id: '6', x: 26, y: 12, w: 3, label: '6' },
    { id: '7', x: 30, y: 12, w: 3, label: '7' },
    { id: '8', x: 34, y: 12, w: 3, label: '8' },
    { id: '9', x: 38, y: 12, w: 3, label: '9' },
    { id: '0', x: 42, y: 12, w: 3, label: '0' },
    { id: '-', x: 46, y: 12, w: 3, label: '-' },
    { id: '=', x: 50, y: 12, w: 3, label: '=' },
    { id: 'Backspace', x: 54, y: 12, w: 5, label: '←' },
    
    // Row 3 - QWERTY
    { id: 'Tab', x: 2, y: 17, w: 4, label: 'Tab' },
    { id: 'Q', x: 7, y: 17, w: 3, label: 'Q' },
    { id: 'W', x: 11, y: 17, w: 3, label: 'W' },
    { id: 'E', x: 15, y: 17, w: 3, label: 'E' },
    { id: 'R', x: 19, y: 17, w: 3, label: 'R' },
    { id: 'T', x: 23, y: 17, w: 3, label: 'T' },
    { id: 'Y', x: 27, y: 17, w: 3, label: 'Y' },
    { id: 'U', x: 31, y: 17, w: 3, label: 'U' },
    { id: 'I', x: 35, y: 17, w: 3, label: 'I' },
    { id: 'O', x: 39, y: 17, w: 3, label: 'O' },
    { id: 'P', x: 43, y: 17, w: 3, label: 'P' },
    { id: '[', x: 47, y: 17, w: 3, label: '[' },
    { id: ']', x: 51, y: 17, w: 3, label: ']' },
    { id: '\\', x: 55, y: 17, w: 4, label: '\\' },
    
    // Row 4 - ASDF
    { id: 'CapsLock', x: 2, y: 22, w: 5, label: 'Caps' },
    { id: 'A', x: 8, y: 22, w: 3, label: 'A' },
    { id: 'S', x: 12, y: 22, w: 3, label: 'S' },
    { id: 'D', x: 16, y: 22, w: 3, label: 'D' },
    { id: 'F', x: 20, y: 22, w: 3, label: 'F' },
    { id: 'G', x: 24, y: 22, w: 3, label: 'G' },
    { id: 'H', x: 28, y: 22, w: 3, label: 'H' },
    { id: 'J', x: 32, y: 22, w: 3, label: 'J' },
    { id: 'K', x: 36, y: 22, w: 3, label: 'K' },
    { id: 'L', x: 40, y: 22, w: 3, label: 'L' },
    { id: ';', x: 44, y: 22, w: 3, label: ';' },
    { id: '\'', x: 48, y: 22, w: 3, label: '\'' },
    { id: 'Enter', x: 52, y: 22, w: 7, label: 'Enter' },
    
    // Row 5 - ZXCV
    { id: 'Shift', x: 2, y: 27, w: 7, label: 'Shift' },
    { id: 'Z', x: 10, y: 27, w: 3, label: 'Z' },
    { id: 'X', x: 14, y: 27, w: 3, label: 'X' },
    { id: 'C', x: 18, y: 27, w: 3, label: 'C' },
    { id: 'V', x: 22, y: 27, w: 3, label: 'V' },
    { id: 'B', x: 26, y: 27, w: 3, label: 'B' },
    { id: 'N', x: 30, y: 27, w: 3, label: 'N' },
    { id: 'M', x: 34, y: 27, w: 3, label: 'M' },
    { id: ',', x: 38, y: 27, w: 3, label: ',' },
    { id: '.', x: 42, y: 27, w: 3, label: '.' },
    { id: '/', x: 46, y: 27, w: 3, label: '/' },
    { id: 'RShift', x: 50, y: 27, w: 9, label: 'Shift' },
    
    // Row 6 - Bottom
    { id: 'Ctrl', x: 2, y: 32, w: 4, label: 'Ctrl' },
    { id: 'Win', x: 7, y: 32, w: 3, label: 'Win' },
    { id: 'Alt', x: 11, y: 32, w: 3, label: 'Alt' },
    { id: 'Space', x: 15, y: 32, w: 20, label: 'Space' },
    { id: 'RAlt', x: 36, y: 32, w: 3, label: 'Alt' },
    { id: 'Fn', x: 40, y: 32, w: 3, label: 'Fn' },
    { id: 'Menu', x: 44, y: 32, w: 3, label: '☰' },
    { id: 'RCtrl', x: 48, y: 32, w: 4, label: 'Ctrl' },
    
    // Arrow Keys
    { id: 'ArrowUp', x: 64, y: 27, w: 3, label: '↑' },
    { id: 'ArrowLeft', x: 60, y: 32, w: 3, label: '←' },
    { id: 'ArrowDown', x: 64, y: 32, w: 3, label: '↓' },
    { id: 'ArrowRight', x: 68, y: 32, w: 3, label: '→' }
  ]

  const mouseButtons = [
    { id: 'LeftClick', x: 35, y: 25, w: 20, h: 25, label: 'Left' },
    { id: 'RightClick', x: 55, y: 25, w: 20, h: 25, label: 'Right' },
    { id: 'MiddleClick', x: 47, y: 20, w: 6, h: 10, label: 'M' },
    { id: 'ScrollUp', x: 47, y: 35, w: 6, h: 8, label: '↑' },
    { id: 'ScrollDown', x: 47, y: 43, w: 6, h: 8, label: '↓' },
    { id: 'Side1', x: 25, y: 45, w: 5, h: 12, label: 'S1' },
    { id: 'Side2', x: 25, y: 57, w: 5, h: 12, label: 'S2' }
  ]

  const allButtons = [...keyboardLayout, ...mouseButtons]

  useEffect(() => {
    if (containerRef.current) {
      const updatePositions = () => {
        const container = containerRef.current
        const rect = container.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })

        const newPositions = {}
        allButtons.forEach(button => {
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

  const buttonsWithMappings = allButtons
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
    // For keyboard/mouse, use x position threshold of 40 (middle of keyboard)
    return button.x < 40 ? 'left' : 'right'
  }

  // Split buttons into left and right based on position or override
  const leftButtons = buttonsWithMappings.filter(button => getButtonSide(button) === 'left')
  const rightButtons = buttonsWithMappings.filter(button => getButtonSide(button) === 'right')

  // Sort by custom order if exists
  const sortByCustomOrder = (buttons, side) => {
    return [...buttons].sort((a, b) => {
      const orderA = customOrder[`${side}-${a.id}`] ?? Infinity
      const orderB = customOrder[`${side}-${b.id}`] ?? Infinity
      return orderA - orderB
    })
  }

  const sortedLeftButtons = sortByCustomOrder(leftButtons, 'left')
  const sortedRightButtons = sortByCustomOrder(rightButtons, 'right')

  // Drag and drop handlers
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverSide, setDragOverSide] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)

  const handleDragStart = (e, button) => {
    setDraggedItem(button)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverSide(null)
    setDragOverItem(null)
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

  const handleItemDragOver = (e, item, side) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverItem(item.id)
    setDragOverSide(side)
  }

  const handleItemDrop = (e, targetItem, targetSide) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverSide(null)
    setDragOverItem(null)
    
    if (!draggedItem || draggedItem.id === targetItem.id) return

    const currentSide = getButtonSide(draggedItem)
    const buttonsList = targetSide === 'left' ? sortedLeftButtons : sortedRightButtons
    
    if (currentSide !== targetSide) {
      setButtonSideOverrides(prev => ({
        ...prev,
        [draggedItem.id]: targetSide
      }))
    }
    
    const targetIndex = buttonsList.findIndex(b => b.id === targetItem.id)
    const newOrder = {}
    
    buttonsList.forEach((button, index) => {
      if (button.id === draggedItem.id) return
      
      if (index < targetIndex) {
        newOrder[`${targetSide}-${button.id}`] = index
      } else if (index === targetIndex) {
        newOrder[`${targetSide}-${draggedItem.id}`] = index
        newOrder[`${targetSide}-${button.id}`] = index + 1
      } else {
        newOrder[`${targetSide}-${button.id}`] = index + 1
      }
    })
    
    if (currentSide !== targetSide) {
      newOrder[`${targetSide}-${draggedItem.id}`] = targetIndex
      buttonsList.forEach((button, index) => {
        if (index >= targetIndex) {
          newOrder[`${targetSide}-${button.id}`] = index + 1
        }
      })
    }
    
    setCustomOrder(prev => ({ ...prev, ...newOrder }))
  }

  const handleDrop = (e, targetSide) => {
    e.preventDefault()
    setDragOverSide(null)
    setDragOverItem(null)
    
    if (!draggedItem) return

    const currentSide = getButtonSide(draggedItem)
    
    if (currentSide === targetSide) return

    setButtonSideOverrides(prev => ({
      ...prev,
      [draggedItem.id]: targetSide
    }))
  }

  return (
    <div className="controller-with-list" ref={containerRef} style={{ gap: '2rem' }}>
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
        {sortedLeftButtons.length === 0 ? (
          <div className="no-mappings-message">
            <p>No left side mappings</p>
          </div>
        ) : (
          sortedLeftButtons.map(button => (
            <div
              key={button.id}
              data-list-button={button.id}
              className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''} ${dragOverItem === button.id ? 'drag-over-item' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, button)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleItemDragOver(e, button, 'left')}
              onDrop={(e) => handleItemDrop(e, button, 'left')}
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

      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'center' }}>
        {/* Keyboard Section */}
        <div style={{ width: '800px', height: '350px', position: 'relative', background: '#2c2c2c', borderRadius: '12px', padding: '20px' }}>
          {keyboardLayout.map(key => {
            const mappingLabel = getMappingLabel(key.id)
            const isSelected = selectedButton === key.id
            const hasMapping = !!mappingLabel

            return (
              <div
                key={key.id}
                data-button-id={key.id}
                onClick={() => onButtonClick(key.id)}
                style={{
                  position: 'absolute',
                  left: `${key.x * 10}px`,
                  top: `${key.y * 7}px`,
                  width: `${key.w * 10}px`,
                  height: '30px',
                  background: isSelected ? '#ef4444' : hasMapping ? '#10b981' : '#4b5563',
                  border: `2px solid ${isSelected ? '#dc2626' : hasMapping ? '#059669' : '#6b7280'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div>{key.label}</div>
              </div>
            )
          })}
        </div>

        {/* Mouse Section */}
        <div style={{ width: '300px', height: '500px', position: 'relative' }}>
          {/* Mouse body */}
          <svg width="100%" height="100%" viewBox="0 0 100 150">
            <defs>
              <linearGradient id="mouseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4b5563', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            
            {/* Main body */}
            <ellipse cx="50" cy="70" rx="28" ry="45" fill="url(#mouseGradient)" stroke="#1f2937" strokeWidth="2"/>
            
            {/* Top curve */}
            <path d="M 22 50 Q 22 20, 50 20 Q 78 20, 78 50" fill="none" stroke="#1f2937" strokeWidth="2"/>
            
            {/* Left button outline */}
            <path d="M 22 50 L 22 30 Q 22 20, 35 20 L 48 20 L 48 35" fill="none" stroke="#1f2937" strokeWidth="2"/>
            
            {/* Right button outline */}
            <path d="M 78 50 L 78 30 Q 78 20, 65 20 L 52 20 L 52 35" fill="none" stroke="#1f2937" strokeWidth="2"/>
            
            {/* Middle button */}
            <rect x="47" y="22" width="6" height="15" rx="3" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
            
            {/* Scroll wheel indicator */}
            <line x1="50" y1="27" x2="50" y2="30" stroke="#6b7280" strokeWidth="1"/>
            <line x1="50" y1="32" x2="50" y2="35" stroke="#6b7280" strokeWidth="1"/>
            
            {/* Side buttons */}
            <rect x="20" y="65" width="4" height="15" rx="2" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
            <rect x="20" y="82" width="4" height="15" rx="2" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
          </svg>

          {/* Clickable button overlays */}
          {mouseButtons.map(button => {
            const mappingLabel = getMappingLabel(button.id)
            const isSelected = selectedButton === button.id
            const hasMapping = !!mappingLabel

            return (
              <div
                key={button.id}
                data-button-id={button.id}
                onClick={() => onButtonClick(button.id)}
                style={{
                  position: 'absolute',
                  left: `${button.x}%`,
                  top: `${button.y}%`,
                  width: `${button.w}%`,
                  height: `${button.h}%`,
                  background: isSelected ? 'rgba(239, 68, 68, 0.6)' : hasMapping ? 'rgba(16, 185, 129, 0.6)' : 'rgba(75, 85, 99, 0.3)',
                  border: `2px solid ${isSelected ? '#ef4444' : hasMapping ? '#10b981' : '#6b7280'}`,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = isSelected ? 'rgba(239, 68, 68, 0.8)' : hasMapping ? 'rgba(16, 185, 129, 0.8)' : 'rgba(75, 85, 99, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.background = isSelected ? 'rgba(239, 68, 68, 0.6)' : hasMapping ? 'rgba(16, 185, 129, 0.6)' : 'rgba(75, 85, 99, 0.3)'}
              >
                <div>{button.label}</div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Right Side List */}
      <div 
        className={`mappings-list-container ${dragOverSide === 'right' ? 'drag-over' : ''}`}
        onDragOver={(e) => handleDragOver(e, 'right')}
        onDragLeave={handleDragLeave}
        onDrop={(e) => handleDrop(e, 'right')}
      >
        <h4 className="mappings-list-title">Right Side</h4>
          {sortedRightButtons.length === 0 ? (
            <div className="no-mappings-message">
              <p>No right side mappings</p>
            </div>
          ) : (
            sortedRightButtons.map(button => (
              <div
                key={button.id}
                data-list-button={button.id}
                className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''} ${dragOverItem === button.id ? 'drag-over-item' : ''}`}
                draggable
                onDragStart={(e) => handleDragStart(e, button)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => handleItemDragOver(e, button, 'right')}
                onDrop={(e) => handleItemDrop(e, button, 'right')}
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

export default KeyboardMouseDisplay
