import { useRef, useState } from 'react'
import { renderLabel, getButtonOverlayStyle } from '../../utils/controllerHelpers'
import { 
  getMappingLabel, 
  getOrganizedButtons,
  useButtonPositions,
  useControllerDragDrop
} from '../../utils/controllerDragDrop'
import MappingListSideBySide from '../MappingListSideBySide'

function SwitchController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  const buttons = [
    { id: 'north', x: 80.5, y: 39.8, label: 'X', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
    { id: 'south', x: 80.5, y: 50.7, label: 'B', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
    { id: 'east', x: 89.0, y: 45.28, label: 'A', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
    { id: 'west', x: 71.75, y: 45.28, label: 'Y', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
    { id: 'leftButton', x: 16.00, y: 11.24, label: 'L', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'rightButton', x: 84.06, y: 11.24, label: 'R', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'ZL', x: 17.41, y: 3.50, label: 'ZL', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'ZR', x: 82.60, y: 3.50, label: 'ZR', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'leftStick', x: 19.92, y: 45.02, label: 'L↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
    { id: 'rightStick', x: 80.64, y: 65.65, label: 'R↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
    { id: 'dPadUp', x: 19.92, y: 60.28, label: 'bi bi-caret-up-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
    { id: 'dPadDown', x: 19.92, y: 71.03, label: 'bi bi-caret-down-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
    { id: 'dPadLeft', x: 11.86, y: 65.65, label: 'bi bi-caret-left-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
    { id: 'dPadRight', x: 27.99, y: 65.65, label: 'bi bi-caret-right-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
    { id: 'plus', x: 69.42, y: 33.97, label: 'fas fa-plus', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'minus', x: 30.87, y: 33.97, label: 'fas fa-minus', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'home', x: 74.4, y: 79.3, label: 'fas fa-house', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
    { id: 'capture', x: 26, y: 79.4, label: 'bi bi-record-circle', shape: 'rect', width: 36, height: 36, hideLabel: true, type: 'button' }
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
      <svg className="guide-lines-svg" style={{ width: dimensions.width, height: dimensions.height, maxHeight: '100%' }}>
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
      <MappingListSideBySide
        buttons={sortedLeftButtons}
        side="left"
        title="Left Side"
        sortedLeftButtons={sortedLeftButtons}
        sortedRightButtons={sortedRightButtons}
        mappings={mappings}
        selectedButton={selectedButton}
        onButtonClick={onButtonClick}
        draggedItem={draggedItem}
        dragOverSide={dragOverSide}
        dragOverItem={dragOverItem}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleItemDragOver={handleItemDragOver}
        handleItemDrop={handleItemDrop}
        handleDrop={handleDrop}
      />

      <div className="controller-svg-container">
        <img 
          src="/controllers/switch.svg" 
          alt="Nintendo Switch Controller" 
          className="controller-svg"
          style={{ maxWidth: '600px', height: '78vh', maxHeight: '100%' }}
        />
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
      <MappingListSideBySide
        buttons={sortedRightButtons}
        side="right"
        title="Right Side"
        sortedLeftButtons={sortedLeftButtons}
        sortedRightButtons={sortedRightButtons}
        mappings={mappings}
        selectedButton={selectedButton}
        onButtonClick={onButtonClick}
        draggedItem={draggedItem}
        dragOverSide={dragOverSide}
        dragOverItem={dragOverItem}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragOver={handleDragOver}
        handleDragLeave={handleDragLeave}
        handleItemDragOver={handleItemDragOver}
        handleItemDrop={handleItemDrop}
        handleDrop={handleDrop}
      />
    </div>
  )
}

export default SwitchController
