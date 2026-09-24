import { useMemo } from 'react'
import { getControllerConfig } from '../controllers/registry'
import ControllerArtwork from '../controllers/ControllerArtwork'
import { getOrganizedButtons } from '../mappings/model/organization'
import ExportMappingList from './ExportMappingList'
import './export.css'

export default function ControllerExportView({
  controller, context, mappings, buttonSideOverrides = {}, customOrder = {},
}) {
  const config = getControllerConfig(controller)
  const organized = useMemo(() => getOrganizedButtons(config.buttons, mappings, buttonSideOverrides, customOrder),
    [config, mappings, buttonSideOverrides, customOrder])
  return <div className="controller-export-view">
    <h1 className="export-title">{config.name} - {context}</h1>
    <div className="export-content">
      <ExportMappingList side="left" buttons={organized.sortedLeftButtons} mappings={mappings} />
      <div className="export-controller-image"><ControllerArtwork controller={controller} mappings={mappings} /></div>
      <ExportMappingList side="right" buttons={organized.sortedRightButtons} mappings={mappings} />
    </div>
  </div>
}
