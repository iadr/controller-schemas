import { AVAILABLE_CONTROLLERS } from '../controllers/registry'
import { contextError } from '../contexts/contextValidation'

const isRecord = value => value !== null && typeof value === 'object' && !Array.isArray(value)
const safeKey = key => !['__proto__', 'constructor', 'prototype'].includes(key.toLowerCase())
const fail = message => { throw new Error(message) }
const deviceIds = AVAILABLE_CONTROLLERS.map(device => device.id)
function validateMapping(mapping) {
  if (mapping === null || typeof mapping === 'string') return
  if (!isRecord(mapping)) fail('Asociacion invalida.')
  for (const [key, value] of Object.entries(mapping)) {
    if (!safeKey(key)) fail('Clave de asociacion reservada.')
    if (['direction', 'press', 'hold'].includes(key)) {
      if (!isRecord(value) || typeof value.action !== 'string' ||
        (value.description !== undefined && typeof value.description !== 'string')) fail('Evento invalido.')
    } else if (['matchType', 'matchValue', 'action', 'gesture', 'description'].includes(key)) {
      if (typeof value !== 'string') fail('Metadatos de asociacion invalidos.')
    } else fail('Evento no compatible: ' + key)
  }
  if (mapping.gesture && !['direction', 'press', 'hold', 'action'].includes(mapping.gesture)) fail('Evento no compatible.')
}
function validateMappings(mappings) {
  if (!isRecord(mappings)) fail('Las asociaciones deben ser un objeto.')
  Object.entries(mappings).forEach(([key, mapping]) => {
    if (!safeKey(key)) fail('Clave reservada.')
    validateMapping(mapping)
  })
}
function validateTree(value) {
  if (!isRecord(value) && !Array.isArray(value)) return
  Object.entries(value).forEach(([key, child]) => {
    if (!safeKey(key)) fail('El archivo contiene una clave reservada.')
    validateTree(child)
  })
}
export function normalizeScheme(data) {
  if (!isRecord(data)) fail('El archivo no contiene un esquema.')
  validateTree(data)
  if (!Object.hasOwn(data, 'contextMappings') && !Object.hasOwn(data, 'mappings')) fail('No se encontraron asociaciones.')
  const controller = data.controller || 'xbox'
  if (!deviceIds.includes(controller)) fail('Dispositivo no compatible.')
  const contexts = data.contextMappings ? (data.contexts || Object.keys(data.contextMappings)) : ['MENU', 'GAMEPLAY']
  if (!Array.isArray(contexts) || !contexts.length) fail('Se requiere al menos un contexto.')
  const seen = []
  contexts.forEach(name => {
    if (typeof name !== 'string' || name !== name.trim()) fail('Nombre de contexto invalido.')
    const message = contextError(name, seen)
    if (message) fail(message)
    seen.push(name)
  })
  const contextMappings = data.contextMappings ?? { MENU: data.mappings, GAMEPLAY: {} }
  if (!isRecord(contextMappings)) fail('Contextos invalidos.')
  Object.entries(contextMappings).forEach(([context, mappings]) => {
    if (!contexts.includes(context)) fail('Hay asociaciones de un contexto no declarado.')
    validateMappings(mappings)
  })
  const deviceMappings = data.deviceMappings ?? {}
  if (!isRecord(deviceMappings)) fail('Asociaciones de dispositivo invalidas.')
  Object.entries(deviceMappings).forEach(([context, devices]) => {
    if (!contexts.includes(context) || !isRecord(devices)) fail('Contexto de dispositivo invalido.')
    Object.entries(devices).forEach(([device, mappings]) => {
      if (!deviceIds.includes(device)) fail('Dispositivo no compatible.')
      validateMappings(mappings)
    })
  })
  for (const key of ['buttonSideOverrides', 'customOrder']) {
    if (data[key] !== undefined && !isRecord(data[key])) fail('Configuracion de orden invalida.')
  }
  if (Object.values(data.buttonSideOverrides || {}).some(side => !['left', 'right'].includes(side))) {
    fail('Los lados deben ser left o right.')
  }
  if (Object.values(data.customOrder || {}).some(order => typeof order !== 'number' || !Number.isFinite(order))) {
    fail('El orden debe contener numeros finitos.')
  }
  return { controller, contexts, contextMappings, deviceMappings,
    buttonSideOverrides: data.buttonSideOverrides || {}, customOrder: data.customOrder || {} }
}
