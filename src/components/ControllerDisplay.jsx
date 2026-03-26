import XboxController from './controllers/XboxController'
import SwitchController from './controllers/SwitchController'
import KeyboardMouseDisplay from './controllers/KeyboardMouseDisplay'
import SteamDeckController from './controllers/SteamDeckController'
import ButtonEditor from './ButtonEditor'

function ControllerDisplay({ controller, mappings, onButtonClick, selectedButton, mode = 'mapping' }) {
  // Get initial buttons for the selected controller
  const getControllerButtons = () => {
    // Import button configurations from each controller
    // These would ideally be exported from the controller files
    switch (controller) {
      case 'xbox':
        return [
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
      case 'switch':
        return [
          { id: 'north', x: 80.5, y: 39.8, label: 'X', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
          { id: 'south', x: 80.5, y: 50.7, label: 'B', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
          { id: 'east', x: 89.0, y: 45.28, label: 'A', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
          { id: 'west', x: 71.75, y: 45.28, label: 'Y', shape: 'circle', size: 40, hideLabel: true, type: 'button' },
          { id: 'leftButton', x: 16.00, y: 11.24, label: 'L', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'rightButton', x: 84.06, y: 11.24, label: 'R', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'ZL', x: 17.41, y: 3.50, label: 'ZL', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'ZR', x: 82.60, y: 3.50, label: 'ZR', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'leftStick', x: 19.92, y: 45.02, label: 'L↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
          { id: 'rightStick', x: 80.64, y: 65.65, label: 'R↻', shape: 'circle', size: 62, hideLabel: true, type: 'stick' },
          { id: 'dPadUp', x: 19.92, y: 60.28, label: 'bi bi-caret-up-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
          { id: 'dPadDown', x: 19.92, y: 71.03, label: 'bi bi-caret-down-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
          { id: 'dPadLeft', x: 11.86, y: 65.65, label: 'bi bi-caret-left-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
          { id: 'dPadRight', x: 27.99, y: 65.65, label: 'bi bi-caret-right-fill', shape: 'circle', size: 46, hideLabel: true, type: 'button' },
          { id: 'plus', x: 69.42, y: 33.97, label: 'fas fa-plus', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'minus', x: 30.87, y: 33.97, label: 'fas fa-minus', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'home', x: 74.4, y: 79.3, label: 'fas fa-house', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'capture', x: 26, y: 79.4, label: 'bi bi-record-circle', shape: 'rect', width: 36, height: 36, hideLabel: true, type: 'button' }
        ]
      case 'steamdeck':
        return [
          { id: 'south', x: 91.70, y: 50.48, label: 'A', shape: 'circle', size: 18, hideLabel: true, type: 'button'},
          { id: 'east', x: 94.64, y: 45.59, label: 'B', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
          { id: 'west', x: 88.95, y: 45.59, label: 'X', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
          { id: 'north', x: 91.70, y: 40.71, label: 'Y', shape: 'circle', size: 18, hideLabel: true, type: 'button' },
          { id: 'dPadUp', x: 6.19, y: 38.46, label: 'bi bi-caret-up-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
          { id: 'dPadDown', x: 6.19, y: 52.76, label: 'bi bi-caret-down-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
          { id: 'dPadLeft', x: 1.90, y: 45.59, label: 'bi bi-caret-left-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
          { id: 'dPadRight', x: 10.49, y: 45.59, label: 'bi bi-caret-right-fill', shape: 'dpad', size: 4, hideLabel: true, type: 'button' },
          { id: 'leftButton', x: 10.74, y: 13.92, label: 'L1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
          { id: 'leftTrigger', x: 8.95, y: 5.96, label: 'L2', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'rightButton', x: 89.13, y: 13.92, label: 'R1', shape: 'circle', size: 28, hideLabel: true, type: 'button' },
          { id: 'rightTrigger', x: 90.92, y: 5.96, label: 'R2', shape: 'circle', size: 32, hideLabel: true, type: 'button' },
          { id: 'L3', x: 17.49, y: 48.22, label: 'L3', shape: 'circle', size: 30, hideLabel: true, type: 'stick' },
          { id: 'R3', x: 82.4, y: 48.28, label: 'R3', shape: 'circle', size: 30, hideLabel: true, type: 'stick' },
          { id: 'select', x: 9.31, y: 37.55, label: 'fas fa-clone fa-rotate-90', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
          { id: 'steam', x: 19.04, y: 80.70, label: 'bi bi-gear-fill', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
          { id: 'start', x: 90.54, y: 37.55, label: 'fas fa-bars', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
          { id: 'quickAccess', x: 81, y: 80.7, label: 'bi bi-three-dots', shape: 'capsule', width: 34, height: 14, borderRadius: 7, hideLabel: true, type: 'button' },
          { id: 'leftPad', x: 14.68, y: 66.16, label: 'L◯', shape: 'rect', width: 22, height: 30, borderRadius: 4, hideLabel: true, type: 'stick' },
          { id: 'rightPad', x: 85.53, y: 66.16, label: 'R◯', shape: 'rect', width: 22, height: 30, borderRadius: 4, hideLabel: true, type: 'stick' }
        ]
      default:
        return []
    }
  }

  const renderController = () => {
    if (mode === 'editor') {
      return (
        <ButtonEditor
          controller={controller}
          initialButtons={getControllerButtons()}
        />
      )
    }

    switch (controller) {
      case 'xbox':
        return (
          <XboxController
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
          />
        )
      case 'switch':
        return (
          <SwitchController
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
          />
        )
      case 'keyboardmouse':
        return (
          <KeyboardMouseDisplay
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
          />
        )
      case 'steamdeck':
        return (
          <SteamDeckController
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
          />
        )
      default:
        return <div>Select a controller</div>
    }
  }

  return (
    <div className="controller-display">
      <div className="diagram-container">
        {renderController()}
      </div>
    </div>
  )
}

export default ControllerDisplay
