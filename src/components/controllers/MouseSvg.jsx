import { forwardRef, useEffect, useRef } from 'react'
import mouseMarkup from '../../../controllers/mouse.svg?raw'

const inlineMouseMarkup = mouseMarkup.replace(/<\?xml[^>]*\?>/, '')

const MouseSvg = forwardRef(function MouseSvg({ mappings = {}, selectedButton, onButtonClick, className = '', style }, forwardedRef) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.querySelectorAll('[data-button-id]').forEach((element) => {
      const id = element.dataset.buttonId
      element.classList.toggle('has-mapping', Boolean(mappings[id]))
      element.classList.toggle('selected', selectedButton === id)
    })
  }, [mappings, selectedButton])

  useEffect(() => {
    const root = rootRef.current
    if (!root || !onButtonClick) return

    const handleClick = (event) => {
      const element = event.target.closest('[data-button-id]')
      if (!element || !root.contains(element)) return

      const id = element.dataset.buttonId
      onButtonClick(id, { id }, event)
    }

    root.addEventListener('click', handleClick)
    return () => root.removeEventListener('click', handleClick)
  }, [onButtonClick])

  const setRef = (node) => {
    rootRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }

  return (
    <div
      ref={setRef}
      className={`mouse-svg ${className}`.trim()}
      style={style}
      role="img"
      aria-label="Mouse"
      dangerouslySetInnerHTML={{ __html: inlineMouseMarkup }}
    />
  )
})

export default MouseSvg
