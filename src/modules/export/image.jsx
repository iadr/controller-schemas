import { toPng } from 'html-to-image'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import ControllerExportView from './ControllerExportView'
import download from './download'

export async function exportControllerToImage(
  controller, context, mappings, buttonSideOverrides = {}, customOrder = {}, showLines = false,
) {
  const container = document.createElement('div')
  Object.assign(container.style, { position: 'absolute', left: '-9999px', top: '0', width: '1800px' })
  document.body.appendChild(container)
  const root = createRoot(container)
  try {
    flushSync(() => root.render(<ControllerExportView controller={controller} context={context}
      mappings={mappings} buttonSideOverrides={buttonSideOverrides} customOrder={customOrder}
      showLines={showLines} />))
    await document.fonts.ready
    // Allow the connection hook (200 ms) and SVG layout to settle.
    await new Promise(resolve => setTimeout(resolve, 300))
    const dataUrl = await toPng(container.firstChild, {
      pixelRatio: 2, backgroundColor: '#ffffff', width: 1800,
      height: container.firstChild.offsetHeight, skipFonts: true,
    })
    download(dataUrl, controller + '-' + context + '-mapping.png')
  } finally {
    root.unmount()
    container.remove()
  }
}
