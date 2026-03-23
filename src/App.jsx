import { useState } from 'react'
import ControllerSelector from './components/ControllerSelector'
import ControllerDisplay from './components/ControllerDisplay'
import MappingEditor from './components/MappingEditor'
import { exportToJSON, importFromJSON } from './utils/export'

function App() {
  const [selectedController, setSelectedController] = useState('xbox')
  const [mappings, setMappings] = useState({})
  const [selectedButton, setSelectedButton] = useState(null)
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null)

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
        setSelectedButtonInfo(null)
      })
    }
  }

  const handleButtonClick = (buttonId, buttonInfo) => {
    setSelectedButton(buttonId)
    setSelectedButtonInfo(buttonInfo)
  }

  const handleUpdateMapping = (buttonId, mappingData) => {
    setMappings(prev => ({
      ...prev,
      [buttonId]: mappingData
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
          <div className="sidebar-top">
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
          </div>

          <div className="sidebar-bottom">
            <MappingEditor
              selectedButton={selectedButton}
              buttonInfo={selectedButtonInfo}
              mapping={mappings[selectedButton]}
              onUpdateMapping={handleUpdateMapping}
              onDeleteMapping={handleDeleteMapping}
            />
          </div>
        </div>

        <div className="main-area">
          <ControllerDisplay
            controller={selectedController}
            mappings={mappings}
            onButtonClick={handleButtonClick}
            selectedButton={selectedButton}
          />
        </div>
      </div>
    </div>
  )
}

export default App
