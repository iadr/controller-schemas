import { forwardRef, useEffect, useRef } from 'react'
import switchMarkup from '../../../controllers/switch.svg?raw'
import joyConMarkup from '../../../controllers/switch_joycon_processed.svg?raw'

const inlineJoyConMarkup = joyConMarkup.replace(/<\?xml[^>]*\?>|<!DOCTYPE[^>]*>/g, '')

const inlineSwitchMarkup = switchMarkup.replace(/<\?xml[^>]*\?>/, '')

const SwitchSvg = forwardRef(function SwitchSvg({ variant = 'switch', mappings = {}, selectedButton, onButtonClick, className = '', style }, forwardedRef) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    root.querySelectorAll('[data-button-id]').forEach((element) => {
      const id = element.dataset.buttonId
      element.classList.toggle('has-mapping', Boolean(mappings[id]))
      element.classList.toggle('selected', selectedButton === id)
    })
  }, [mappings, selectedButton, variant])

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
      className={`switch-svg ${className}`.trim()}
      style={style}
      role="img"
      aria-label={variant === 'joycon' ? 'Nintendo Switch Joy-Con (L)' : 'Nintendo Switch Controller'}
      dangerouslySetInnerHTML={{ __html: variant === 'joycon' ? inlineJoyConMarkup : inlineSwitchMarkup }}
    />
  )
})

export default SwitchSvg
