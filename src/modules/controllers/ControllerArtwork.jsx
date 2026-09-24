import { forwardRef } from 'react'
import ControllerSvg from './ControllerSvg'
import { artwork } from './artwork'

// Use the source viewBoxes to give keyboard and mouse the same scale.
function bounds(id) {
  const values = artwork[id].match(/viewBox=["']([^"']+)/)?.[1].trim().split(/[ ,]+/).map(Number)
  return values ? { width: values[2], height: values[3] } : { width: 1, height: 1 }
}
const keyboard = bounds('keyboard')
const mouse = bounds('mouse')
const width = Math.max(keyboard.width, mouse.width)
const height = keyboard.height + mouse.height
const ControllerArtwork = forwardRef(function ControllerArtwork({ controller, ...props }, ref) {
  if (controller === 'keyboardmouse') {
    return <div ref={ref} className="keyboard-mouse-export">
      <svg viewBox={'0 0 ' + width + ' ' + height} width="100%" height="100%" aria-label="Keyboard & Mouse">
        <foreignObject x={(width - keyboard.width) / 2} y="0" width={keyboard.width} height={keyboard.height}>
          <ControllerSvg controller="keyboard" {...props} />
        </foreignObject>
        <foreignObject x={(width - mouse.width) / 2} y={keyboard.height} width={mouse.width} height={mouse.height}>
          <ControllerSvg controller="mouse" {...props} />
        </foreignObject>
      </svg>
    </div>
  }
  return <ControllerSvg ref={ref} controller={controller} {...props} />
})
export default ControllerArtwork
