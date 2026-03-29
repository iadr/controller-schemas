import { useState, useEffect } from 'react'

function ButtonEditorModal({ buttonInfo, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    id: buttonInfo.id || '',
    x: buttonInfo.x || 0,
    y: buttonInfo.y || 0,
    label: buttonInfo.label || '',
    shape: buttonInfo.shape || 'circle',
    size: buttonInfo.size || 32,
    width: buttonInfo.width || 32,
    height: buttonInfo.height || 32,
    borderRadius: buttonInfo.borderRadius || 0,
    hideLabel: buttonInfo.hideLabel || false,
    type: buttonInfo.type || 'button'
  })

  // Update form when buttonInfo changes
  useEffect(() => {
    setFormData({
      id: buttonInfo.id || '',
      x: buttonInfo.x || 0,
      y: buttonInfo.y || 0,
      label: buttonInfo.label || '',
      shape: buttonInfo.shape || 'circle',
      size: buttonInfo.size || 32,
      width: buttonInfo.width || 32,
      height: buttonInfo.height || 32,
      borderRadius: buttonInfo.borderRadius || 0,
      hideLabel: buttonInfo.hideLabel || false,
      type: buttonInfo.type || 'button'
    })
  }, [buttonInfo])

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    // Build the updated button object with only relevant properties
    const updatedButton = {
      id: formData.id,
      x: parseFloat(formData.x),
      y: parseFloat(formData.y),
      label: formData.label,
      shape: formData.shape,
      hideLabel: formData.hideLabel,
      type: formData.type
    }

    // Add shape-specific properties
    if (formData.shape === 'circle' || formData.shape === 'dpad') {
      updatedButton.size = parseFloat(formData.size)
    } else if (formData.shape === 'rect' || formData.shape === 'capsule') {
      updatedButton.width = parseFloat(formData.width)
      updatedButton.height = parseFloat(formData.height)
      if (formData.borderRadius) {
        updatedButton.borderRadius = parseFloat(formData.borderRadius)
      }
    }

    onUpdate(buttonInfo.id, updatedButton)
    onClose()
  }

  const renderShapeFields = () => {
    switch (formData.shape) {
      case 'circle':
      case 'dpad':
        return (
          <div className="form-group">
            <label>Size (diameter)</label>
            <input
              type="number"
              value={formData.size}
              onChange={(e) => handleChange('size', e.target.value)}
              step="1"
              min="1"
            />
          </div>
        )
      
      case 'rect':
      case 'capsule':
        return (
          <>
            <div className="form-group">
              <label>Width</label>
              <input
                type="number"
                value={formData.width}
                onChange={(e) => handleChange('width', e.target.value)}
                step="1"
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Height</label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => handleChange('height', e.target.value)}
                step="1"
                min="1"
              />
            </div>
            <div className="form-group">
              <label>Border Radius</label>
              <input
                type="number"
                value={formData.borderRadius}
                onChange={(e) => handleChange('borderRadius', e.target.value)}
                step="1"
                min="0"
              />
            </div>
          </>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content button-editor-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Edit Button: {buttonInfo.id}</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="modal-body">
          <div className="form-group">
            <label>Button ID</label>
            <input
              type="text"
              value={formData.id}
              onChange={(e) => handleChange('id', e.target.value)}
              placeholder="e.g., south, leftStick"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>X Position (%)</label>
              <input
                type="number"
                value={formData.x}
                onChange={(e) => handleChange('x', e.target.value)}
                step="0.01"
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label>Y Position (%)</label>
              <input
                type="number"
                value={formData.y}
                onChange={(e) => handleChange('y', e.target.value)}
                step="0.01"
                min="0"
                max="100"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Label</label>
            <input
              type="text"
              value={formData.label}
              onChange={(e) => handleChange('label', e.target.value)}
              placeholder="e.g., A, LS, bi bi-caret-up-fill"
            />
            <small>Use text, unicode, or icon classes (bi bi-*, fas fa-*)</small>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Shape</label>
              <select
                value={formData.shape}
                onChange={(e) => handleChange('shape', e.target.value)}
              >
                <option value="circle">Circle</option>
                <option value="rect">Rectangle</option>
                <option value="capsule">Capsule</option>
                <option value="dpad">D-Pad</option>
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={formData.type}
                onChange={(e) => handleChange('type', e.target.value)}
              >
                <option value="button">Button</option>
                <option value="stick">Stick</option>
              </select>
            </div>
          </div>

          {renderShapeFields()}

          <div className="form-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formData.hideLabel}
                onChange={(e) => handleChange('hideLabel', e.target.checked)}
              />
              <span>Hide Label</span>
            </label>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

export default ButtonEditorModal
