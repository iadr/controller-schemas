import download from './download'
export function exportToJSON(data, filename) {
  const url = URL.createObjectURL(new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }))
  try { download(url, filename) } finally { URL.revokeObjectURL(url) }
}
export function importFromJSON(file, callback) {
  const reader = new FileReader()
  reader.onload = event => {
    try { callback(JSON.parse(event.target.result)) }
    catch (error) { alert('Error reading file: Invalid JSON format'); console.error(error) }
  }
  reader.onerror = () => alert('Unable to read the selected file')
  reader.readAsText(file)
}
