/**
 * Available controllers configuration
 * Single source of truth for all controller definitions
 */
export const AVAILABLE_CONTROLLERS = [
  { 
    id: 'xbox', 
    name: 'Xbox Controller', 
    icon: 'bi bi-xbox', 
    type: 'controller',
    category: 'Controllers' 
  },
  { 
    id: 'switch', 
    name: 'Nintendo Switch', 
    icon: 'bi bi-nintendo-switch', 
    type: 'controller',
    category: 'Controllers' 
  },
  { 
    id: 'steamdeck', 
    name: 'Steam Deck', 
    icon: 'bi bi-steam', 
    type: 'controller',
    category: 'Controllers' 
  },
  { 
    id: 'keyboardmouse', 
    name: 'Keyboard & Mouse', 
    icon: 'bi bi-keyboard', 
    type: 'pc',
    category: 'PC Peripherals' 
  }
]

/**
 * Button definitions for Xbox Controller
 * Ground truth for button configuration - used by both display and export
 */
export const XBOX_BUTTONS = [
  { id: 'south', x: 76.09, y: 37.56, label: 'A', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'east', x: 83.09, y: 27.80, label: 'B', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'west', x: 68.98, y: 27.99, label: 'X', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'north', x: 76.09, y: 18.34, label: 'Y', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'leftButton', x: 29.37, y: 4.03, label: 'LB', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'rightButton', x: 70.63, y: 4.03, label: 'RB', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'leftTrigger', x: 21.65, y: 3.14, label: 'LT', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'rightTrigger', x: 78.34, y: 3.14, label: 'RT', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'leftStick', x: 24.03, y: 27.65, label: 'LS', shape: 'circle', size: 42, hideLabel: false, type: 'stick' },
  { id: 'rightStick', x: 63.37, y: 49.35, label: 'RS', shape: 'circle', size: 42, hideLabel: false, type: 'stick' },
  { id: 'dPad', x: 36.63, y: 51.39, label: 'bi bi-dpad', shape: 'dpad', size: 24, hideLabel: false, type: 'button' },
  { id: 'dPadUp', x: 36.63, y: 44.98, label: 'bi bi-caret-up-fill', shape: 'dpad', size: 28, hideLabel: false, type: 'button' },
  { id: 'dPadDown', x: 36.63, y: 57.65, label: 'bi bi-caret-down-fill', shape: 'dpad', size: 28, hideLabel: false, type: 'button' },
  { id: 'dPadLeft', x: 31.95, y: 51.39, label: 'bi bi-caret-left-fill', shape: 'dpad', size: 28, hideLabel: false, type: 'button' },
  { id: 'dPadRight', x: 41.30, y: 51.39, label: 'bi bi-caret-right-fill', shape: 'dpad', size: 28, hideLabel: false, type: 'button' },
  { id: 'start', x: 57.54, y: 27.33, label: 'fas fa-bars', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'select', x: 42.56, y: 27.33, label: 'far fa-clone fa-rotate-90', shape: 'circle', size: 32, hideLabel: true, type: 'button' }
]

/**
 * Button definitions for Nintendo Switch Controller
 * Ground truth for button configuration - used by both display and export
 */
export const SWITCH_BUTTONS = [
  { id: 'north', x: 80.5, y: 40.4, label: 'X', shape: 'circle', size: 42, hideLabel: true, type: 'button', width: 32, height: 32 },
  { id: 'south', x: 80.5, y: 51.5, label: 'B', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
  { id: 'east', x: 89, y: 46, label: 'A', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
  { id: 'west', x: 71.75, y: 46, label: 'Y', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
  { id: 'leftButton', x: 16, y: 11.24, label: 'L', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'rightButton', x: 84.06, y: 11.24, label: 'R', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'leftTrigger', x: 17.41, y: 3.5, label: 'ZL', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'rightTrigger', x: 82.6, y: 3.5, label: 'ZR', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'leftStick', x: 19.9, y: 45.9, label: 'L↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
  { id: 'rightStick', x: 80.43, y: 66.55, label: 'R↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
  { id: 'dPadUp', x: 19.72, y: 61, label: 'bi bi-caret-up-fill', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'dPadDown', x: 19.72, y: 72.1, label: 'bi bi-caret-down-fill', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'dPadLeft', x: 11.65, y: 66.65, label: 'bi bi-caret-left-fill', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'dPadRight', x: 28.15, y: 66.65, label: 'bi bi-caret-right-fill', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'plus', x: 69.42, y: 33.97, label: 'fas fa-plus', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'minus', x: 30.87, y: 33.97, label: 'fas fa-minus', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'home', x: 74.4, y: 79.3, label: 'fas fa-house', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'capture', x: 26, y: 79.4, label: 'bi bi-record-circle', shape: 'rect', width: 36, height: 36, hideLabel: true, type: 'button' }
]

/**
 * Button definitions for Steam Deck Controller
 * Ground truth for button configuration - used by both display and export
 */
export const STEAMDECK_BUTTONS = [
  // Face buttons
  { id: 'south', x: 91.70, y: 50.48, label: 'A', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
  { id: 'east', x: 94.64, y: 45.59, label: 'B', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
  { id: 'west', x: 88.95, y: 45.59, label: 'X', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
  { id: 'north', x: 91.70, y: 40.71, label: 'Y', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
  
  // D-pad
  { id: 'dPadUp', x: 6.19, y: 38.46, label: 'bi bi-caret-up-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  { id: 'dPadDown', x: 6.19, y: 52.76, label: 'bi bi-caret-down-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  { id: 'dPadLeft', x: 1.90, y: 45.59, label: 'bi bi-caret-left-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  { id: 'dPadRight', x: 10.49, y: 45.59, label: 'bi bi-caret-right-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  
  // Bumpers and triggers
  { id: 'leftButton', x: 10.74, y: 13.92, label: 'L1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
  { id: 'leftTrigger', x: 8.95, y: 5.96, label: 'L2', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'rightButton', x: 89.13, y: 13.92, label: 'R1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
  { id: 'rightTrigger', x: 90.92, y: 5.96, label: 'R2', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  
  // Sticks
  { id: 'leftStick', x: 17.49, y: 48.22, label: 'L3', shape: 'circle', size: 30, hideLabel: false, type: 'stick' },
  { id: 'rightStick', x: 82.4, y: 48.28, label: 'R3', shape: 'circle', size: 30, hideLabel: false, type: 'stick' },
  
  // System buttons
  { id: 'select', x: 9.31, y: 37.55, label: 'fas fa-clone fa-rotate-90', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  { id: 'steam', x: 19.04, y: 80.70, label: 'bi bi-gear-fill', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  { id: 'start', x: 90.54, y: 37.55, label: 'fas fa-bars', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  { id: 'quickAccess', x: 81, y: 80.7, label: 'bi bi-three-dots', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  
  // Touchpads
  { id: 'leftPad', x: 14.68, y: 66.16, label: 'L◯', shape: 'rect', width: 22, height: 30, borderRadius: 4, hideLabel: true, type: 'stick' },
  { id: 'rightPad', x: 85.53, y: 66.16, label: 'R◯', shape: 'rect', width: 22, height: 30, borderRadius: 4, hideLabel: true, type: 'stick' }
]

/**
 * Get button definitions for a specific controller
 * @param {string} controllerId - The controller ID (xbox, switch, steamdeck, etc.)
 * @returns {Array} Array of button definitions
 */
export const getControllerButtons = (controllerId) => {
  switch (controllerId) {
    case 'xbox':
      return XBOX_BUTTONS
    case 'switch':
      return SWITCH_BUTTONS
    case 'steamdeck':
      return STEAMDECK_BUTTONS
    case 'keyboardmouse':
    case 'keyboard':
      return []
    default:
      return []
  }
}

/**
 * Get controller configuration including name, image path, and buttons
 * @param {string} controllerId - The controller ID
 * @returns {Object} Controller configuration object
 */
export const getControllerConfig = (controllerId) => {
  switch (controllerId) {
    case 'xbox':
      return {
        name: 'Xbox Controller',
        image: './controllers/xbox-one.svg',
        buttons: XBOX_BUTTONS
      }
    case 'switch':
      return {
        name: 'Nintendo Switch Controller',
        image: './controllers/switch.svg',
        buttons: SWITCH_BUTTONS
      }
    case 'steamdeck':
      return {
        name: 'Steam Deck',
        image: './controllers/steam-deck.svg',
        buttons: STEAMDECK_BUTTONS
      }
    case 'keyboardmouse':
    case 'keyboard':
      return {
        name: 'Keyboard & Mouse',
        image: './controllers/QWERTY_en_mouse.svg',
        buttons: []
      }
    default:
      return {
        name: 'Controller',
        image: '',
        buttons: []
      }
  }
}
