export function getGestures(mapping) {
  if (!mapping) return []
  if (typeof mapping === 'string') return [{ type: 'action', action: mapping, description: '' }]
  if (mapping.action) {
    return [{ type: mapping.gesture || 'action', action: mapping.action, description: mapping.description || '' }]
  }
  return ['direction', 'press', 'hold'].flatMap(type => {
    const gesture = mapping[type]
    return gesture?.action ? [{ type, action: gesture.action, description: gesture.description || '' }] : []
  })
}
