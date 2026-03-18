import { useRef, useState } from 'react'
import { renderLabel, getButtonOverlayStyle } from '../../utils/controllerHelpers'
import { 
  getMappingLabel, 
  getOrganizedButtons,
  useButtonPositions,
  useControllerDragDrop
} from '../../utils/controllerDragDrop'
import MappingListSideBySide from '../MappingListSideBySide'

function XboxController({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  const buttons = [
    { id: 'south', x: 76.09, y: 37.56, label: 'A', shape: 'circle', size: 42 },
    { id: 'east', x: 83.09, y: 27.80, label: 'B', shape: 'circle', size: 42 },
    { id: 'west', x: 68.98, y: 27.99, label: 'X', shape: 'circle', size: 42 },
    { id: 'north', x: 76.09, y: 18.34, label: 'Y', shape: 'circle', size: 42 },
    { id: 'leftButton', x: 29.37, y: 4.03, label: 'LB', shape: 'circle', size: 32 },
    { id: 'rightButton', x: 70.63, y: 4.03, label: 'RB', shape: 'circle', size: 32 },
    { id: 'leftTrigger', x: 21.65, y: 3.14, label: 'LT', shape: 'circle', size: 32 },
    { id: 'rightTrigger', x: 78.34, y: 3.14, label: 'RT', shape: 'circle', size: 32 },
    { id: 'leftStick', x: 24.03, y: 27.65, label: 'LS', shape: 'circle', size: 42 },
    { id: 'rightStick', x: 63.37, y: 49.35, label: 'RS', shape: 'circle', size: 42 },
    { id: 'dPad', x: 36.63, y: 51.39, label: 'bi bi-dpad', shape: 'dpad', size: 24 },
    { id: 'dPadUp', x: 36.63, y: 44.98, label: 'bi bi-caret-up-fill', shape: 'dpad', size: 28 },
    { id: 'dPadDown', x: 36.63, y: 57.65, label: 'bi bi-caret-down-fill', shape: 'dpad', size: 28 },
    { id: 'dPadLeft', x: 31.95, y: 51.39, label: 'bi bi-caret-left-fill', shape: 'dpad', size: 28 },
    { id: 'dPadRight', x: 41.30, y: 51.39, label: 'bi bi-caret-right-fill', shape: 'dpad', size: 28 },
    { id: 'start', x: 57.54, y: 27.33, label: 'fas fa-bars', shape: 'circle', size: 32 },
    { id: 'select', x: 42.56, y: 27.33, label: 'far fa-clone fa-rotate-90', shape: 'circle', size: 32 }
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
      {/* SVG for guide lines */}
      <svg className="guide-lines-svg" style={{ width: dimensions.width, height: dimensions.height }}>
        {buttonsWithMappings.map((button, btnIndex) => {
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

      {/* Controller Image and Buttons */}
      <div className="controller-svg-container">
        <img 
          src="/controllers/xbox-one.svg" 
          alt="Xbox Controller" 
          className="controller-svg"
          style={{ width: '600px' }}
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
              onClick={() => onButtonClick(button.id)}
            >
              <div className="button-marker-circle" style={overlayStyle}>
                {renderLabel(button.label)}
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

export default XboxController
