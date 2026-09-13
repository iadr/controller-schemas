import { forwardRef } from 'react'
import ControllerSvg from './ControllerSvg'
const ControllerArtwork = forwardRef(function ControllerArtwork({ controller, ...props }, ref) {
  if (controller === 'keyboardmouse') {
    return <div ref={ref} className="keyboard-mouse-export">
      <ControllerSvg controller="keyboard" {...props} />
      <ControllerSvg controller="mouse" {...props} />
    </div>
  }
  return <ControllerSvg ref={ref} controller={controller} {...props} />
})
export default ControllerArtwork
