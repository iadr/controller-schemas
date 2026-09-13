/**
 * Utility functions for matching buttons by position or label
 * Enables context-aware mappings that work across different controllers
 */

/**
 * Get the mapping that applies to a specific button
 * @param {Object} buttonInfo - Button information {id, label, ...}
 * @param {Object} mappings - All mappings for the current context
 * @returns {Object|null} - The mapping data or null if no mapping found
 */
export function getButtonMapping(buttonInfo, mappings) {
  if (!buttonInfo || !mappings) return null;

  // Check direct ID match first (legacy and most specific)
  if (mappings[buttonInfo.id]) {
    return mappings[buttonInfo.id];
  }

  // Check for position-based mappings
  const positionKey = `position:${buttonInfo.id}`;
  if (mappings[positionKey]) {
    return mappings[positionKey];
  }

  // Check for label-based mappings
  if (buttonInfo.label) {
    // For icon labels (like 'bi bi-dpad'), extract the icon name
    const labelKey = buttonInfo.label.includes(' ') 
      ? `label:${buttonInfo.label.split(' ').pop()}` // Use last part for icon labels
      : `label:${buttonInfo.label}`;
    
    if (mappings[labelKey]) {
      return mappings[labelKey];
    }
  }

  return null;
}

/**
 * Create a mapping key based on match type
 * @param {string} matchBy - 'id', 'position', or 'label'
 * @param {string} value - The button ID or label value
 * @returns {string} - The mapping key to use
 */
export function createMappingKey(matchBy, value) {
  if (matchBy === 'id') {
    return value; // Legacy format: direct ID
  }
  return `${matchBy}:${value}`;
}

/**
 * Parse a mapping key to extract match type and value
 * @param {string} key - The mapping key
 * @returns {Object} - {matchBy, value}
 */
export function parseMappingKey(key) {
  if (!key.includes(':')) {
    return { matchBy: 'id', value: key };
  }
  
  const [matchBy, ...valueParts] = key.split(':');
  return { matchBy, value: valueParts.join(':') };
}

/**
 * Get all buttons that match a mapping key
 * Useful for showing which buttons are affected by a mapping
 * @param {string} mappingKey - The mapping key
 * @param {Array} allButtons - Array of all button definitions
 * @returns {Array} - Array of matching buttons
 */
export function getMatchingButtons(mappingKey, allButtons) {
  const { matchBy, value } = parseMappingKey(mappingKey);
  
  if (!allButtons) return [];
  
  switch (matchBy) {
    case 'id':
      return allButtons.filter(btn => btn.id === value);
    
    case 'position':
      return allButtons.filter(btn => btn.id === value);
    
    case 'label':
      return allButtons.filter(btn => {
        if (!btn.label) return false;
        // Handle icon labels
        if (btn.label.includes(' ')) {
          return btn.label.split(' ').pop() === value;
        }
        return btn.label === value;
      });
    
    default:
      return [];
  }
}

/**
 * Get available labels from button definitions
 * @param {Array} buttons - Array of button definitions
 * @returns {Array} - Array of unique labels
 */
export function getAvailableLabels(buttons) {
  if (!buttons) return [];
  
  const labels = buttons
    .filter(btn => btn.label && !btn.label.includes('bi bi-') && !btn.label.includes('fa'))
    .map(btn => btn.label)
    .filter((label, index, self) => self.indexOf(label) === index);
  
  return labels.sort();
}

/**
 * Get available positions from button definitions
 * @param {Array} buttons - Array of button definitions
 * @returns {Array} - Array of unique position IDs
 */
export function getAvailablePositions(buttons) {
  if (!buttons) return [];
  
  const positions = buttons
    .map(btn => btn.id)
    .filter((id, index, self) => self.indexOf(id) === index);
  
  return positions.sort();
}
