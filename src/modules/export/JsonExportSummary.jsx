import { exportToJSON } from './json'

export default function JsonExportSummary({ data }) {
  return <div className="ui-form">
    <p>Esquema completo: dispositivo seleccionado, {data.contexts.length} contextos,
      asociaciones compartidas y por dispositivo, lados y orden.</p>
    <button className="ui-button ui-button-primary"
      onClick={() => exportToJSON({ ...data, version: 2 }, 'controller-scheme.json')}>Descargar JSON</button>
  </div>
}
