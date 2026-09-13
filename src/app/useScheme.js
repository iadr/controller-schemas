import { useState } from 'react'
import { exportToJSON, importFromJSON } from '../modules/export/json'
export default function useScheme() {
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
  const [mode, setMode] = useState('mapping') // Coordinate editor is deprecated.
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
      const target = event.target?.closest?.('[data-button-id]') || event.currentTarget
      const rect = target.getBoundingClientRect()
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

  const handleUpdateMapping = (mappingKey, mappingData) => {
    setContextMappings(prev => ({
      ...prev,
      [currentContext]: {
        ...prev[currentContext],
        [mappingKey]: mappingData
      }
    }))
  }

  const handleDeleteMapping = (buttonId) => {
    setContextMappings(prev => {
      const newMappings = { ...prev }
      const contextMappings = { ...newMappings[currentContext] }
      
      // Delete all mapping variations for this button (id, position:id, label:X)
      Object.keys(contextMappings).forEach(key => {
        if (key === buttonId || key.endsWith(`:${buttonId}`) || key === `position:${buttonId}`) {
          delete contextMappings[key]
        }
      })
      
      // Also check for label-based mappings if buttonInfo is available
      if (selectedButtonInfo?.label) {
        const labelKey = `label:${selectedButtonInfo.label}`
        delete contextMappings[labelKey]
      }
      
      newMappings[currentContext] = contextMappings
      return newMappings
    })
  }

  return {
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
  }
}
