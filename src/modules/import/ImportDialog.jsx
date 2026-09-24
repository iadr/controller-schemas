import { useState } from 'react'
import Modal from '../../shared/ui/Modal'
import JsonImportForm from './JsonImportForm'

export default function ImportDialog({ onApply, onClose }) {
  const [format, setFormat] = useState('json')
  return <Modal title="Importar esquema" onClose={onClose}>
    <div className="ui-form">
      <label className="ui-field">Formato
        <select className="ui-input" data-initial-focus value={format} onChange={event => setFormat(event.target.value)}>
          <option value="json">Esquema JSON</option>
          <option value="unity">Unity .inputactions</option>
        </select>
      </label>
      {format === 'json' ? <JsonImportForm onApply={onApply} /> :
        <p className="ui-muted">La importacion de Unity .inputactions esta pendiente. Usa un esquema JSON del editor.</p>}
    </div>
  </Modal>
}
