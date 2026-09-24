import { useState } from 'react'
import { getDeviceMappings } from '../modules/mappings/model/deviceMappings'

export default function useScheme() {
  const [data, setData] = useState({
    controller: 'xbox', contexts: ['MENU', 'GAMEPLAY'],
    contextMappings: { MENU: {}, GAMEPLAY: {} }, deviceMappings: {},
    buttonSideOverrides: {}, customOrder: {},
  })
  const [currentContext, setCurrentContext] = useState('MENU')
  const setController = controller => setData(prev => ({ ...prev, controller }))
  const addContext = name => {
    setData(prev => ({ ...prev, contexts: [...prev.contexts, name],
      contextMappings: { ...prev.contextMappings, [name]: {} } }))
    setCurrentContext(name)
  }
  const applyImport = next => {
    setData(next)
    setCurrentContext(next.contexts[0])
  }
  const saveMapping = (control, mapping) => {
    setData(prev => ({
      ...prev,
      deviceMappings: {
        ...prev.deviceMappings,
        [currentContext]: {
          ...prev.deviceMappings[currentContext],
          [prev.controller]: {
            ...prev.deviceMappings[currentContext]?.[prev.controller],
            [control.id]: mapping,
          },
        },
      },
    }))
  }
  return { data, currentContext, setCurrentContext, setController, addContext, applyImport,
    saveMapping, mappings: getDeviceMappings(data, currentContext, data.controller) }
}
