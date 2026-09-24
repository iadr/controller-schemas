import { useState } from 'react'
import Modal from '../../shared/ui/Modal'
import { contextError } from './contextValidation'

export default function ContextDialog({ contexts, onCreate, onClose }) {
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const submit = event => {
    event.preventDefault()
    const message = contextError(name, contexts)
    setError(message)
    if (!message) onCreate(name.trim())
  }
  return <Modal title="Crear contexto" size="context" onClose={onClose}>
    <form className="ui-form" onSubmit={submit}>
      <label className="ui-field">Nombre
        <input className="ui-input" data-initial-focus maxLength={40} value={name}
          aria-invalid={Boolean(error)} aria-describedby={error ? 'context-error' : undefined}
          onChange={event => { setName(event.target.value); setError('') }} />
      </label>
      {error && <p id="context-error" className="ui-error" role="alert">{error}</p>}
      <div className="ui-actions">
        <button type="button" className="ui-button" onClick={onClose}>Cancelar</button>
        <button className="ui-button ui-button-primary">Crear</button>
      </div>
    </form>
  </Modal>
}
