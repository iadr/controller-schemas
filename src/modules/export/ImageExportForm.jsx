import { useState } from 'react'
import { AVAILABLE_CONTROLLERS } from '../controllers/registry'
import { getDeviceMappings } from '../mappings/model/deviceMappings'
import { exportControllerToImage } from './image'

export default function ImageExportForm({ data, context, busy, onBusy }) {
  const [contexts, setContexts] = useState([context])
  const [devices, setDevices] = useState([data.controller])
  const [size, setSize] = useState('1920x1080')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const toggle = (setter, value) => setter(prev => prev.includes(value) ? prev.filter(item => item !== value) : [...prev, value])
  const count = contexts.length * devices.length
  const download = async event => {
    event.preventDefault()
    onBusy(true); setMessage(''); setError('')
    let completed = 0
    const failures = []
    const [width, height] = size.split('x').map(Number)
    try {
      for (const device of devices) {
        for (const name of contexts) {
          try {
            await exportControllerToImage(device, name, getDeviceMappings(data, name, device),
              data.buttonSideOverrides, data.customOrder, false, { width, height })
            completed++
          } catch { failures.push(device + ' / ' + name) }
        }
      }
      setMessage(completed + ' de ' + count + ' imagenes generadas.')
      if (failures.length) setError('No se pudieron exportar: ' + failures.join(', '))
    } finally { onBusy(false) }
  }
  return <form className="ui-form" onSubmit={download}>
    <fieldset className="ui-options" disabled={busy}><legend>Contextos</legend>
      {data.contexts.map(name => <label className="ui-option" key={name}>
        <input className="ui-check" type="checkbox" checked={contexts.includes(name)} onChange={() => toggle(setContexts, name)} />{name}
      </label>)}
    </fieldset>
    <fieldset className="ui-options" disabled={busy}><legend>Dispositivos</legend>
      {AVAILABLE_CONTROLLERS.map(device => <label className="ui-option" key={device.id}>
        <input className="ui-check" type="checkbox" checked={devices.includes(device.id)}
          onChange={() => toggle(setDevices, device.id)} />{device.name}
      </label>)}
    </fieldset>
    <label className="ui-field">Tamano
      <select className="ui-input" value={size} disabled={busy} onChange={event => setSize(event.target.value)}>
        <option value="1920x1080">1920 x 1080 px</option><option value="1440x900">1440 x 900 px</option>
        <option value="1080x1080">1080 x 1080 px</option>
      </select>
    </label>
    <p className="ui-muted">{count} imagenes, una por contexto y dispositivo.</p>
    {message && <p role="status">{message}</p>}
    {error && <p className="ui-error" role="alert">{error}</p>}
    <button className="ui-button ui-button-primary" disabled={busy || !count}>{busy ? 'Exportando...' : 'Descargar PNG'}</button>
  </form>
}
