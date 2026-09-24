export default function FileActions({ onImport, onExport }) {
  return <div className="file-actions">
    <button className="ui-button" onClick={onImport}>Importar</button>
    <button className="ui-button" onClick={onExport}>Exportar</button>
  </div>
}
