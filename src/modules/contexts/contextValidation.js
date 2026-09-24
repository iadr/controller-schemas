export function contextError(name, contexts = []) {
  const value = name.trim()
  if (!value) return 'Escribe un nombre.'
  if (value.length > 40) return 'Usa un maximo de 40 caracteres.'
  if (['__proto__', 'prototype', 'constructor'].includes(value.toLowerCase())) return 'Ese nombre esta reservado.'
  if (contexts.some(context => context.toLowerCase() === value.toLowerCase())) return 'Ya existe un contexto con ese nombre.'
  return ''
}
