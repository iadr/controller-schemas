import { AVAILABLE_CONTROLLERS } from './registry'

export default function ControllerSelector({ selected, onChange }) {
  return <label className="session-field device-selector">
    <span className="visually-hidden">Dispositivo</span>
    <select className="ui-input" value={selected} onChange={event => onChange(event.target.value)}>
      {AVAILABLE_CONTROLLERS.map(device => <option key={device.id} value={device.id}>{device.name}</option>)}
    </select>
  </label>
}
