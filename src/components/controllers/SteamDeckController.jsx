import { useRef, useState } from 'react'
import { renderLabel, getButtonOverlayStyle } from '../../utils/controllerHelpers'
import { 
  getMappingLabel, 
  getMappingGestures, 
  getOrganizedButtons,
  useButtonPositions,
  useControllerDragDrop
} from '../../utils/controllerDragDrop'

function SteamDeckController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  const buttons = [
    // Face buttons (from SVG viewBox 279.375 x 167.762)
    { id: 'south', x: 91.70, y: 50.48, label: 'A', shape: 'circle', size: 18, hideLabel: true, type: 'button'},
    { id: 'east', x: 94.64, y: 45.59, label: 'B', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
    { id: 'west', x: 88.95, y: 45.59, label: 'X', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
    { id: 'north', x: 91.70, y: 40.71, label: 'Y', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
    
    // D-pad (approxCenter 17.3, 76.5, radius ~12)
    { id: 'dPadUp', x: 6.19, y: 38.46, label: 'bi bi-caret-up-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
    { id: 'dPadDown', x: 6.19, y: 52.76, label: 'bi bi-caret-down-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
    { id: 'dPadLeft', x: 1.90, y: 45.59, label: 'bi bi-caret-left-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
    { id: 'dPadRight', x: 10.49, y: 45.59, label: 'bi bi-caret-right-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
    
    // Bumpers and triggers
    { id: 'leftButton', x: 10.74, y: 13.92, label: 'L1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
    { id: 'leftTrigger', x: 8.95, y: 5.96, label: 'L2', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'rightButton', x: 89.13, y: 13.92, label: 'R1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
    { id: 'rightTrigger', x: 90.92, y: 5.96, label: 'R2', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    
    // Sticks (left: 44.1, 80.9; right: 235.1, 81.0)
    { id: 'L3', x: 17.49, y: 48.22, label: 'L3', shape: 'circle', size: 30, hideLabel: true, type: 'stick' },
    { id: 'R3', x: 82.4, y: 48.28, label: 'R3', shape: 'circle', size: 30, hideLabel: true, type: 'stick' },
    
    // // Back buttons
    // { id: 'L4', x: 7.16, y: 83.45, label: 'L4', shape: 'circle', size: 3 },
    // { id: 'L5', x: 12.53, y: 89.41, label: 'L5', shape: 'circle', size: 3 },
    // { id: 'R4', x: 87.34, y: 83.45, label: 'R4', shape: 'circle', size: 3 },
    // { id: 'R5', x: 92.71, y: 89.41, label: 'R5', shape: 'circle', size: 3 },
    
    // System buttons
    { id: 'select', x: 9.31, y: 37.55, label: 'fas fa-clone fa-rotate-90', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
    { id: 'steam', x: 19.04, y: 80.70, label: 'bi bi-gear-fill', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
    { id: 'start', x: 90.54, y: 37.55, label: 'fas fa-bars', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
    { id: 'quickAccess', x: 81, y: 80.7, label: 'bi bi-three-dots', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
    
    // Touchpads (left rect center: 41, 111; right rect center: 239, 111)
    { id: 'leftPad', x: 14.68, y: 66.16, label: 'L◯', shape: 'rect', width: 22, height: 30, borderRadius: 4, hideLabel: true, type: 'stick' },
    { id: 'rightPad', x: 85.53, y: 66.16, label: 'R◯', shape: 'rect', width: 22, height: 30, borderRadius: 4, hideLabel: true, type: 'stick' }
  ]
  // Use shared hooks for button positions and drag-drop functionality
  const { dimensions, buttonPositions } = useButtonPositions(
    containerRef, 
    buttons, 
    mappings, 
    buttonSideOverrides, 
    customOrder
  )

  const {
    draggedItem,
    dragOverSide,
    dragOverItem,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleItemDragOver,
    handleItemDrop,
    handleDrop
  } = useControllerDragDrop(
    buttonSideOverrides,
    setButtonSideOverrides,
    customOrder,
    setCustomOrder
  )

  // Get organized button lists
  const { buttonsWithMappings, sortedLeftButtons, sortedRightButtons } = getOrganizedButtons(
    buttons,
    mappings,
    buttonSideOverrides,
    customOrder
  )

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
            sortedLeftButtons.map(button => {
              const gestures = getMappingGestures(mappings, button.id)
              return (
                <div
                  key={button.id}
                  data-list-button={button.id}
                  className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''} ${dragOverItem === button.id ? 'drag-over-item' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, button)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleItemDragOver(e, button, 'left')}
                  onDrop={(e) => handleItemDrop(e, button, 'left', sortedLeftButtons, sortedRightButtons)}
                  onClick={() => onButtonClick(button.id, button)}
                >
                  <div className="mapping-list-button-label">{renderLabel(button.label)}</div>
                  <div className="mapping-list-actions">
                    {gestures ? (
                      gestures.map(gesture => (
                        <div key={gesture.type} className="mapping-list-action">
                          <span className="gesture-type">{gesture.type}:</span>
                          <span className="action-name">{gesture.action}</span>
                        </div>
                      ))
                    ) : (
                      <div className="mapping-list-action">
                        <span className="action-name">{button.mappingLabel}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
      </div>

      <div style={{ width: '700px', height: '400px', position: 'relative' }}>
        {/* Steam Deck outline SVG */}
        <img 
          src="/controllers/steam-deck.svg" 
          alt="Steam Deck Controller" 
          style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}
        />

        {/* Clickable button overlays */}
        {buttons.map(button => {
          const mappingLabel = getMappingLabel(mappings, button.id)
          const isSelected = selectedButton === button.id
          const hasMapping = !!mappingLabel
          const overlayStyle = getButtonOverlayStyle(button)

          return (
            <div
              key={button.id}
              data-button-id={button.id}
              className={`button-marker ${isSelected ? 'selected' : ''} ${hasMapping ? 'has-mapping' : ''}`}
              style={{
                left: `${button.x}%`,
                top: `${button.y}%`
              }}
              onClick={() => onButtonClick(button.id, button)}
            >
              <div className="button-marker-circle" style={overlayStyle}>
                {!button.hideLabel && renderLabel(button.label)}
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
            sortedRightButtons.map(button => {
              const gestures = getMappingGestures(mappings, button.id)
              return (
                <div
                  key={button.id}
                  data-list-button={button.id}
                  className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''} ${dragOverItem === button.id ? 'drag-over-item' : ''}`}
                  draggable
                  onDragStart={(e) => handleDragStart(e, button)}
                  onDragEnd={handleDragEnd}
                  onDragOver={(e) => handleItemDragOver(e, button, 'right')}
                  onDrop={(e) => handleItemDrop(e, button, 'right', sortedLeftButtons, sortedRightButtons)}
                  onClick={() => onButtonClick(button.id, button)}
                >
                  <div className="mapping-list-button-label">{renderLabel(button.label)}</div>
                  <div className="mapping-list-actions">
                    {gestures ? (
                      gestures.map(gesture => (
                        <div key={gesture.type} className="mapping-list-action">
                          <span className="gesture-type">{gesture.type}:</span>
                          <span className="action-name">{gesture.action}</span>
                        </div>
                      ))
                    ) : (
                      <div className="mapping-list-action">
                        <span className="action-name">{button.mappingLabel}</span>
                      </div>
                    )}
                  </div>
                </div>
              )
            })
          )}
      </div>
    </div>
  )
}

export default SteamDeckController
