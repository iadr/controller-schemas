import { useRef } from 'react'
import MappingListSideBySide from '../MappingEditor/MappingListSideBySide'
import { renderLabel, getButtonOverlayStyle } from '../../utils/controllerHelpers'
import {
  getMappingLabel,
  getOrganizedButtons,
  useButtonPositions,
  useControllerDragDrop
} from '../../utils/controllerDragDrop'
import { KEYBOARD_BUTTONS, MOUSE_BUTTONS } from '../../constants/controllers'

function KeyboardMouseDisplay({ 
  mappings, 
  onButtonClick, 
  selectedButton,
  buttonSideOverrides,
  setButtonSideOverrides,
  customOrder,
  setCustomOrder
}) {
  const containerRef = useRef(null)

  // Use centralized button definitions from constants
  const keyboardLayout = KEYBOARD_BUTTONS
  const mouseButtons = MOUSE_BUTTONS
  const allButtons = [...keyboardLayout, ...mouseButtons]

  // Use shared hooks for button positions and drag-drop functionality
  const { dimensions, buttonPositions } = useButtonPositions(
    containerRef, 
    allButtons, 
    mappings, 
    buttonSideOverrides, 
    customOrder
  )

  // Use drag-and-drop hook
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
    allButtons,
    mappings,
    buttonSideOverrides,
    customOrder
  )

  return (
    <div className="controller-with-list" ref={containerRef}>
      {/* SVG for guide lines */}
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

      {/* Keyboard and Mouse Container */}
      <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', justifyContent: 'center' }}>
        {/* Keyboard Section */}
        <div className="controller-svg-container" style={{ position: 'relative' }}>
          <img 
            src="./controllers/QWERTY_keyboard_en.svg" 
            alt="Keyboard" 
            className="controller-svg"
            style={{ width: '890px' }}
          />
          {keyboardLayout.map(key => {
            const mappingLabel = getMappingLabel(mappings, key.id)
            const isSelected = selectedButton === key.id
            const hasMapping = !!mappingLabel
            const overlayStyle = getButtonOverlayStyle(key)

            return (
              <div
                key={key.id}
                data-button-id={key.id}
                className={`button-marker ${isSelected ? 'selected' : ''} ${hasMapping ? 'has-mapping' : ''}`}
                style={{
                  left: `${key.x}%`,
                  top: `${key.y}%`
                }}
                onClick={(e) => onButtonClick(key.id, key, e)}
              >
                <div className="button-marker-circle" style={overlayStyle}>
                  {!key.hideLabel && renderLabel(key.label)}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mouse Section */}
        {/* <div className="controller-svg-container" style={{ width: '300px', height: '500px', position: 'relative' }}>
          <img 
            src="./controllers/mouse.svg" 
            alt="Mouse" 
            className="controller-svg"
            style={{ width: '200px' }}
          />
          {mouseButtons.map(button => {
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
        </div> */}
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

export default KeyboardMouseDisplay
