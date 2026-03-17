function ControllerSelector({ selected, onChange }) {
  const controllers = [
    { id: 'xbox', name: 'Xbox Controller', icon: 'bi bi-xbox' },
    { id: 'switch', name: 'Nintendo Switch', icon: 'bi bi-nintendo-switch' },
    { id: 'keyboardmouse', name: 'Keyboard & Mouse', icon: 'bi bi-keyboard' },
    { id: 'steamdeck', name: 'Steam Deck', icon: 'bi bi-steam' }
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
