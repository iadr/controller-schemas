function ControllerSelector({ selected, onChange }) {
  const controllers = [
    { id: 'xbox', name: 'Xbox Controller', icon: 'fab fa-xbox' },
    { id: 'switch', name: 'Nintendo Switch', icon: 'fas fa-gamepad' },
    { id: 'keyboardmouse', name: 'Keyboard & Mouse', icon: 'fas fa-keyboard' },
    { id: 'steamdeck', name: 'Steam Deck', icon: 'fab fa-steam' }
  ]

  return (
    <div className="controller-selector">
      <h3>Select Controller</h3>
      <div className="controller-buttons">
        {controllers.map(controller => (
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
