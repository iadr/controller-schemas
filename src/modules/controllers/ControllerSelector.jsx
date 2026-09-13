import Icon from '../../shared/icons/Icon.jsx'
import { AVAILABLE_CONTROLLERS } from './registry.js'

function ControllerSelector({ selected, onChange }) {
  return (
    <div className="controller-selector">
      <h3>Select Controller</h3>
      <div className="controller-buttons">
        {AVAILABLE_CONTROLLERS.map(controller => (
          <button
            key={controller.id}
            className={`btn ${selected === controller.id ? 'active' : ''}`}
            onClick={() => onChange(controller.id)}
          >
            <Icon name={controller.icon} /> {controller.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ControllerSelector
