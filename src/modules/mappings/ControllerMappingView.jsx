import { useRef } from 'react'
import ControllerArtwork from '../controllers/ControllerArtwork'
import { getControllerConfig } from '../controllers/registry'
import MappingList from './MappingList'
import { getOrganizedButtons } from './model/organization'
import { useControllerDragDrop } from './hooks/useControllerDragDrop'
import useGuideLines from './hooks/useGuideLines'

export default function ControllerMappingView({
  controller, mappings, selectedButton, onButtonClick,
  buttonSideOverrides, setButtonSideOverrides, customOrder, setCustomOrder,
}) {
  const containerRef = useRef(null)
  const config = getControllerConfig(controller)
  const organized = getOrganizedButtons(config.buttons, mappings, buttonSideOverrides, customOrder)
  const drag = useControllerDragDrop(buttonSideOverrides, setButtonSideOverrides, customOrder, setCustomOrder)
  const layout = useGuideLines(containerRef, config.buttons, mappings, customOrder, buttonSideOverrides)
  const listProps = { ...organized, ...drag, mappings, selectedButton, onButtonClick }
  return <div className="controller-with-list" ref={containerRef}>
    <svg className="guide-lines-svg" width={layout.width} height={layout.height} aria-hidden="true">
      {layout.lines.map(({ id, ...line }) => <line key={id} {...line}
        className={'guide-line' + (selectedButton === id ? ' selected' : '')}
        strokeWidth="2" strokeDasharray="5,5" />)}
    </svg>
    <MappingList {...listProps} buttons={organized.sortedLeftButtons} side="left" title="Left Side" />
    <div className="controller-svg-container controller-artwork" style={{ width: config.width }}>
      <ControllerArtwork controller={controller} mappings={mappings}
        selectedButton={selectedButton} onButtonClick={onButtonClick} />
    </div>
    <MappingList {...listProps} buttons={organized.sortedRightButtons} side="right" title="Right Side" />
  </div>
}
