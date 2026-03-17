import { useState, useEffect } from 'react'

function MappingEditor({ selectedButton, mapping, onUpdateMapping, onDeleteMapping }) {
  const [label, setLabel] = useState('')

  useEffect(() => {
    // Update form when button or mapping changes
    setLabel(mapping || '')
  }, [selectedButton, mapping])

  const handleSave = () => {
    if (selectedButton && label.trim()) {
      onUpdateMapping(selectedButton, label.trim())
    }
  }

  const handleDelete = () => {
    if (selectedButton) {
      onDeleteMapping(selectedButton)
      setLabel('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  if (!selectedButton) {
    return (
      <div className="mapping-editor">
        <div className="no-selection">
          <p>Click on a button to add a label</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mapping-editor">
      <h3>Edit: {selectedButton}</h3>

      <div className="form-group">
        <label>Label</label>
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter button label..."
          className="form-input"
        />
      </div>

      <div className="button-group">
        <button onClick={handleSave} className="btn btn-primary">
          Save
        </button>
        {mapping && (
          <button onClick={handleDelete} className="btn btn-danger">
            Delete
          </button>
        )}
      </div>
    </div>
  )
}

export default MappingEditor
