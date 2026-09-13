import { getButtonMapping } from './buttonMatching'
import { getGestures } from './gestures'

export const getMappingLabel = (mappings, buttonId, buttonInfo) => {
  const mapping = buttonInfo ? getButtonMapping(buttonInfo, mappings) : mappings[buttonId]
  return getGestures(mapping)[0]?.action || null
}

export const getMappingGestures = (mappings, buttonId, buttonInfo) => {
  const mapping = buttonInfo ? getButtonMapping(buttonInfo, mappings) : mappings[buttonId]
  const gestures = getGestures(mapping)
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
      mappingLabel: getMappingLabel(mappings, button.id, button)
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
