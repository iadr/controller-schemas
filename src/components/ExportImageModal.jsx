import { useState } from 'react'
import { exportControllerToImage } from '../utils/export.jsx'
import { AVAILABLE_CONTROLLERS } from '../constants/controllers'

function ExportImageModal({ 
  isOpen, 
  onClose, 
  selectedController, 
  contexts, 
  contextMappings 
}) {
  const [selectedContexts, setSelectedContexts] = useState([])
  const [selectedControllers, setSelectedControllers] = useState([selectedController])
  const [isExporting, setIsExporting] = useState(false)

  if (!isOpen) return null

  const handleToggleContext = (context) => {
    setSelectedContexts(prev => {
      if (prev.includes(context)) {
        return prev.filter(c => c !== context)
      } else {
        return [...prev, context]
      }
    })
  }

  const handleToggleController = (controllerId) => {
    setSelectedControllers(prev => {
      if (prev.includes(controllerId)) {
        return prev.filter(c => c !== controllerId)
      } else {
        return [...prev, controllerId]
      }
    })
  }

  const handleSelectAllContexts = () => {
    if (selectedContexts.length === contexts.length) {
      setSelectedContexts([])
    } else {
      setSelectedContexts([...contexts])
    }
  }

  const handleSelectAllControllers = () => {
    if (selectedControllers.length === AVAILABLE_CONTROLLERS.length) {
      setSelectedControllers([])
    } else {
      setSelectedControllers(AVAILABLE_CONTROLLERS.map(c => c.id))
    }
  }

  const handleExport = async () => {
    if (selectedContexts.length === 0) {
      alert('Please select at least one context to export')
      return
    }

    if (selectedControllers.length === 0) {
      alert('Please select at least one controller to export')
      return
    }

    setIsExporting(true)

    const totalExports = selectedControllers.length * selectedContexts.length
    let successCount = 0
    let failCount = 0

    try {
      // Export each combination of controller + context
      for (const controller of selectedControllers) {
        for (const context of selectedContexts) {
          try {
            const mappings = contextMappings[context] || {}
            console.log(`Starting export: ${controller} - ${context}`)
            await exportControllerToImage(
              controller,
              context,
              mappings
            )
            successCount++
            console.log(`Successfully exported: ${controller} - ${context}`)
            // Longer delay between exports to ensure proper cleanup and recovery
            await new Promise(resolve => setTimeout(resolve, 1500))
          } catch (error) {
            failCount++
            console.error(`Failed to export ${controller} - ${context}:`, error)
            // Give extra time after a failure before continuing
            await new Promise(resolve => setTimeout(resolve, 1000))
          }
        }
      }
      
      // Show result summary
      if (failCount === 0) {
        alert(`Successfully exported ${successCount} image${successCount > 1 ? 's' : ''}!`)
      } else if (successCount > 0) {
        alert(`Exported ${successCount} image${successCount > 1 ? 's' : ''} successfully.\n${failCount} export${failCount > 1 ? 's' : ''} failed.`)
      } else {
        alert('All exports failed. Please try again.')
      }
      
      if (successCount > 0) {
        onClose()
        setSelectedContexts([])
        setSelectedControllers([selectedController])
      }
    } catch (error) {
      console.error('Error exporting images:', error)
      alert('Error exporting images. Please try again.')
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content export-image-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Export Mapping as Image</h2>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="modal-body">
          <p className="export-description">
            Select which controllers and contexts to export. Each combination will be exported as a separate image file.
          </p>

          {/* Controllers Selection */}
          <div className="context-selection">
            <div className="context-selection-header">
              <h3>Controllers ({selectedControllers.length}/{AVAILABLE_CONTROLLERS.length} selected)</h3>
              <button 
                className="btn btn-secondary btn-small"
                onClick={handleSelectAllControllers}
              >
                {selectedControllers.length === AVAILABLE_CONTROLLERS.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="context-checkboxes">
              {AVAILABLE_CONTROLLERS.map(controller => (
                <label key={controller.id} className="context-checkbox-item">
                  <input
                    type="checkbox"
                    checked={selectedControllers.includes(controller.id)}
                    onChange={() => handleToggleController(controller.id)}
                  />
                  <i className={`${controller.icon} controller-icon`}></i>
                  <span className="context-name">{controller.name}</span>
                  <span className="mapping-count">{controller.category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Contexts Selection */}
          <div className="context-selection">
            <div className="context-selection-header">
              <h3>Contexts ({selectedContexts.length}/{contexts.length} selected)</h3>
              <button 
                className="btn btn-secondary btn-small"
                onClick={handleSelectAllContexts}
              >
                {selectedContexts.length === contexts.length ? 'Deselect All' : 'Select All'}
              </button>
            </div>

            <div className="context-checkboxes">
              {contexts.map(context => {
                const mappingCount = Object.keys(contextMappings[context] || {}).length
                return (
                  <label key={context} className="context-checkbox-item">
                    <input
                      type="checkbox"
                      checked={selectedContexts.includes(context)}
                      onChange={() => handleToggleContext(context)}
                    />
                    <span className="context-name">{context}</span>
                    <span className="mapping-count">({mappingCount} mappings)</span>
                  </label>
                )
              })}
            </div>
          </div>

          {/* Export Summary */}
          {selectedControllers.length > 0 && selectedContexts.length > 0 && (
            <div className="export-summary">
              <i className="fas fa-info-circle"></i>
              <span>Will export {selectedControllers.length * selectedContexts.length} image{selectedControllers.length * selectedContexts.length > 1 ? 's' : ''}</span>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
            disabled={isExporting}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={handleExport}
            disabled={isExporting || selectedContexts.length === 0 || selectedControllers.length === 0}
          >
            {isExporting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Exporting...
              </>
            ) : (
              <>
                <i className="fas fa-download"></i> Export Images
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ExportImageModal
