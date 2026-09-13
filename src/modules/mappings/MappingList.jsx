import { renderLabel } from '../../shared/icons/Label.jsx'
import { getMappingGestures } from './model/organization.js'

/**
 * MappingList - Renders a single mapping list (left or right)
 * Used by controllers like Xbox and Switch that have horizontal layouts
 * Render this component twice with different 'side' props to get both lists
 */
function MappingList({
  buttons,
  side,
  title,
  sortedLeftButtons,
  sortedRightButtons,
  mappings,
  selectedButton,
  onButtonClick,
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
}) {
  return (
    <div 
      className={`mappings-list-container ${dragOverSide === side ? 'drag-over' : ''}`}
      onDragOver={(e) => handleDragOver(e, side)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, side)}
    >
      <h4 className="mappings-list-title">{title}</h4>
      {buttons.length === 0 ? (
        <div className="no-mappings-message">
          <p>No {side} side mappings</p>
        </div>
      ) : (
        buttons.map(button => {
          const gestures = getMappingGestures(mappings, button.id, button)
          return (
            <div
              key={button.id}
              data-list-button={button.id}
              className={`mapping-list-item ${selectedButton === button.id ? 'selected' : ''} ${draggedItem?.id === button.id ? 'dragging' : ''} ${dragOverItem === button.id ? 'drag-over-item' : ''}`}
              draggable
              onDragStart={(e) => handleDragStart(e, button)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => handleItemDragOver(e, button, side)}
              onDrop={(e) => handleItemDrop(e, button, side, sortedLeftButtons, sortedRightButtons)}
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
  )
}

export default MappingList
