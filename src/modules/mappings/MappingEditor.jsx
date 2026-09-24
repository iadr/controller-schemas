import { useState } from 'react'
import { getGestures } from './model/gestures'
import ActionEditorRow from './ActionEditorRow'

export default function MappingEditor({ control, mapping, initialScope = 'button', onSave, onCancel }) {
  const available = control.type === 'stick' ? ['direction', 'press'] : ['press', 'hold']
  const [scope, setScope] = useState(initialScope)
  const [rows, setRows] = useState(() => (getGestures(mapping).length ? getGestures(mapping) : [{ type: available[0], action: '' }]).map(row => ({
    ...row, type: row.type === 'action' ? (control.type === 'stick' ? 'direction' : 'hold') : row.type,
  })))
  const [error, setError] = useState('')
  const unused = available.filter(type => !rows.some(row => row.type === type))
  const submit = event => {
    event.preventDefault()
    if (rows.some(row => !row.action.trim())) { setError('Completa la accion o quita la fila vacia.'); return }
    onSave(rows.length ? Object.fromEntries(rows.map(row => [row.type, {
      action: row.action.trim(),
    }])) : null, scope)
  }
  return <form className="ui-form" onSubmit={submit}>
    {control.position && <label className="ui-field">Aplicar mapeo
      <select className="ui-input" value={scope} onChange={event => setScope(event.target.value)}>
        <option value="button">Este boton en este dispositivo</option>
        <option value="position">Cardinalidad {control.position} en todos los mandos</option>
      </select>
    </label>}
    {scope === 'position' && <p className="ui-muted">Se comparte en este contexto. Las excepciones por boton de otros mandos conservan prioridad.</p>}
    {rows.map((row, index) => <ActionEditorRow key={index} value={row}
      types={[...new Set([row.type, ...unused])]} onRemove={() => { setRows(prev => prev.filter((_, i) => i !== index)); setError('') }}
      onChange={value => { setRows(prev => prev.map((item, i) => i === index ? value : item)); setError('') }} />)}
    {!rows.length && <p className="ui-muted">Sin acciones. Guardar quitara las asociaciones de este control en el alcance seleccionado.</p>}
    <button className="ui-button" type="button" disabled={!unused.length}
      onClick={() => setRows(prev => [...prev, { type: unused[0], action: '' }])}>Agregar accion</button>
    {error && <p className="ui-error" role="alert">{error}</p>}
    <div className="ui-actions">
      <button className="ui-button" type="button" onClick={onCancel}>Cancelar</button>
      <button className="ui-button ui-button-primary">Guardar</button>
    </div>
  </form>
}
