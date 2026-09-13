import { forwardRef, useEffect, useRef } from 'react'
import { artwork } from './artwork'
import { getControllerConfig } from './registry'
import { getButtonMapping } from '../mappings/model/buttonMatching'

const ControllerSvg = forwardRef(function ControllerSvg({
  controller, mappings = {}, selectedButton, onButtonClick, className = '', style,
}, forwardedRef) {
  const rootRef = useRef(null)
  const config = getControllerConfig(controller)
  const markup = artwork[controller]
  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    root.querySelectorAll('[data-button-id]').forEach(element => {
      const id = element.dataset.buttonId
      const button = config.buttons.find(item => item.id === id)
      element.classList.toggle('has-mapping', Boolean(getButtonMapping(button, mappings)))
      element.classList.toggle('selected', selectedButton === id)
    })
  }, [markup, config, mappings, selectedButton])
  const setRef = node => {
    rootRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }
  const handleClick = event => {
    const element = event.target.closest('[data-button-id]')
    if (!element || !event.currentTarget.contains(element)) return
    const button = config.buttons.find(item => item.id === element.dataset.buttonId)
    if (button) onButtonClick?.(button.id, button, event)
  }
  const prefix = controller === 'joycon' ? 'switch' : controller
  return <div ref={setRef} className={[prefix + '-svg', className].filter(Boolean).join(' ')}
    style={style} role="img" aria-label={config.name} onClick={handleClick}
    dangerouslySetInnerHTML={{ __html: markup || '' }} />
})
export default ControllerSvg
