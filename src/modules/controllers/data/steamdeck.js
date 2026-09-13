export const STEAMDECK_BUTTONS = [
  // Face buttons
  { id: 'south', x: 94.00, y: 26.11, label: 'A', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'SOUTH' },
  { id: 'east', x: 96.95, y: 18.98, label: 'B', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'EAST' },
  { id: 'west', x: 91.00, y: 19.11, label: 'X', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'WEST' },
  { id: 'north', x: 94.00, y: 12.06, label: 'Y', shape: 'circle', size: 18, hideLabel: true, type: 'button', position: 'NORTH' },
  
  // D-pad
  { id: 'dPadUp', x: 6.27, y: 13.07, label: 'bi bi-caret-up-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  { id: 'dPadDown', x: 6.27, y: 24.75, label: 'bi bi-caret-down-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  { id: 'dPadLeft', x: 3.90, y: 18.91, label: 'bi bi-caret-left-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  { id: 'dPadRight', x: 8.63, y: 18.91, label: 'bi bi-caret-right-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
  
  // Visible shoulder buttons; triggers are not represented in this front view.
  { id: 'leftButton', x: 7.27, y: 5.34, label: 'L1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
  { id: 'rightButton', x: 92.67, y: 5.34, label: 'R1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
  
  // Sticks
  { id: 'leftStick', x: 15.70, y: 22.98, label: 'L3', shape: 'circle', size: 30, hideLabel: false, type: 'stick' },
  { id: 'rightStick', x: 84.24, y: 22.98, label: 'R3', shape: 'circle', size: 30, hideLabel: false, type: 'stick' },
  
  // System buttons
  { id: 'select', x: 11.60, y: 9.16, label: 'fas fa-clone fa-rotate-90', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  { id: 'steam', x: 17.31, y: 70.95, label: 'bi bi-gear-fill', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  { id: 'start', x: 88.44, y: 9.16, label: 'fas fa-bars', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  { id: 'quickAccess', x: 82.86, y: 70.95, label: 'bi bi-three-dots', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
  
  // Touchpads
  { id: 'leftPad', x: 14.63, y: 50.21, label: 'L◯', shape: 'rect', width: 22, height:28, borderRadius: 4, hideLabel: true, type: 'stick' },
  { id: 'rightPad', x: 85.55, y: 50.21, label: 'R◯', shape: 'rect', width: 22, height:28, borderRadius: 4, hideLabel: true, type: 'stick' }
]
