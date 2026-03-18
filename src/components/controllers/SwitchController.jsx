import { useRef, useEffect, useState } from 'react'
import { renderLabel } from '../../utils/controllerHelpers'

function SwitchController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [buttonPositions, setButtonPositions] = useState({})
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  const buttons = [
    { id: 'north', x: 80.5, y: 39.8, label: 'X' },
    { id: 'south', x: 80.5, y: 50.7, label: 'B' },
    { id: 'east', x: 89.0, y: 45.28, label: 'A' },
    { id: 'west', x: 71.75, y: 45.28, label: 'Y' },
    { id: 'leftButton', x: 16.00, y: 11.24, label: 'L' },
    { id: 'rightButton', x: 84.06, y: 11.24, label: 'R' },
    { id: 'ZL', x: 17.41, y: 3.50, label: 'ZL' },
    { id: 'ZR', x: 82.60, y: 3.50, label: 'ZR' },
    { id: 'leftStick', x: 19.92, y: 45.02, label: 'L↻' },
    { id: 'rightStick', x: 80.64, y: 65.65, label: 'R↻' },
    { id: 'dPadUp', x: 19.92, y: 60.28, label: 'bi bi-caret-up-fill' },
    { id: 'dPadDown', x: 19.92, y: 71.03, label: 'bi bi-caret-down-fill' },
    { id: 'dPadLeft', x: 11.86, y: 65.65, label: 'bi bi-caret-left-fill' },
    { id: 'dPadRight', x: 27.99, y: 65.65, label: 'bi bi-caret-right-fill' },
    { id: 'plus', x: 69.42, y: 33.97, label: 'fas fa-plus' },
    { id: 'minus', x: 30.87, y: 33.97, label: 'fas fa-minus' },
    { id: 'home', x: 74.4, y: 79.3, label: 'fas fa-house' },
    { id: 'capture', x: 26, y: 79.4, label: 'bi bi-record-circle' }
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
                <div className="mapping-list-button-label">{renderLabel(button.label)}</div>
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
                {renderLabel(button.label)}
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
                <div className="mapping-list-button-label">{renderLabel(button.label)}</div>
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
