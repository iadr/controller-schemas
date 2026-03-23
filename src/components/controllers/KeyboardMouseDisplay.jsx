import { useRef, useState } from 'react'
import MappingListSideBySide from '../MappingListSideBySide'
import { renderLabel, getButtonOverlayStyle } from '../../utils/controllerHelpers'
import {
  getMappingLabel,
  getOrganizedButtons,
  useButtonPositions,
  useControllerDragDrop
} from '../../utils/controllerDragDrop'

function KeyboardMouseDisplay({ mappings, onButtonClick, selectedButton }) {
  const containerRef = useRef(null)
  const [buttonSideOverrides, setButtonSideOverrides] = useState({}) // Track manual side assignments
  const [customOrder, setCustomOrder] = useState({}) // Track custom ordering within lists

  const keyboardLayout = [
    // Row 1
    { id: 'Esc', x: 2, y: 5, w: 3, label: 'Esc', hideLabel: false },
    { id: 'F1', x: 8, y: 5, w: 3, label: 'F1', hideLabel: false },
    { id: 'F2', x: 12, y: 5, w: 3, label: 'F2', hideLabel: false },
    { id: 'F3', x: 16, y: 5, w: 3, label: 'F3', hideLabel: false },
    { id: 'F4', x: 20, y: 5, w: 3, label: 'F4', hideLabel: false },
    { id: 'F5', x: 25, y: 5, w: 3, label: 'F5', hideLabel: false },
    { id: 'F6', x: 29, y: 5, w: 3, label: 'F6', hideLabel: false },
    { id: 'F7', x: 33, y: 5, w: 3, label: 'F7', hideLabel: false },
    { id: 'F8', x: 37, y: 5, w: 3, label: 'F8', hideLabel: false },
    { id: 'F9', x: 42, y: 5, w: 3, label: 'F9', hideLabel: false },
    { id: 'F10', x: 46, y: 5, w: 3, label: 'F10', hideLabel: false },
    { id: 'F11', x: 50, y: 5, w: 3, label: 'F11', hideLabel: false },
    { id: 'F12', x: 54, y: 5, w: 3, label: 'F12', hideLabel: false },
    { id: 'PrintScreen', x: 60, y: 5, w: 3, label: 'PrtSc', hideLabel: false },
    { id: 'ScrollLock', x: 64, y: 5, w: 3, label: 'ScrLk', hideLabel: false },
    { id: 'Pause', x: 68, y: 5, w: 3, label: 'Pause', hideLabel: false },
    
    // Row 2 - Numbers
    { id: '`', x: 2, y: 12, w: 3, label: '`', hideLabel: false },
    { id: '1', x: 6, y: 12, w: 3, label: '1', hideLabel: false },
    { id: '2', x: 10, y: 12, w: 3, label: '2', hideLabel: false },
    { id: '3', x: 14, y: 12, w: 3, label: '3', hideLabel: false },
    { id: '4', x: 18, y: 12, w: 3, label: '4', hideLabel: false },
    { id: '5', x: 22, y: 12, w: 3, label: '5', hideLabel: false },
    { id: '6', x: 26, y: 12, w: 3, label: '6', hideLabel: false },
    { id: '7', x: 30, y: 12, w: 3, label: '7', hideLabel: false },
    { id: '8', x: 34, y: 12, w: 3, label: '8', hideLabel: false },
    { id: '9', x: 38, y: 12, w: 3, label: '9', hideLabel: false },
    { id: '0', x: 42, y: 12, w: 3, label: '0', hideLabel: false },
    { id: '-', x: 46, y: 12, w: 3, label: '-', hideLabel: false },
    { id: '=', x: 50, y: 12, w: 3, label: '=', hideLabel: false },
    { id: 'Backspace', x: 54, y: 12, w: 5, label: '←', hideLabel: false },
    { id: 'Insert', x: 60, y: 12, w: 3, label: 'Ins', hideLabel: false },
    { id: 'Home', x: 64, y: 12, w: 3, label: 'Home', hideLabel: false },
    { id: 'PageUp', x: 68, y: 12, w: 3, label: 'PgUp', hideLabel: false },
    { id: 'NumLock', x: 72, y: 12, w: 3, label: 'Num', hideLabel: false },
    { id: 'NumDivide', x: 76, y: 12, w: 3, label: '/', hideLabel: false },
    { id: 'NumMultiply', x: 80, y: 12, w: 3, label: '*', hideLabel: false },
    { id: 'NumSubtract', x: 84, y: 12, w: 3, label: '-', hideLabel: false },
    
    // Row 3 - QWERTY
    { id: 'Tab', x: 2, y: 17, w: 4, label: 'Tab', hideLabel: false },
    { id: 'Q', x: 7, y: 17, w: 3, label: 'Q', hideLabel: false },
    { id: 'W', x: 11, y: 17, w: 3, label: 'W', hideLabel: false },
    { id: 'E', x: 15, y: 17, w: 3, label: 'E', hideLabel: false },
    { id: 'R', x: 19, y: 17, w: 3, label: 'R', hideLabel: false },
    { id: 'T', x: 23, y: 17, w: 3, label: 'T', hideLabel: false },
    { id: 'Y', x: 27, y: 17, w: 3, label: 'Y', hideLabel: false },
    { id: 'U', x: 31, y: 17, w: 3, label: 'U', hideLabel: false },
    { id: 'I', x: 35, y: 17, w: 3, label: 'I', hideLabel: false },
    { id: 'O', x: 39, y: 17, w: 3, label: 'O', hideLabel: false },
    { id: 'P', x: 43, y: 17, w: 3, label: 'P', hideLabel: false },
    { id: '[', x: 47, y: 17, w: 3, label: '[', hideLabel: false },
    { id: ']', x: 51, y: 17, w: 3, label: ']', hideLabel: false },
    { id: '\\', x: 55, y: 17, w: 4, label: '\\', hideLabel: false },
    { id: 'Delete', x: 60, y: 17, w: 3, label: 'Del', hideLabel: false },
    { id: 'End', x: 64, y: 17, w: 3, label: 'End', hideLabel: false },
    { id: 'PageDown', x: 68, y: 17, w: 3, label: 'PgDn', hideLabel: false },
    { id: 'Num7', x: 72, y: 17, w: 3, label: '7', hideLabel: false },
    { id: 'Num8', x: 76, y: 17, w: 3, label: '8', hideLabel: false },
    { id: 'Num9', x: 80, y: 17, w: 3, label: '9', hideLabel: false },
    { id: 'NumAdd', x: 84, y: 17, w: 3, h: 6.5, label: '+', hideLabel: false },
    
    // Row 4 - ASDF
    { id: 'CapsLock', x: 2, y: 22, w: 5, label: 'Caps', hideLabel: false },
    { id: 'A', x: 8, y: 22, w: 3, label: 'A', hideLabel: false },
    { id: 'S', x: 12, y: 22, w: 3, label: 'S', hideLabel: false },
    { id: 'D', x: 16, y: 22, w: 3, label: 'D', hideLabel: false },
    { id: 'F', x: 20, y: 22, w: 3, label: 'F', hideLabel: false },
    { id: 'G', x: 24, y: 22, w: 3, label: 'G', hideLabel: false },
    { id: 'H', x: 28, y: 22, w: 3, label: 'H', hideLabel: false },
    { id: 'J', x: 32, y: 22, w: 3, label: 'J', hideLabel: false },
    { id: 'K', x: 36, y: 22, w: 3, label: 'K', hideLabel: false },
    { id: 'L', x: 40, y: 22, w: 3, label: 'L', hideLabel: false },
    { id: ';', x: 44, y: 22, w: 3, label: ';', hideLabel: false },
    { id: '\'', x: 48, y: 22, w: 3, label: '\'', hideLabel: false },
    { id: 'Enter', x: 52, y: 22, w: 7, label: 'Enter', hideLabel: false },
    { id: 'Num4', x: 72, y: 22, w: 3, label: '4', hideLabel: false },
    { id: 'Num5', x: 76, y: 22, w: 3, label: '5', hideLabel: false },
    { id: 'Num6', x: 80, y: 22, w: 3, label: '6', hideLabel: false },
    
    // Row 5 - ZXCV
    { id: 'Shift', x: 2, y: 27, w: 7, label: 'Shift', hideLabel: false },
    { id: 'Z', x: 10, y: 27, w: 3, label: 'Z', hideLabel: false },
    { id: 'X', x: 14, y: 27, w: 3, label: 'X', hideLabel: false },
    { id: 'C', x: 18, y: 27, w: 3, label: 'C', hideLabel: false },
    { id: 'V', x: 22, y: 27, w: 3, label: 'V', hideLabel: false },
    { id: 'B', x: 26, y: 27, w: 3, label: 'B', hideLabel: false },
    { id: 'N', x: 30, y: 27, w: 3, label: 'N', hideLabel: false },
    { id: 'M', x: 34, y: 27, w: 3, label: 'M', hideLabel: false },
    { id: ',', x: 38, y: 27, w: 3, label: ',', hideLabel: false },
    { id: '.', x: 42, y: 27, w: 3, label: '.', hideLabel: false },
    { id: '/', x: 46, y: 27, w: 3, label: '/', hideLabel: false },
    { id: 'RShift', x: 50, y: 27, w: 9, label: 'Shift', hideLabel: false },
    
    // Arrow Keys
    { id: 'ArrowUp', x: 64, y: 27, w: 3, label: '↑', hideLabel: false },
    { id: 'Num1', x: 72, y: 27, w: 3, label: '1', hideLabel: false },
    { id: 'Num2', x: 76, y: 27, w: 3, label: '2', hideLabel: false },
    { id: 'Num3', x: 80, y: 27, w: 3, label: '3', hideLabel: false },
    { id: 'NumEnter', x: 84, y: 27, w: 3, h: 6.5, label: '↵', hideLabel: false },
    
    // Row 6 - Bottom
    { id: 'Ctrl', x: 2, y: 32, w: 4, label: 'Ctrl', hideLabel: false },
    // { id: 'Win', x: 7, y: 32, w: 3, label: 'Win', hideLabel: false },
    { id: 'Alt', x: 11, y: 32, w: 3, label: 'Alt', hideLabel: false },
    { id: 'Space', x: 15, y: 32, w: 25, label: 'Space', hideLabel: false },
    { id: 'RAlt', x: 41, y: 32, w: 4, label: 'Alt', hideLabel: false },
    // { id: 'Fn', x: 40, y: 32, w: 3, label: 'Fn', hideLabel: false },
    // { id: 'Menu', x: 44, y: 32, w: 3, label: '☰', hideLabel: false },
    { id: 'RCtrl', x: 54, y: 32, w: 5, label: 'Ctrl', hideLabel: false },
    
    // Arrow Keys
    { id: 'ArrowLeft', x: 60, y: 32, w: 3, label: '←', hideLabel: false },
    { id: 'ArrowDown', x: 64, y: 32, w: 3, label: '↓', hideLabel: false },
    { id: 'ArrowRight', x: 68, y: 32, w: 3, label: '→', hideLabel: false },
    { id: 'Num0', x: 72, y: 32, w: 7, label: '0', hideLabel: false },
    { id: 'NumDecimal', x: 80, y: 32, w: 3, label: '.', hideLabel: false }
  ]

  const mouseButtons = [
    { id: 'LeftClick', x: 35, y: 25, w: 20, h: 25, label: 'Left', hideLabel: true },
    { id: 'RightClick', x: 55, y: 25, w: 20, h: 25, label: 'Right', hideLabel: true },
    { id: 'MiddleClick', x: 47, y: 20, w: 6, h: 10, label: 'M', hideLabel: true }
  ]

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
        <div className="controller-svg-container" style={{ width: '890px', height: '270px', position: 'relative', background: '#2c2c2c', borderRadius: '12px', padding: '20px' }}>
          {keyboardLayout.map(key => {
            const mappingLabel = getMappingLabel(mappings, key.id)
            const isSelected = selectedButton === key.id
            const hasMapping = !!mappingLabel
            
            // Default keyboard keys to hidden labels (hideLabel defaults to true)
            const shouldHideLabel = key.hideLabel !== false

            return (
              <div
                key={key.id}
                data-button-id={key.id}
                className={`keyboard-key ${isSelected ? 'selected' : ''} ${hasMapping ? 'has-mapping' : ''}`}
                onClick={() => onButtonClick(key.id, key)}
                style={{
                  position: 'absolute',
                  left: `${key.x * 10}px`,
                  top: `${key.y * 7}px`,
                  width: `${key.w * 10}px`,
                  height: `${key.h ? key.h * 10 : 30}px`
                }}
              >
                {!shouldHideLabel && <div>{key.label}</div>}
              </div>
            )
          })}
        </div>

        {/* Mouse Section */}
        <div className="controller-svg-container" style={{ width: '300px', height: '500px', position: 'relative' }}>
          <img 
            src="/controllers/mouse.svg" 
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
                onClick={() => onButtonClick(button.id, button)}
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
