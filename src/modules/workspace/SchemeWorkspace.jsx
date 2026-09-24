import { useState } from 'react'
import WorkspaceHeader from './WorkspaceHeader'
import ControllerStage from '../controllers/ControllerStage'
import MappingPanel from '../mappings/MappingPanel'
import ActionDialog from '../mappings/ActionDialog'
import ContextDialog from '../contexts/ContextDialog'
import ImportDialog from '../import/ImportDialog'
import ExportDialog from '../export/ExportDialog'
import useControlSelection from './useControlSelection'
import { getControllerConfig } from '../controllers/registry'
import './workspace.css'

export default function SchemeWorkspace({ scheme }) {
  const [modal, setModal] = useState(null)
  const selection = useControlSelection()
  const { data, currentContext, mappings } = scheme
  const controller = getControllerConfig(data.controller)
  const close = () => { setModal(null); selection.hover(null) }
  const edit = control => { selection.select(control.id); setModal({ type: 'action', control }) }
  const changeContext = value => { selection.clear(); scheme.setCurrentContext(value) }
  const changeDevice = value => { selection.clear(); scheme.setController(value) }
  return <div className="workspace">
    <WorkspaceHeader contexts={data.contexts} context={currentContext} device={data.controller}
      onContextChange={changeContext} onDeviceChange={changeDevice}
      onCreate={() => setModal({ type: 'context' })}
      onImport={() => setModal({ type: 'import' })} onExport={() => setModal({ type: 'export' })} />
    <main className="workspace-body">
      <ControllerStage controller={controller} mappings={mappings} selection={selection} onEdit={edit} />
      <MappingPanel controller={controller.id} controls={controller.buttons} context={currentContext} mappings={mappings}
        selection={selection} onEdit={edit} />
    </main>
    {modal?.type === 'context' && <ContextDialog contexts={data.contexts} onClose={close}
      onCreate={name => { selection.clear(); scheme.addContext(name); close() }} />}
    {modal?.type === 'action' && <ActionDialog control={modal.control} context={currentContext}
      mapping={mappings[modal.control.id]} onClose={close}
      onSave={mapping => { scheme.saveMapping(modal.control, mapping); close() }} />}
    {modal?.type === 'import' && <ImportDialog onClose={close}
      onApply={next => { scheme.applyImport(next); selection.clear(); close() }} />}
    {modal?.type === 'export' && <ExportDialog data={data} context={currentContext} onClose={close} />}
  </div>
}
