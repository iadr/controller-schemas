import { useState } from 'react'
import Modal from '../../shared/ui/Modal'
import ImageExportForm from './ImageExportForm'
import JsonExportSummary from './JsonExportSummary'

export default function ExportDialog({ data, context, onClose }) {
  const [format, setFormat] = useState('png')
  const [busy, setBusy] = useState(false)
  return <Modal title="Exportar esquema" onClose={onClose} busy={busy}>
    <div className="ui-form">
      <label className="ui-field">Formato
        <select className="ui-input" data-initial-focus disabled={busy} value={format} onChange={event => setFormat(event.target.value)}>
          <option value="png">Imagen PNG</option><option value="json">Esquema JSON</option>
        </select>
      </label>
      {format === 'png' ? <ImageExportForm data={data} context={context} busy={busy} onBusy={setBusy} />
        : <JsonExportSummary data={data} />}
    </div>
  </Modal>
}
