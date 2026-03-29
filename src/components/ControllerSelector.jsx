import { AVAILABLE_CONTROLLERS } from '../constants/controllers'

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
            <i className={`${controller.icon}`}></i> {controller.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ControllerSelector
