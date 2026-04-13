import { useState } from 'react'
import ControllerSelector from './components/ControllerSelector'
import ControllerDisplay from './components/ControllerDisplay'
import MappingModal from './components/MappingEditor/MappingModal'
import ContextManager from './components/ContextManager'
import ExportImageModal from './components/ExportImageModal'
import { exportToJSON, importFromJSON } from './utils/export.jsx'

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
  const [mode, setMode] = useState('mapping') // 'mapping' or 'editor'
  const [showExportImageModal, setShowExportImageModal] = useState(false)
  // Button order and side override state (for drag-and-drop)
  const [buttonSideOverrides, setButtonSideOverrides] = useState({})
  const [customOrder, setCustomOrder] = useState({})

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
      contextMappings: contextMappings,
      buttonSideOverrides: buttonSideOverrides,
      customOrder: customOrder
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
        
        // Restore button order and side overrides
        setButtonSideOverrides(data.buttonSideOverrides || {})
        setCustomOrder(data.customOrder || {})
        
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
        <a 
          className="btn btn-secondary mode-toggle-btn"
          onClick={() => setMode(mode === 'mapping' ? 'editor' : 'mapping')}
          title={`Switch to ${mode === 'mapping' ? 'Editor' : 'Mapping'} Mode`}
        >
          <i className={mode === 'mapping' ? 'fas fa-edit' : 'fas fa-gamepad'}></i>
          {mode === 'mapping' ? 'Editor Mode' : 'Mapping Mode'}
        </a>
      </header>

      <div className="app-content">
        <div className="sidebar">
          <div className="sidebar-top">
            <ControllerSelector
              selected={selectedController}
              onChange={setSelectedController}
            />

            {mode === 'mapping' && (
              <ContextManager
                contexts={contexts}
                currentContext={currentContext}
                onContextChange={handleContextChange}
                onAddContext={handleAddContext}
                onDeleteContext={handleDeleteContext}
              />
            )}

            {mode === 'editor' && (
              <div className="editor-instructions-section">
                <h3>Editor Instructions</h3>
                <div className="editor-instructions">
                  <p><strong>Click</strong> on a button to edit its properties</p>
                  <p><strong>Add Button</strong> to create new buttons</p>
                  <p><strong>Export</strong> when ready to copy the array</p>
                </div>
              </div>
            )}

            <div className="export-section">
              <h3>Export / Import</h3>
              {mode === 'mapping' && (
                <>
                  <button onClick={handleExportJSON} className="btn btn-primary">
                    <i className="fas fa-file-export"></i> Export JSON
                  </button>
                  <button 
                    onClick={() => setShowExportImageModal(true)} 
                    className="btn btn-primary"
                  >
                    <i className="fas fa-image"></i> Export as Image
                  </button>
                  <label className="btn btn-secondary">
                    <i className="fas fa-file-import"></i> Import JSON
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      style={{ display: 'none' }}
                    />
                  </label>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="main-area">
          <ControllerDisplay
            controller={selectedController}
            mappings={mappings}
            onButtonClick={handleButtonClick}
            selectedButton={selectedButton}
            mode={mode}
            buttonSideOverrides={buttonSideOverrides}
            setButtonSideOverrides={setButtonSideOverrides}
            customOrder={customOrder}
            setCustomOrder={setCustomOrder}
          />
        </div>
      </div>

      {mode === 'mapping' && (
        <MappingModal
          selectedButton={selectedButton}
          buttonInfo={selectedButtonInfo}
          mapping={mappings[selectedButton]}
          onUpdateMapping={handleUpdateMapping}
          onDeleteMapping={handleDeleteMapping}
          onClose={handleCloseModal}
          buttonPosition={buttonPosition}
        />
      )}

      <ExportImageModal
        isOpen={showExportImageModal}
        onClose={() => setShowExportImageModal(false)}
        selectedController={selectedController}
        contexts={contexts}
        contextMappings={contextMappings}
        buttonSideOverrides={buttonSideOverrides}
        customOrder={customOrder}
      />
    </div>
  )
}

export default App
