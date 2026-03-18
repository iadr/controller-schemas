import { useState, useEffect } from 'react'

function MappingEditor({ selectedButton, mapping, onUpdateMapping, onDeleteMapping }) {
  const [gestures, setGestures] = useState({
    hold: { action: '', description: '' },
    press: { action: '', description: '' }
  })

  useEffect(() => {
    // Update form when button or mapping changes
    if (!mapping) {
      // Clear all gestures
      setGestures({
        hold: { action: '', description: '' },
        press: { action: '', description: '' }
      })
    } else if (typeof mapping === 'string') {
      // Legacy format: treat as a "hold" gesture
      setGestures({
        hold: { action: mapping, description: '' },
        press: { action: '', description: '' }
      })
    } else if (typeof mapping === 'object' && mapping !== null) {
      // New format: load all gestures
      const newGestures = {
        hold: { action: '', description: '' },
        press: { action: '', description: '' }
      }

      // Check if it's the old single-gesture format
      if (mapping.action && mapping.gesture) {
        // Only set if the gesture is valid
        if (mapping.gesture === 'hold' || mapping.gesture === 'press') {
          newGestures[mapping.gesture] = {
            action: mapping.action || '',
            description: mapping.description || ''
          }
        }
      } else {
        // Multi-gesture format
        ['hold', 'press'].forEach(gesture => {
          if (mapping[gesture] && typeof mapping[gesture] === 'object' && mapping[gesture].action) {
            newGestures[gesture] = {
              action: mapping[gesture].action || '',
              description: mapping[gesture].description || ''
            }
          }
        })
      }

      setGestures(newGestures)
    }
  }, [selectedButton, mapping])

  const handleGestureChange = (gesture, field, value) => {
    setGestures(prev => ({
      ...prev,
      [gesture]: {
        ...prev[gesture],
        [field]: value
      }
    }))
  }

  const handleSave = () => {
    if (!selectedButton) return

    // Build the mapping object with only non-empty gestures
    const mappingData = {}
    let hasAnyMapping = false

    ;['hold', 'press'].forEach(gesture => {
      if (gestures[gesture].action.trim()) {
        mappingData[gesture] = {
          action: gestures[gesture].action.trim(),
          description: gestures[gesture].description.trim()
        }
        hasAnyMapping = true
      }
    })

    if (hasAnyMapping) {
      onUpdateMapping(selectedButton, mappingData)
    }
  }

  const handleDelete = () => {
    if (selectedButton) {
      onDeleteMapping(selectedButton)
      setGestures({
        hold: { action: '', description: '' },
        press: { action: '', description: '' }
      })
    }
  }

  if (!selectedButton) {
    return (
      <div className="mapping-editor">
        <div className="no-selection">
          <p>Click on a button to add mappings</p>
        </div>
      </div>
    )
  }

  return (
    <div className="mapping-editor">
      <h3>Edit: {selectedButton}</h3>

      <div className="gesture-sections">
        {['hold', 'press'].map(gesture => (
          <div key={gesture} className="gesture-section">
            <h4 className="gesture-title">
              {gesture.charAt(0).toUpperCase() + gesture.slice(1)}
            </h4>
            
            <div className="form-group">
              <label>Action</label>
              <input
                type="text"
                value={gestures[gesture].action}
                onChange={(e) => handleGestureChange(gesture, 'action', e.target.value)}
                placeholder={`${gesture} action...`}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={gestures[gesture].description}
                onChange={(e) => handleGestureChange(gesture, 'description', e.target.value)}
                placeholder="Optional description..."
                className="form-input"
              />
            </div>
          </div>
        ))}
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
