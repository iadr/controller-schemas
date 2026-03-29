import { useRef, useState } from 'react'
import { renderLabel, getButtonOverlayStyle } from '../../utils/controllerHelpers'
import { 
  getMappingLabel, 
  getMappingGestures, 
  getOrganizedButtons,
  useButtonPositions,
  useControllerDragDrop
} from '../../utils/controllerDragDrop'
import { STEAMDECK_BUTTONS } from '../../constants/controllers'

function SteamDeckController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  // Use centralized button definitions from constants
  const buttons = STEAMDECK_BUTTONS
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
                  onClick={(e) => onButtonClick(button.id, button, e)}
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
              onClick={(e) => onButtonClick(button.id, button, e)}
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
                  onClick={(e) => onButtonClick(button.id, button, e)}
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
