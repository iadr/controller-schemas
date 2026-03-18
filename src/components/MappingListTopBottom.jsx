import { renderLabel } from '../utils/controllerHelpers'
import { getMappingGestures } from '../utils/controllerDragDrop'

/**
 * MappingListTopBottom - Renders mapping lists stacked vertically (top and bottom)
 * Better suited for keyboard layouts where horizontal space is limited
 */
function MappingListTopBottom({
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
  const renderMappingList = (buttons, side, title) => (
    <div 
      className={`mappings-list-container-horizontal ${dragOverSide === side ? 'drag-over' : ''}`}
      onDragOver={(e) => handleDragOver(e, side)}
      onDragLeave={handleDragLeave}
      onDrop={(e) => handleDrop(e, side)}
    >
      <h4 className="mappings-list-title">{title}</h4>
      <div className="mapping-list-horizontal-content">
        {buttons.length === 0 ? (
          <div className="no-mappings-message">
            <p>No {side} side mappings</p>
          </div>
        ) : (
          buttons.map(button => {
            const gestures = getMappingGestures(mappings, button.id)
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
                onClick={() => onButtonClick(button.id)}
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

  return (
    <div className="mappings-list-wrapper-vertical">
      {renderMappingList(sortedLeftButtons, 'left', 'Top Section')}
      {renderMappingList(sortedRightButtons, 'right', 'Bottom Section')}
    </div>
  )
}

export default MappingListTopBottom
