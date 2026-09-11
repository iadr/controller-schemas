import XboxController from './controllers/XboxController'
import SwitchController from './controllers/SwitchController'
import KeyboardMouseDisplay from './controllers/KeyboardMouseDisplay'
import SteamDeckController from './controllers/SteamDeckController'
import ButtonEditor from './ButtonEditor/ButtonEditor'
import { getControllerButtons } from '../constants/controllers'

function ControllerDisplay({ 
  controller, 
  mappings, 
  onButtonClick, 
  selectedButton, 
  mode = 'mapping',
  buttonSideOverrides,
  setButtonSideOverrides,
  customOrder,
  setCustomOrder
}) {
  const renderController = () => {
    if (mode === 'editor') {
      return (
        <ButtonEditor
          controller={controller}
          initialButtons={getControllerButtons(controller)}
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
            buttonSideOverrides={buttonSideOverrides}
            setButtonSideOverrides={setButtonSideOverrides}
            customOrder={customOrder}
            setCustomOrder={setCustomOrder}
          />
        )
      case 'joycon':
      case 'switch':
        return (
          <SwitchController
            key={controller}
            controller={controller}
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
            buttonSideOverrides={buttonSideOverrides}
            setButtonSideOverrides={setButtonSideOverrides}
            customOrder={customOrder}
            setCustomOrder={setCustomOrder}
          />
        )
      case 'keyboardmouse':
        return (
          <KeyboardMouseDisplay
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
            buttonSideOverrides={buttonSideOverrides}
            setButtonSideOverrides={setButtonSideOverrides}
            customOrder={customOrder}
            setCustomOrder={setCustomOrder}
          />
        )
      case 'steamdeck':
        return (
          <SteamDeckController
            mappings={mappings}
            onButtonClick={onButtonClick}
            selectedButton={selectedButton}
            buttonSideOverrides={buttonSideOverrides}
            setButtonSideOverrides={setButtonSideOverrides}
            customOrder={customOrder}
            setCustomOrder={setCustomOrder}
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
