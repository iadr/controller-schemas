import { useState, useEffect } from 'react'

function MappingEditor({ selectedButton, buttonInfo, mapping, onUpdateMapping, onDeleteMapping }) {
  // Determine available gestures based on button type (default to 'button' if not specified)
  const isStick = buttonInfo?.type === 'stick'
  const availableGestures = isStick ? ['direction', 'press'] : ['press', 'hold']
  
  const [gestures, setGestures] = useState({
    press: { action: '', description: '' },
    direction: { action: '', description: '' },
    hold: { action: '', description: '' }
  })

  useEffect(() => {
    // Update form when button or mapping changes
    if (!mapping) {
      // Clear all gestures
      setGestures({
        press: { action: '', description: '' },
        direction: { action: '', description: '' },
        hold: { action: '', description: '' },
      })
    } else if (typeof mapping === 'string') {
      // Legacy format: treat as a "hold" gesture (or "direction" for sticks)
      const legacyGesture = isStick ? 'direction' : 'hold'
      setGestures({
        press: { action: '', description: '' },
        direction: legacyGesture === 'direction' ? { action: mapping, description: '' } : { action: '', description: '' },
        hold: legacyGesture === 'hold' ? { action: mapping, description: '' } : { action: '', description: '' },
      })
    } else if (typeof mapping === 'object' && mapping !== null) {
      // New format: load all gestures
      const newGestures = {
        press: { action: '', description: '' },
        direction: { action: '', description: '' },
        hold: { action: '', description: '' },
      }

      // Check if it's the old single-gesture format
      if (mapping.action && mapping.gesture) {
        // Only set if the gesture is valid
        if ([ 'press', 'direction', 'hold'].includes(mapping.gesture)) {
          newGestures[mapping.gesture] = {
            action: mapping.action || '',
            description: mapping.description || ''
          }
        }
      } else {
        // Multi-gesture format
        ['press', 'direction', 'hold'].forEach(gesture => {
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
  }, [selectedButton, mapping, isStick])

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

    // Build the mapping object with only non-empty gestures from available gestures
    const mappingData = {}
    let hasAnyMapping = false

    availableGestures.forEach(gesture => {
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
        press: { action: '', description: '' },
        direction: { action: '', description: '' },
        hold: { action: '', description: '' },
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
        {availableGestures.map(gesture => (
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
