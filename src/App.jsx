import { useState } from 'react'
import ControllerSelector from './components/ControllerSelector'
import ControllerDisplay from './components/ControllerDisplay'
import MappingEditor from './components/MappingEditor'
import { exportToJSON, importFromJSON } from './utils/export'

function App() {
  const [selectedController, setSelectedController] = useState('xbox')
  const [mappings, setMappings] = useState({})
  const [selectedButton, setSelectedButton] = useState(null)

  const handleExportJSON = () => {
    const data = {
      controller: selectedController,
      mappings
    }
    exportToJSON(data, `${selectedController}-scheme.json`)
  }

  const handleImportJSON = (event) => {
    const file = event.target.files[0]
    if (file) {
      importFromJSON(file, (data) => {
        setSelectedController(data.controller || 'xbox')
        setMappings(data.mappings || {})
        setSelectedButton(null)
      })
    }
  }

  const handleUpdateMapping = (buttonId, label) => {
    setMappings(prev => ({
      ...prev,
      [buttonId]: label
    }))
  }

  const handleDeleteMapping = (buttonId) => {
    setMappings(prev => {
      const newMappings = { ...prev }
      delete newMappings[buttonId]
      return newMappings
    })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Controller Scheme</h1>
      </header>

      <div className="app-content">
        <div className="sidebar">
          <ControllerSelector
            selected={selectedController}
            onChange={setSelectedController}
          />

          <div className="export-section">
            <h3>Export / Import</h3>
            <button onClick={handleExportJSON} className="btn btn-primary">
              Export JSON
            </button>
            <label className="btn btn-secondary">
              Import JSON
              <input
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                style={{ display: 'none' }}
              />
            </label>
          </div>

          <MappingEditor
            selectedButton={selectedButton}
            mapping={mappings[selectedButton]}
            onUpdateMapping={handleUpdateMapping}
            onDeleteMapping={handleDeleteMapping}
          />
        </div>

        <div className="main-area">
          <ControllerDisplay
            controller={selectedController}
            mappings={mappings}
            onButtonClick={setSelectedButton}
            selectedButton={selectedButton}
          />
        </div>
      </div>
    </div>
  )
}

export default App
