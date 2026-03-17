import XboxController from './controllers/XboxController'
import SwitchController from './controllers/SwitchController'
import KeyboardMouseDisplay from './controllers/KeyboardMouseDisplay'
import SteamDeckController from './controllers/SteamDeckController'

function ControllerDisplay({ controller, mappings, onButtonClick, selectedButton }) {
  const renderController = () => {
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
