import { useState } from 'react'

export default function useControlSelection() {
  const [selected, select] = useState(null)
  const [hovered, hover] = useState(null)
  const clear = () => { select(null); hover(null) }
  return { selected, select, hovered, hover, clear }
}
