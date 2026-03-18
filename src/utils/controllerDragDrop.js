import { useState, useEffect } from 'react'

/**
 * Utilities and hooks for controller drag-and-drop functionality
 * Shared across all controller components (Switch, Xbox, SteamDeck, etc.)
 */

// ============= Pure Helper Functions =============

/**
 * Convert mappings to displayable format
 * Handles legacy string format, single-gesture, and multi-gesture formats
 */
export const getMappingLabel = (mappings, buttonId) => {
  const mapping = mappings[buttonId]
  if (!mapping) return null
  
  // Handle string format (legacy)
  if (typeof mapping === 'string') return mapping
  
  // Handle old single-gesture object format
  if (typeof mapping === 'object' && mapping.action) return mapping.action
  
  // Handle new multi-gesture format
  if (typeof mapping === 'object') {
    const gestures = []
    if (mapping.hold?.action) gestures.push(`Hold: ${mapping.hold.action}`)
    if (mapping.press?.action) gestures.push(`Press: ${mapping.press.action}`)
    
    if (gestures.length > 0) {
      // Return the first gesture's action for the main label
      const firstGesture = mapping.hold || mapping.press
      return firstGesture.action
    }
  }
  
  return null
}

/**
 * Get gesture details for a button
 * Returns array of gestures if multiple gestures exist, null otherwise
 */
export const getMappingGestures = (mappings, buttonId) => {
  const mapping = mappings[buttonId]
  if (!mapping || typeof mapping !== 'object' || mapping === null) return null
  
  const gestures = []
  if (mapping.hold && typeof mapping.hold === 'object' && mapping.hold.action) {
    gestures.push({ type: 'hold', action: mapping.hold.action, description: mapping.hold.description || '' })
  }
  if (mapping.press && typeof mapping.press === 'object' && mapping.press.action) {
    gestures.push({ type: 'press', action: mapping.press.action, description: mapping.press.description || '' })
  }
  
  return gestures.length > 1 ? gestures : null
}

/**
 * Determine which side a button should be on (left or right)
 * Checks for manual overrides first, then falls back to x position
 */
export const getButtonSide = (button, buttonSideOverrides) => {
  // Check if there's a manual override
  if (buttonSideOverrides[button.id]) {
    return buttonSideOverrides[button.id]
  }
  // Otherwise use the default x position
  return button.x < 50 ? 'left' : 'right'
}

/**
 * Sort buttons by custom order
 * Buttons without custom order are placed at the end
 */
export const sortByCustomOrder = (buttons, side, customOrder) => {
  return [...buttons].sort((a, b) => {
    const orderA = customOrder[`${side}-${a.id}`] ?? Infinity
    const orderB = customOrder[`${side}-${b.id}`] ?? Infinity
    return orderA - orderB
  })
}

/**
 * Get buttons with mappings, split and sorted by side
 */
export const getOrganizedButtons = (buttons, mappings, buttonSideOverrides, customOrder) => {
  // Get all buttons with mappings
  const buttonsWithMappings = buttons
    .map(button => ({
      ...button,
      mappingLabel: getMappingLabel(mappings, button.id)
    }))
    .filter(button => button.mappingLabel)

  // Split into left and right based on position or override
  const leftButtons = buttonsWithMappings.filter(button => 
    getButtonSide(button, buttonSideOverrides) === 'left'
  )
  const rightButtons = buttonsWithMappings.filter(button => 
    getButtonSide(button, buttonSideOverrides) === 'right'
  )

  // Sort by custom order
  const sortedLeftButtons = sortByCustomOrder(leftButtons, 'left', customOrder)
  const sortedRightButtons = sortByCustomOrder(rightButtons, 'right', customOrder)

  return {
    buttonsWithMappings,
    leftButtons,
    rightButtons,
    sortedLeftButtons,
    sortedRightButtons
  }
}

// ============= Custom Hooks =============

/**
 * Hook for managing button positions and container dimensions
 * Tracks the position of button markers for drawing guide lines
 */
export const useButtonPositions = (containerRef, buttons, mappings, buttonSideOverrides, customOrder) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [buttonPositions, setButtonPositions] = useState({})

  useEffect(() => {
    if (containerRef.current) {
      const updatePositions = () => {
        const container = containerRef.current
        const rect = container.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })

        const newPositions = {}
        buttons.forEach(button => {
          const marker = container.querySelector(`[data-button-id="${button.id}"]`)
          if (marker) {
            const markerRect = marker.getBoundingClientRect()
            newPositions[button.id] = {
              x: markerRect.left - rect.left + markerRect.width / 2,
              y: markerRect.top - rect.top + markerRect.height / 2
            }
          }
        })
        setButtonPositions(newPositions)
      }

      // Update on mount and resize
      updatePositions()
      window.addEventListener('resize', updatePositions)
      // Also update after a small delay to ensure images are loaded
      setTimeout(updatePositions, 100)

      return () => window.removeEventListener('resize', updatePositions)
    }
  }, [mappings, buttonSideOverrides, customOrder])

  return { dimensions, buttonPositions }
}

/**
 * Hook for managing drag-and-drop functionality
 * Handles state and all drag/drop event handlers
 */
export const useControllerDragDrop = (buttonSideOverrides, setButtonSideOverrides, customOrder, setCustomOrder) => {
  const [draggedItem, setDraggedItem] = useState(null)
  const [dragOverSide, setDragOverSide] = useState(null)
  const [dragOverItem, setDragOverItem] = useState(null)

  const handleDragStart = (e, button) => {
    setDraggedItem(button)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragEnd = () => {
    setDraggedItem(null)
    setDragOverSide(null)
    setDragOverItem(null)
  }

  const handleDragOver = (e, side) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverSide(side)
  }

  const handleDragLeave = (e) => {
    // Only clear if we're leaving the container, not a child
    if (e.currentTarget === e.target) {
      setDragOverSide(null)
    }
  }

  const handleItemDragOver = (e, item, side) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverItem(item.id)
    setDragOverSide(side)
  }

  const handleItemDrop = (e, targetItem, targetSide, sortedLeftButtons, sortedRightButtons) => {
    e.preventDefault()
    e.stopPropagation()
    setDragOverSide(null)
    setDragOverItem(null)
    
    if (!draggedItem || draggedItem.id === targetItem.id) return

    const currentSide = getButtonSide(draggedItem, buttonSideOverrides)
    const buttonsList = targetSide === 'left' ? sortedLeftButtons : sortedRightButtons
    
    // If moving to a different side, update the override
    if (currentSide !== targetSide) {
      setButtonSideOverrides(prev => ({
        ...prev,
        [draggedItem.id]: targetSide
      }))
    }
    
    // Reorder within the target side
    const targetIndex = buttonsList.findIndex(b => b.id === targetItem.id)
    const newOrder = {}
    
    buttonsList.forEach((button, index) => {
      if (button.id === draggedItem.id) return // Skip the dragged item
      
      if (index < targetIndex) {
        newOrder[`${targetSide}-${button.id}`] = index
      } else if (index === targetIndex) {
        newOrder[`${targetSide}-${draggedItem.id}`] = index
        newOrder[`${targetSide}-${button.id}`] = index + 1
      } else {
        newOrder[`${targetSide}-${button.id}`] = index + 1
      }
    })
    
    // If dragged item wasn't in the list, add it at target position
    if (currentSide !== targetSide) {
      newOrder[`${targetSide}-${draggedItem.id}`] = targetIndex
      // Increment all items at or after target
      buttonsList.forEach((button, index) => {
        if (index >= targetIndex) {
          newOrder[`${targetSide}-${button.id}`] = index + 1
        }
      })
    }
    
    setCustomOrder(prev => ({ ...prev, ...newOrder }))
  }

  const handleDrop = (e, targetSide) => {
    e.preventDefault()
    setDragOverSide(null)
    setDragOverItem(null)
    
    if (!draggedItem) return

    // Determine the current side of the dragged item
    const currentSide = getButtonSide(draggedItem, buttonSideOverrides)
    
    // If dropping on the same side without a specific target, do nothing
    if (currentSide === targetSide) return

    // Update the button side override to move it to the target side
    setButtonSideOverrides(prev => ({
      ...prev,
      [draggedItem.id]: targetSide
    }))
  }

  return {
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
  }
}
