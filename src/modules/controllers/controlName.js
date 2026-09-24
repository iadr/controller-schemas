const names = {
  dPad: 'Cruceta', dPadUp: 'Cruceta arriba', dPadDown: 'Cruceta abajo',
  dPadLeft: 'Cruceta izquierda', dPadRight: 'Cruceta derecha',
  start: 'Menu', select: 'Vista',
}
export function controlName(control) {
  if (!control) return ''
  if (/^(bi |fa[srb]? )/.test(control.label || '')) return names[control.id] || control.id
  return control.label || control.id
}
