import Icon from '../../shared/icons/Icon.jsx'
import { useState, useEffect } from 'react'

function MappingEditor({ selectedButton, buttonInfo, mapping, onUpdateMapping, onDeleteMapping, controller }) {
  // Determine available gestures based on button type (default to 'button' if not specified)
  const isStick = buttonInfo?.type === 'stick'
  const availableGestures = isStick ? ['direction', 'press'] : ['press', 'hold']
  
  // Match type: 'id' (this button only), 'position' (all at this position), 'label' (all with this label)
  const [matchType, setMatchType] = useState('id')
  const [matchValue, setMatchValue] = useState(selectedButton)
  
  const [gestures, setGestures] = useState({
    direction: { action: '', description: '' },
    press: { action: '', description: '' },
    hold: { action: '', description: '' }
  })

  useEffect(() => {
    // Update form when button or mapping changes
    if (!mapping) {
      // Clear all gestures
      setGestures({
        direction: { action: '', description: '' },
        press: { action: '', description: '' },
        hold: { action: '', description: '' },
      })
      // Reset match type to 'id' for new mappings
      setMatchType('id')
      setMatchValue(selectedButton)
    } else if (typeof mapping === 'string') {
      // Legacy format: treat as a "hold" gesture (or "direction" for sticks)
      const legacyGesture = isStick ? 'direction' : 'hold'
      setGestures({
        direction: legacyGesture === 'direction' ? { action: mapping, description: '' } : { action: '', description: '' },
        press: { action: '', description: '' },
        hold: legacyGesture === 'hold' ? { action: mapping, description: '' } : { action: '', description: '' },
      })
      setMatchType('id')
      setMatchValue(selectedButton)
    } else if (typeof mapping === 'object' && mapping !== null) {
      // New format: load all gestures
      const newGestures = {
        direction: { action: '', description: '' },
        press: { action: '', description: '' },
        hold: { action: '', description: '' },
      }

      // Check if it's the old single-gesture format
      if (mapping.action && mapping.gesture) {
        // Only set if the gesture is valid
        if ([ 'direction', 'press', 'hold'].includes(mapping.gesture)) {
          newGestures[mapping.gesture] = {
            action: mapping.action || '',
            description: mapping.description || ''
          }
        }
      } else {
        // Multi-gesture format
        ['direction', 'press', 'hold'].forEach(gesture => {
          if (mapping[gesture] && typeof mapping[gesture] === 'object' && mapping[gesture].action) {
            newGestures[gesture] = {
              action: mapping[gesture].action || '',
              description: mapping[gesture].description || ''
            }
          }
        })
      }

      setGestures(newGestures)
      
      // Set match type from mapping metadata if available
      if (mapping.matchType && mapping.matchValue) {
        setMatchType(mapping.matchType)
        setMatchValue(mapping.matchValue)
      } else {
        setMatchType('id')
        setMatchValue(selectedButton)
      }
    }
  }, [selectedButton, mapping, isStick])
  
  // Update match value when match type changes
  useEffect(() => {
    if (matchType === 'id') {
      setMatchValue(selectedButton)
    } else if (matchType === 'position') {
      setMatchValue(selectedButton) // position ID is same as button ID (south, east, etc.)
    } else if (matchType === 'label' && buttonInfo?.label) {
      // For icon labels (like 'bi bi-dpad'), extract the readable part
      const label = buttonInfo.label.includes(' ') 
        ? buttonInfo.label.split(' ').pop()
        : buttonInfo.label
      setMatchValue(label)
    }
  }, [matchType, selectedButton, buttonInfo])

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
    const mappingData = {
      matchType,
      matchValue
    }
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
      // Create the mapping key based on match type
      const mappingKey = matchType === 'id' ? selectedButton : `${matchType}:${matchValue}`
      onUpdateMapping(mappingKey, mappingData)
    }
  }

  const handleDelete = () => {
    if (selectedButton) {
      onDeleteMapping(selectedButton)
      setGestures({
        direction: { action: '', description: '' },
        press: { action: '', description: '' },
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
      <h3>Edit: {buttonInfo?.label || selectedButton}</h3>
      
      {/* Match Type Selector */}
      <div className="match-type-section">
        <label className="match-type-label">Apply mapping to:</label>
        <div className="match-type-options">
          <label className="match-type-option">
            <input
              type="radio"
              name="matchType"
              value="id"
              checked={matchType === 'id'}
              onChange={(e) => setMatchType(e.target.value)}
            />
            <span>This button only</span>
            <small>({selectedButton})</small>
          </label>
          
          <label className="match-type-option">
            <input
              type="radio"
              name="matchType"
              value="position"
              checked={matchType === 'position'}
              onChange={(e) => setMatchType(e.target.value)}
            />
            <span>All buttons at this position</span>
            <small>(position: {selectedButton})</small>
          </label>
          
          {buttonInfo?.label && (
            <label className="match-type-option">
              <input
                type="radio"
                name="matchType"
                value="label"
                checked={matchType === 'label'}
                onChange={(e) => setMatchType(e.target.value)}
              />
              <span>All buttons labeled "{buttonInfo.label}"</span>
              <small>(across all controllers)</small>
            </label>
          )}
        </div>
        
        {matchType === 'position' && (
          <div className="match-info">
            <Icon name="info-circle" />
            <span>This mapping will apply to all controllers at position: {selectedButton.toUpperCase()}</span>
          </div>
        )}
        
        {matchType === 'label' && (
          <div className="match-info">
            <Icon name="info-circle" />
            <span>This mapping will apply to all buttons labeled "{buttonInfo.label}" on any controller</span>
          </div>
        )}
      </div>

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
