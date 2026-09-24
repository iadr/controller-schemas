import { useRef, useState } from 'react'
import { normalizeScheme } from './normalizeScheme'
import { getControllerConfig } from '../controllers/registry'
import { getGestures } from '../mappings/model/gestures'

export default function JsonImportForm({ onApply }) {
  const [review, setReview] = useState(null)
  const [error, setError] = useState('')
  const [reading, setReading] = useState(false)
  const request = useRef(0)
  const read = async event => {
    const file = event.target.files[0]
    const id = ++request.current
    setReview(null); setError(''); setReading(Boolean(file))
    if (!file) return
    try {
      const data = normalizeScheme(JSON.parse(await file.text()))
      if (id === request.current) setReview({ file: file.name, data })
    } catch (error) {
      if (id === request.current) setError(error instanceof SyntaxError ? 'El archivo no contiene JSON valido.' : error.message)
    } finally { if (id === request.current) setReading(false) }
  }
  const data = review?.data
  const shared = data ? Object.values(data.contextMappings) : []
  const local = data ? Object.values(data.deviceMappings).flatMap(devices => Object.values(devices)) : []
  const count = [...shared, ...local].reduce((total, mappings) =>
    total + Object.values(mappings).reduce((sum, mapping) => sum + getGestures(mapping).length, 0), 0)
  return <div className="ui-form">
    <label className="ui-field">Archivo JSON
      <input className="ui-input" type="file" accept=".json,application/json" onChange={read} />
    </label>
    {reading && <p role="status">Leyendo archivo...</p>}
    {error && <p className="ui-error" role="alert">{error}</p>}
    {review && <div className="ui-form">
      <p className="ui-muted">{review.file}: {getControllerConfig(data.controller).name}.
        {' '}{data.contexts.length} contextos, {count} acciones registradas.</p>
      <p className="ui-muted">Contextos: {data.contexts.join(', ')}</p>
      <p>Se reemplazara el esquema completo de esta sesion.</p>
      <button className="ui-button ui-button-primary" onClick={() => onApply(data)}>Reemplazar esquema</button>
    </div>}
  </div>
}
