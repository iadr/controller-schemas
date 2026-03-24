import { useState } from 'react'
import ControllerSelector from './components/ControllerSelector'
import ControllerDisplay from './components/ControllerDisplay'
import MappingModal from './components/MappingModal'
import ContextManager from './components/ContextManager'
import { exportToJSON, importFromJSON } from './utils/export'

function App() {
  const [selectedController, setSelectedController] = useState('xbox')
  const [contexts, setContexts] = useState(['MENU', 'GAMEPLAY'])
  const [currentContext, setCurrentContext] = useState('MENU')
  const [contextMappings, setContextMappings] = useState({
    'MENU': {},
    'GAMEPLAY': {}
  })
  const [selectedButton, setSelectedButton] = useState(null)
  const [selectedButtonInfo, setSelectedButtonInfo] = useState(null)
  const [buttonPosition, setButtonPosition] = useState(null)

  // Get mappings for current context
  const mappings = contextMappings[currentContext] || {}

  const handleAddContext = (contextName) => {
    if (!contexts.includes(contextName)) {
      setContexts(prev => [...prev, contextName])
      setContextMappings(prev => ({
        ...prev,
        [contextName]: {}
      }))
    }
  }

  const handleDeleteContext = (contextName) => {
    if (contexts.length > 1) {
      const newContexts = contexts.filter(c => c !== contextName)
      setContexts(newContexts)
      
      // Switch to first available context if deleting current context
      if (currentContext === contextName) {
        setCurrentContext(newContexts[0])
      }
      
      // Remove mappings for deleted context
      setContextMappings(prev => {
        const newMappings = { ...prev }
        delete newMappings[contextName]
        return newMappings
      })
      
      // Clear selection if deleting current context
      if (currentContext === contextName) {
        setSelectedButton(null)
        setSelectedButtonInfo(null)
      }
    }
  }

  const handleContextChange = (contextName) => {
    setCurrentContext(contextName)
    setSelectedButton(null)
    setSelectedButtonInfo(null)
  }

  const handleExportJSON = () => {
    const data = {
      controller: selectedController,
      contexts: contexts,
      contextMappings: contextMappings
    }
    exportToJSON(data, `${selectedController}-scheme.json`)
  }

  const handleImportJSON = (event) => {
    const file = event.target.files[0]
    if (file) {
      importFromJSON(file, (data) => {
        setSelectedController(data.controller || 'xbox')
        
        // Handle both old format (single mappings) and new format (context-based)
        if (data.contextMappings) {
          setContexts(data.contexts || ['MENU', 'GAMEPLAY'])
          setContextMappings(data.contextMappings)
          setCurrentContext(data.contexts?.[0] || 'MENU')
        } else {
          // Legacy format: convert to context-based
          setContexts(['MENU', 'GAMEPLAY'])
          setContextMappings({
            'MENU': data.mappings || {},
            'GAMEPLAY': {}
          })
          setCurrentContext('MENU')
        }
        
        setSelectedButton(null)
        setSelectedButtonInfo(null)
      })
    }
  }

  const handleButtonClick = (buttonId, buttonInfo, event) => {
    setSelectedButton(buttonId)
    setSelectedButtonInfo(buttonInfo)
    
    // Capture button position for modal placement
    if (event && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect()
      setButtonPosition({
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      })
    }
  }

  const handleCloseModal = () => {
    setSelectedButton(null)
    setSelectedButtonInfo(null)
    setButtonPosition(null)
  }

  const handleUpdateMapping = (buttonId, mappingData) => {
    setContextMappings(prev => ({
      ...prev,
      [currentContext]: {
        ...prev[currentContext],
        [buttonId]: mappingData
      }
    }))
  }

  const handleDeleteMapping = (buttonId) => {
    setContextMappings(prev => {
      const newMappings = { ...prev }
      const contextMappings = { ...newMappings[currentContext] }
      delete contextMappings[buttonId]
      newMappings[currentContext] = contextMappings
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

            <ContextManager
              contexts={contexts}
              currentContext={currentContext}
              onContextChange={handleContextChange}
              onAddContext={handleAddContext}
              onDeleteContext={handleDeleteContext}
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

      <MappingModal
        selectedButton={selectedButton}
        buttonInfo={selectedButtonInfo}
        mapping={mappings[selectedButton]}
        onUpdateMapping={handleUpdateMapping}
        onDeleteMapping={handleDeleteMapping}
        onClose={handleCloseModal}
        buttonPosition={buttonPosition}
      />
    </div>
  )
}

export default App
