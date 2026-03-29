import { renderLabel } from '../../utils/controllerHelpers'

function ButtonEditorList({ 
  buttons, 
  selectedButton, 
  onButtonClick, 
  onDeleteButton,
  onAddButton,
  onExport,
  side 
}) {
  return (
    <div className="mappings-list-container">
      <div className="mappings-list-header">
        <h4 className="mappings-list-title">Buttons ({buttons.length})</h4>
        <div className="mappings-list-actions">
          <button className="btn btn-success btn-small" onClick={onAddButton} title="Add Button">
            <i className="fas fa-plus"></i>
          </button>
          <button className="btn btn-primary btn-small" onClick={onExport} title="Export Array">
            <i className="fas fa-download"></i>
          </button>
        </div>
      </div>

      {buttons.length === 0 ? (
        <div className="no-mappings-message">
          <p>No buttons defined</p>
          <small>Click "Add Button" to create one</small>
        </div>
      ) : (
        <div className="button-editor-list">
          {buttons.map(button => {
            const isSelected = selectedButton === button.id
            return (
              <div
                key={button.id}
                data-list-button={button.id}
                className={`mapping-list-item button-editor-item ${isSelected ? 'selected' : ''}`}
                onClick={(e) => onButtonClick(button.id, button, e)}
              >
                <div className="button-editor-item-header">
                  <div className="mapping-list-button-label">
                    {renderLabel(button.label)}
                  </div>
                  <button
                    className="btn btn-danger btn-tiny"
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteButton(button.id)
                    }}
                    title="Delete"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
                <div className="button-editor-item-details">
                  <div className="detail-row">
                    <span className="detail-label">ID:</span>
                    <span className="detail-value">{button.id}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Pos:</span>
                    <span className="detail-value">
                      {button.x.toFixed(2)}%, {button.y.toFixed(2)}%
                    </span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Shape:</span>
                    <span className="detail-value">{button.shape}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">Type:</span>
                    <span className="detail-value">{button.type}</span>
                  </div>
                  {button.shape === 'circle' || button.shape === 'dpad' ? (
                    <div className="detail-row">
                      <span className="detail-label">Size:</span>
                      <span className="detail-value">{button.size}px</span>
                    </div>
                  ) : (
                    <div className="detail-row">
                      <span className="detail-label">Size:</span>
                      <span className="detail-value">
                        {button.width}x{button.height}px
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default ButtonEditorList
