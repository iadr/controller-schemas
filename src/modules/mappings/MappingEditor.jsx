import { useState } from 'react'
import { getGestures } from './model/gestures'
import ActionEditorRow from './ActionEditorRow'

export default function MappingEditor({ control, mapping, onSave, onCancel }) {
  const available = control.type === 'stick' ? ['direction', 'press'] : ['press', 'hold']
  const [rows, setRows] = useState(() => getGestures(mapping).map(row => ({
    ...row, type: row.type === 'action' ? (control.type === 'stick' ? 'direction' : 'hold') : row.type,
  })))
  const [error, setError] = useState('')
  const unused = available.filter(type => !rows.some(row => row.type === type))
  const submit = event => {
    event.preventDefault()
    if (rows.some(row => !row.action.trim())) { setError('Completa la accion o quita la fila vacia.'); return }
    onSave(rows.length ? Object.fromEntries(rows.map(row => [row.type, {
      action: row.action.trim(), description: row.description.trim(),
    }])) : null)
  }
  return <form className="ui-form" onSubmit={submit}>
    {rows.map((row, index) => <ActionEditorRow key={index} value={row}
      types={[...new Set([row.type, ...unused])]} onRemove={() => { setRows(prev => prev.filter((_, i) => i !== index)); setError('') }}
      onChange={value => { setRows(prev => prev.map((item, i) => i === index ? value : item)); setError('') }} />)}
    {!rows.length && <p className="ui-muted">Sin acciones. Guardar quitara las asociaciones de este control en este dispositivo.</p>}
    <button className="ui-button" type="button" disabled={!unused.length}
      onClick={() => setRows(prev => [...prev, { type: unused[0], action: '', description: '' }])}>Agregar accion</button>
    {error && <p className="ui-error" role="alert">{error}</p>}
    <div className="ui-actions">
      <button className="ui-button" type="button" onClick={onCancel}>Cancelar</button>
      <button className="ui-button ui-button-primary">Guardar</button>
    </div>
  </form>
}
