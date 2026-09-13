import { useState } from 'react'
import { getButtonSide } from '../model/organization'
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
