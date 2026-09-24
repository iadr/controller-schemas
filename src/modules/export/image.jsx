import { toPng } from 'html-to-image'
import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import ControllerExportView from './ControllerExportView'
import download from './download'

export async function exportControllerToImage(
  controller, context, mappings, buttonSideOverrides = {}, customOrder = {}, showLines = false,
  { width = 1920, height = 1080 } = {},
) {
  const container = document.createElement('div')
  Object.assign(container.style, { position: 'absolute', left: '-99999px', top: '0',
    width: width + 'px', height: height + 'px', overflow: 'hidden',
    background: getComputedStyle(document.documentElement).getPropertyValue('--color-surface').trim() })
  const content = document.createElement('div')
  content.style.width = '1800px'
  container.appendChild(content)
  document.body.appendChild(container)
  const root = createRoot(content)
  try {
    flushSync(() => root.render(<ControllerExportView controller={controller} context={context}
      mappings={mappings} buttonSideOverrides={buttonSideOverrides} customOrder={customOrder}
      showLines={showLines} />))
    await document.fonts.ready
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))
    const contentHeight = content.scrollHeight
    const scale = Math.min(width / 1800, height / contentHeight)
    Object.assign(content.style, { transformOrigin: 'top left', transform: 'scale(' + scale + ')',
      position: 'absolute', left: (width - 1800 * scale) / 2 + 'px',
      top: (height - contentHeight * scale) / 2 + 'px' })
    const dataUrl = await toPng(container, { pixelRatio: 1, width, height, skipFonts: true,
      style: { position: 'relative', left: '0', top: '0' } })
    download(dataUrl, controller + '-' + context.replace(/[<>:"/\\|?*]/g, '-') + '-mapping.png')
  } finally {
    root.unmount()
    container.remove()
  }
}
