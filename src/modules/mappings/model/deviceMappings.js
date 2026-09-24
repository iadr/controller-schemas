import { getButtonMapping } from './buttonMatching'
import { getControllerButtons } from '../../controllers/registry'

// Existing ID/position/label mappings remain shared. Device overrides win, including null.
export function getDeviceMappings(scheme, context, controller) {
  const shared = scheme.contextMappings[context] || {}
  const local = scheme.deviceMappings?.[context]?.[controller] || {}
  return Object.fromEntries(getControllerButtons(controller).map(control => [
    control.id, Object.hasOwn(local, control.id) ? local[control.id] : getButtonMapping(control, shared),
  ]))
}
