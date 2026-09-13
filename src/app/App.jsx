import Icon from '../shared/icons/Icon.jsx'
import { lazy, Suspense } from 'react'
import ControllerSelector from '../modules/controllers/ControllerSelector'
import { getControllerButtons } from '../modules/controllers/registry'
import ControllerMappingView from '../modules/mappings/ControllerMappingView'
import MappingModal from '../modules/mappings/MappingModal'
import ContextManager from '../modules/contexts/ContextManager'
import ExportImageModal from '../modules/export/ExportImageModal'
import { getButtonMapping } from '../modules/mappings/model/buttonMatching'
import useScheme from './useScheme'
const LegacyCoordinateEditor = lazy(() => import('../legacy/coordinate-editor/ButtonEditor'))

function App() {
  const {
    selectedController,
    setSelectedController,
    contexts,
    currentContext,
    contextMappings,
    selectedButton,
    selectedButtonInfo,
    buttonPosition,
    mode,
    setMode,
    showExportImageModal,
    setShowExportImageModal,
    buttonSideOverrides,
    setButtonSideOverrides,
    customOrder,
    setCustomOrder,
    mappings,
    handleAddContext,
    handleDeleteContext,
    handleContextChange,
    handleExportJSON,
    handleImportJSON,
    handleButtonClick,
    handleCloseModal,
    handleUpdateMapping,
    handleDeleteMapping
  } = useScheme()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Controller Scheme</h1>
        <button type="button"
          className="btn btn-secondary mode-toggle-btn"
          onClick={() => setMode(mode === 'mapping' ? 'editor' : 'mapping')}
          title={`Switch to ${mode === 'mapping' ? 'Legacy editor' : 'Mapping'} Mode`}
        >
          <Icon name={mode === 'mapping' ? 'edit' : 'gamepad'} />
          {mode === 'mapping' ? 'Coordinate editor (deprecated)' : 'Mapping Mode'}
        </button>
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
                <h3>Legacy coordinate editor</h3>
                <p>Deprecated. SVG hit regions are maintained in the source artwork.</p>
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
                    <Icon name="file-export" /> Export JSON
                  </button>
                  <button 
                    onClick={() => setShowExportImageModal(true)} 
                    className="btn btn-primary"
                  >
                    <Icon name="image" /> Export as Image
                  </button>
                  <label className="btn btn-secondary">
                    <Icon name="file-import" /> Import JSON
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
          <div className="controller-display"><div className="diagram-container">
          {mode === 'editor' ? (
            <Suspense fallback={<p>Loading legacy editor...</p>}>
              <LegacyCoordinateEditor key={selectedController} controller={selectedController}
                initialButtons={getControllerButtons(selectedController)} />
            </Suspense>
          ) : (
            <ControllerMappingView controller={selectedController} mappings={mappings}
              onButtonClick={handleButtonClick} selectedButton={selectedButton}
              buttonSideOverrides={buttonSideOverrides} setButtonSideOverrides={setButtonSideOverrides}
              customOrder={customOrder} setCustomOrder={setCustomOrder} />
          )}
          </div></div>
        </div>
      </div>

      {mode === 'mapping' && (
        <MappingModal
          selectedButton={selectedButton}
          buttonInfo={selectedButtonInfo}
          mapping={getButtonMapping(selectedButtonInfo, mappings)}
          onUpdateMapping={handleUpdateMapping}
          onDeleteMapping={handleDeleteMapping}
          onClose={handleCloseModal}
          buttonPosition={buttonPosition}
          controller={selectedController}
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
