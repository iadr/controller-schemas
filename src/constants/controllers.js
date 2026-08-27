import keyboardImage from '../../controllers/keyboard.svg'

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
 * Position IDs: south, east, west, north follow the standard gamepad layout
 */
export const XBOX_BUTTONS = [
  { id: 'south', x: 76.09, y: 37.56, label: 'A', shape: 'circle', size: 42, hideLabel: true, type: 'button', position: 'SOUTH' },
  { id: 'east', x: 83.09, y: 27.80, label: 'B', shape: 'circle', size: 42, hideLabel: true, type: 'button', position: 'EAST' },
  { id: 'west', x: 68.98, y: 27.99, label: 'X', shape: 'circle', size: 42, hideLabel: true, type: 'button', position: 'WEST' },
  { id: 'north', x: 76.09, y: 18.34, label: 'Y', shape: 'circle', size: 42, hideLabel: true, type: 'button', position: 'NORTH' },
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
 * Position IDs: Note that Switch button labels differ from positions (A=EAST, B=SOUTH, X=NORTH, Y=WEST)
 */
export const SWITCH_BUTTONS = [
  { id: 'north', x: 80.5, y: 39.75, label: 'X', shape: 'circle', size: 42, hideLabel: true, type: 'button', width: 32, height: 32, position: 'NORTH' },
  { id: 'south', x: 80.5, y: 50.7, label: 'B', shape: 'circle', size: 40, hideLabel: true, type: 'button', position: 'SOUTH' },
  { id: 'east', x: 89, y: 45.2, label: 'A', shape: 'circle', size: 40, hideLabel: true, type: 'button', position: 'EAST' },
  { id: 'west', x: 71.75, y: 45.2, label: 'Y', shape: 'circle', size: 40, hideLabel: true, type: 'button', position: 'WEST' },
  { id: 'leftButton', x: 16, y: 11.24, label: 'L', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'rightButton', x: 84.06, y: 11.24, label: 'R', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
  { id: 'leftTrigger', x: 17.41, y: 3.5, label: 'ZL', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'rightTrigger', x: 82.6, y: 3.5, label: 'ZR', shape: 'circle', size: 32, hideLabel: false, type: 'button' },
  { id: 'leftStick', x: 19.9, y: 45.4, label: 'L↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
  { id: 'rightStick', x: 80.43, y: 65.5, label: 'R↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
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
 * Button definitions for Keyboard
 * Ground truth for button configuration - used by both display and export
 */
export const KEYBOARD_BUTTONS = [
  // Row 1 - Function Keys
  { id: 'Esc', x: 4.5, y: 14, label: 'Esc', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F1', x: 12.75, y: 14, label: 'F1', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F2', x: 17, y: 14, label: 'F2', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F3', x: 21, y: 14, label: 'F3', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F4', x: 25.15, y: 14, label: 'F4', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F5', x: 31.5, y: 14, label: 'F5', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F6', x: 35.5, y: 14, label: 'F6', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F7', x: 39.75, y: 14, label: 'F7', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F8', x: 43.8, y: 14, label: 'F8', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F9', x: 50, y: 14, label: 'F9', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F10', x: 54.25, y: 14, label: 'F10', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F11', x: 58.25, y: 14, label: 'F11', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F12', x: 62.4, y: 14, label: 'F12', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'PrintScreen', x: 67.42, y: 14, label: 'PrtSc', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'ScrollLock', x: 71.91, y: 14, label: 'ScrLk', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Pause', x: 76.40, y: 14, label: 'Pause', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  
  // Row 2 - Numbers
  { id: '`', x: 4.5, y: 33.75, label: '`', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '1', x: 8.75, y: 33.75, label: '1', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '2', x: 12.75, y: 33.75, label: '2', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '3', x: 17, y: 33.75, label: '3', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '4', x: 21.15, y: 33.75, label: '4', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '5', x: 25.15, y: 33.75, label: '5', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '6', x: 29.3, y: 33.75, label: '6', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '7', x: 33.45, y: 33.75, label: '7', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '8', x: 37.6, y: 33.75, label: '8', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '9', x: 41.75, y: 33.75, label: '9', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '0', x: 46, y: 33.75, label: '0', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '-', x: 50, y: 33.75, label: '-', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '=', x: 54.25, y: 33.75, label: '=', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'Backspace', x: 62.4, y: 33.75, label: '←', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Insert', x: 67.42, y: 33.75, label: 'Ins', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Home', x: 71.91, y: 33.75, label: 'Home', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'PageUp', x: 76.40, y: 33.75, label: 'PgUp', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'NumLock', x: 80.90, y: 33.75, label: 'Num', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'NumDivide', x: 85.39, y: 33.75, label: '/', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'NumMultiply', x: 89.89, y: 33.75, label: '*', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'NumSubtract', x: 94.38, y: 33.75, label: '-', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  
  // Row 3 - QWERTY
  { id: 'Tab', x: 5.5, y: 46.5, label: 'Tab', shape: 'rect', width: 40, height: 28, hideLabel: true, type: 'button' },
  { id: 'Q', x: 10.75, y: 46.5, label: 'Q', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'W', x: 14.75, y: 46.5, label: 'W', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'E', x: 19, y: 46.5, label: 'E', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'R', x: 23.15, y: 46.5, label: 'R', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'T', x: 27.15, y: 46.5, label: 'T', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'Y', x: 31.3, y: 46.5, label: 'Y', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'U', x: 35.45, y: 46.5, label: 'U', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'I', x: 39.6, y: 46.5, label: 'I', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'O', x: 43.75, y: 46.5, label: 'O', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'P', x: 48, y: 46.5, label: 'P', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '[', x: 52, y: 46.5, label: '[', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: ']', x: 56.25, y: 46.5, label: ']', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '\\', x: 61.80, y: 46.5, label: '\\', shape: 'rect', width: 40, height:28, hideLabel: true, type: 'button' },
  // { id: 'Delete', x: 67.42, y: 46.5, label: 'Del', shape: 'rect', width:28, height:28, hideLabel: true, type: 'button' },
  // { id: 'End', x: 71.91, y: 46.5, label: 'End', shape: 'rect', width:28, height:28, hideLabel: true, type: 'button' },
  // { id: 'PageDown', x: 76.40, y: 46.5, label: 'PgDn', shape: 'rect', width:28, height:28, hideLabel: true, type: 'button' },
  // { id: 'Num7', x: 80.90, y: 46.5, label: '7', shape: 'rect', width:28, height:28, hideLabel: true, type: 'button' },
  // { id: 'Num8', x: 85.39, y: 46.5, label: '8', shape: 'rect', width:28, height:28, hideLabel: true, type: 'button' },
  // { id: 'Num9', x: 89.89, y: 46.5, label: '9', shape: 'rect', width:28, height:28, hideLabel: true, type: 'button' },
  // { id: 'NumAdd', x: 94.38, y: 46.5, label: '+', shape: 'rect', width:28, height: 65, hideLabel: true, type: 'button' },

  // Row 4 - ASDF
  { id: 'CapsLock', x: 5.5, y: 60, label: 'Caps', shape: 'rect', width: 40, height: 28, hideLabel: true, type: 'button' },
  { id: 'A', x: 12.75, y: 60, label: 'A', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'S', x: 17, y: 60, label: 'S', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'D', x: 21.15, y: 60, label: 'D', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'F', x: 25.15, y: 60, label: 'F', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'G', x: 29.3, y: 60, label: 'G', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'H', x: 33.45, y: 60, label: 'H', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'J', x: 37.6, y: 60, label: 'J', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'K', x: 41.75, y: 60, label: 'K', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'L', x: 46, y: 60, label: 'L', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: ';', x: 50, y: 60, label: ';', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '\'', x: 54.15, y: 60, label: '\'', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'Enter', x: 60.5, y: 60, label: 'Enter', shape: 'rect', width: 52, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num4', x: 80.90, y: 60, label: '4', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num5', x: 85.39, y: 60, label: '5', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num6', x: 89.89, y: 60, label: '6', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  
  // Row 5 - ZXCV
  { id: 'Shift', x: 4.5, y: 72.5, label: 'Shift', shape: 'rect', width: 70, height: 28, hideLabel: true, type: 'button' },
  { id: 'Z', x: 11.24, y: 72.5, label: 'Z', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'X', x: 15.73, y: 72.5, label: 'X', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'C', x: 20.22, y: 72.5, label: 'C', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'V', x: 24.72, y: 72.5, label: 'V', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'B', x: 29.21, y: 72.5, label: 'B', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'N', x: 33.71, y: 72.5, label: 'N', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'M', x: 38.20, y: 72.5, label: 'M', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: ',', x: 42.70, y: 72.5, label: ',', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '.', x: 47.19, y: 72.5, label: '.', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: '/', x: 51.69, y: 72.5, label: '/', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'RShift', x: 56.18, y: 72.5, label: 'Shift', shape: 'rect', width: 90, height: 28, hideLabel: true, type: 'button' },
  { id: 'ArrowUp', x: 74.61, y: 71.97, label: '↑', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num1', x: 80.90, y: 72.5, label: '1', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num2', x: 85.39, y: 72.5, label: '2', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num3', x: 89.89, y: 72.5, label: '3', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'NumEnter', x: 94.38, y: 72.5, label: '↵', shape: 'rect', width: 28, height: 65, hideLabel: true, type: 'button' },
  
  // Row 6 - Bottom
  { id: 'Ctrl', x: 4.5, y: 85, label: 'Ctrl', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'Alt', x: 12.36, y: 85, label: 'Alt', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'Space', x: 16.85, y: 85, label: 'Space', shape: 'rect', width: 250, height: 28, hideLabel: true, type: 'button' },
  { id: 'RAlt', x: 46.07, y: 85, label: 'Alt', shape: 'rect', width: 40, height: 28, hideLabel: true, type: 'button' },
  { id: 'RCtrl', x: 69.47, y: 85, label: 'Ctrl', shape: 'rect', width: 50, height: 28, hideLabel: true, type: 'button' },
  { id: 'ArrowLeft', x: 70.12, y: 84.47, label: '←', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'ArrowDown', x: 74.61, y: 84.47, label: '↓', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  { id: 'ArrowRight', x: 79.10, y: 84.47, label: '→', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' },
  // { id: 'Num0', x: 80.90, y: 85, label: '0', shape: 'rect', width: 70, height: 28, hideLabel: true, type: 'button' },
  // { id: 'NumDecimal', x: 89.89, y: 85, label: '.', shape: 'rect', width: 28, height: 28, hideLabel: true, type: 'button' }
]

/**
 * Button definitions for Mouse
 * Ground truth for button configuration - used by both display and export
 */
export const MOUSE_BUTTONS = [
  { id: 'LeftClick', x: 30, y: 28, label: 'Left', shape: 'rect', width: 62, height: 70, hideLabel: true, type: 'button' },
  { id: 'RightClick', x: 70, y: 28, label: 'Right', shape: 'rect', width: 62, height: 70, hideLabel: true, type: 'button' },
  { id: 'MiddleClick', x: 50, y: 24, label: 'Middle', shape: 'capsule', width: 28, height: 54, borderRadius: 14, hideLabel: true, type: 'button' },
  { id: 'Button4', x: 13, y: 54, label: 'Mouse 4', shape: 'capsule', width: 24, height: 42, borderRadius: 12, hideLabel: true, type: 'button' },
  { id: 'Button5', x: 13, y: 70, label: 'Mouse 5', shape: 'capsule', width: 24, height: 42, borderRadius: 12, hideLabel: true, type: 'button' }
]

/**
 * Button definitions for Steam Deck Controller
 * Ground truth for button configuration - used by both display and export
 * Position IDs follow Xbox layout (A=SOUTH, B=EAST, X=WEST, Y=NORTH)
 */
export const STEAMDECK_BUTTONS = [
  // Face buttons
  { id: 'south', x: 91.70, y: 50.48, label: 'A', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'SOUTH' },
  { id: 'east', x: 94.64, y: 45.59, label: 'B', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'EAST' },
  { id: 'west', x: 88.95, y: 45.59, label: 'X', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'WEST' },
  { id: 'north', x: 91.70, y: 40.71, label: 'Y', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'NORTH' },
  
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
  { id: 'leftPad', x: 14.68, y: 66.16, label: 'L◯', shape: 'rect', width: 22, height:28, borderRadius: 4, hideLabel: true, type: 'stick' },
  { id: 'rightPad', x: 85.53, y: 66.16, label: 'R◯', shape: 'rect', width: 22, height:28, borderRadius: 4, hideLabel: true, type: 'stick' }
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
      return [...KEYBOARD_BUTTONS, ...MOUSE_BUTTONS]
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
        image: keyboardImage,
        buttons: [...KEYBOARD_BUTTONS, ...MOUSE_BUTTONS]
      }
    default:
      return {
        name: 'Controller',
        image: '',
        buttons: []
      }
  }
}
