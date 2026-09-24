import { forwardRef, useEffect, useId, useMemo, useRef } from 'react'
import { artwork } from './artwork'
import { scopeArtwork } from './scopeArtwork'
import { getControllerConfig } from './registry'
import { getButtonMapping } from '../mappings/model/buttonMatching'
import { getGestures } from '../mappings/model/gestures'
import { controlName } from './controlName'

const ControllerSvg = forwardRef(function ControllerSvg({
  controller, mappings = {}, selectedButton, hoveredButton, onButtonClick, onButtonHover,
  className = '', style,
}, forwardedRef) {
  const rootRef = useRef(null)
  const config = getControllerConfig(controller)
  const instanceId = useId().replace(/:/g, '')
  const markup = useMemo(() => scopeArtwork(artwork[controller] || '', instanceId), [controller, instanceId])
  useEffect(() => {
    const root = rootRef.current
    root?.querySelectorAll('svg').forEach(svg => {
      if (onButtonClick) svg.setAttribute('role', 'group')
    })
    root?.querySelectorAll('[data-button-id]').forEach(element => {
      const id = element.dataset.buttonId
      const control = config.buttons.find(item => item.id === id)
      const mapped = getGestures(getButtonMapping(control, mappings)).length > 0
      element.classList.toggle('has-mapping', mapped)
      element.classList.toggle('selected', selectedButton === id)
      element.classList.toggle('hovered', hoveredButton === id)
      if (onButtonClick && control) {
        element.setAttribute('tabindex', '0')
        element.setAttribute('role', 'button')
        element.setAttribute('aria-label', controlName(control) + (mapped ? ': editar mapeo' : ': agregar mapeo'))
        element.setAttribute('aria-pressed', String(selectedButton === id))
      }
    })
  }, [markup, config, mappings, selectedButton, hoveredButton, onButtonClick])
  const setRef = node => {
    rootRef.current = node
    if (typeof forwardedRef === 'function') forwardedRef(node)
    else if (forwardedRef) forwardedRef.current = node
  }
  const region = event => {
    const element = event.target.closest?.('[data-button-id]')
    return element && event.currentTarget.contains(element) ? element : null
  }
  const activate = event => {
    const element = region(event)
    const control = config.buttons.find(item => item.id === element?.dataset.buttonId)
    if (control) {
      element.focus()
      onButtonClick?.(control.id, control, event)
    }
  }
  const highlight = event => onButtonHover?.(region(event)?.dataset.buttonId || null)
  const prefix = controller === 'joycon' ? 'switch' : controller
  return <div ref={setRef} className={'controller-artwork ' + prefix + '-svg ' + className}
    style={style} role={onButtonClick ? 'group' : 'img'} aria-label={config.name}
    onClick={onButtonClick ? activate : undefined}
    onKeyDown={event => {
      if (onButtonClick && region(event) && ['Enter', ' '].includes(event.key)) {
        event.preventDefault()
        activate(event)
      }
    }}
    onMouseOver={highlight} onMouseLeave={() => onButtonHover?.(null)}
    onFocus={highlight} onBlur={() => onButtonHover?.(null)}
    dangerouslySetInnerHTML={{ __html: markup || '' }} />
})
export default ControllerSvg
