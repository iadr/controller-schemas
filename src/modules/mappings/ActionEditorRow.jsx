import { eventNames } from './ActionEventRow'
import './action-editor.css'

export default function ActionEditorRow({ value, types, onChange, onRemove }) {
  const change = (field, next) => onChange({ ...value, [field]: next })
  return <fieldset className="action-editor-row">
    <legend>Asociacion</legend>
    <label className="ui-field">Evento
      <select className="ui-input" value={value.type} onChange={event => change('type', event.target.value)}>
        {types.map(type => <option key={type} value={type}>{eventNames[type] || type}</option>)}
      </select>
    </label>
    <label className="ui-field">Condicion o descripcion
      <input className="ui-input" value={value.description} onChange={event => change('description', event.target.value)} />
    </label>
    <label className="ui-field action-editor-wide">Accion
      <input className="ui-input" data-initial-focus value={value.action} onChange={event => change('action', event.target.value)} />
    </label>
    <button className="ui-button action-editor-wide" type="button" onClick={onRemove}>Quitar accion</button>
  </fieldset>
}
