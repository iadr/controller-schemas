import { useLayoutEffect, useState } from 'react'
export default function useGuideLines(containerRef, buttons, mappings, order, sides) {
  const [layout, setLayout] = useState({ width: 0, height: 0, lines: [] })
  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return
    const update = () => {
      const bounds = container.getBoundingClientRect()
      const markers = [...container.querySelectorAll('[data-button-id]')]
      const rows = [...container.querySelectorAll('[data-list-button]')]
      const lines = buttons.flatMap(button => {
        const marker = markers.find(item => item.dataset.buttonId === button.id)
        const row = rows.find(item => item.dataset.listButton === button.id)
        if (!marker || !row) return []
        const a = marker.getBoundingClientRect()
        const b = row.getBoundingClientRect()
        return [{ id: button.id, x1: a.left - bounds.left + a.width / 2,
          y1: a.top - bounds.top + a.height / 2,
          x2: (b.left < a.left ? b.right : b.left) - bounds.left,
          y2: b.top - bounds.top + b.height / 2 }]
      })
      setLayout({ width: bounds.width, height: bounds.height, lines })
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(container)
    container.querySelectorAll('.controller-artwork, .mappings-list-container').forEach(node => observer.observe(node))
    window.addEventListener('resize', update)
    return () => { observer.disconnect(); window.removeEventListener('resize', update) }
  }, [containerRef, buttons, mappings, order, sides])
  return layout
}
