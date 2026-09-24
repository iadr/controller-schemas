export default function ContextSelector({ contexts, value, onChange, onCreate }) {
  return <label className="session-field context-selector">
    <span className="visually-hidden">Contexto</span>
    <select className="ui-input" value={value} title={value}
      onChange={event => event.target.value === '' ? onCreate() : onChange(event.target.value)}>
      {contexts.map(context => <option key={context} value={context}>{context}</option>)}
      <option value="">Crear contexto...</option>
    </select>
  </label>
}
