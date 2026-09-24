// Source artwork is trusted local SVG. Give each rendered instance unique fragment IDs.
export function scopeArtwork(markup, prefix) {
  const ids = new Map([...markup.matchAll(/\sid="([^"]+)"/g)].map(match => [match[1], prefix + '-' + match[1]]))
  return markup
    .replace(/\sid="([^"]+)"/g, (_, id) => ' id="' + ids.get(id) + '"')
    .replace(/url\(#([^)]+)\)/g, (value, id) => ids.has(id) ? 'url(#' + ids.get(id) + ')' : value)
    .replace(/((?:xlink:)?href=")#([^"]+)"/g, (value, attr, id) => ids.has(id) ? attr + '#' + ids.get(id) + '"' : value)
    .replace(/aria-labelledby="([^"]+)"/g, (_, value) =>
      'aria-labelledby="' + value.split(/\s+/).map(id => ids.get(id) || id).join(' ') + '"')
}
