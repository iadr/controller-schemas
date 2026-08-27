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
import mouseImage from '../../../controllers/mouse.svg'
import KeyboardSvg from './KeyboardSvg'

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center', justifyContent: 'center' }}>
        {/* Keyboard Section */}
        <div className="controller-svg-container" style={{ position: 'relative' }}>
          <KeyboardSvg
            mappings={mappings}
            selectedButton={selectedButton}
            onButtonClick={(id, _, event) => {
              const button = keyboardLayout.find((item) => item.id === id)
              if (button) onButtonClick(id, button, event)
            }}
            className="controller-svg"
            style={{ width: '620px' }}
          />
        </div>

        {/* Mouse Section */}
        <div className="controller-svg-container" style={{ width: '120px', position: 'relative' }}>
          <img 
            src={mouseImage}
            alt="Mouse" 
            className="controller-svg"
            style={{ width: '120px', display: 'block' }}
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
        </div>
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
