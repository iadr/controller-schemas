import SessionControls from './SessionControls'
import FileActions from './FileActions'
import './header.css'

export default function WorkspaceHeader(props) {
  return <header className="workspace-header">
    <h1 className="workspace-title">Controller Scheme</h1>
    <SessionControls {...props} />
    <FileActions onImport={props.onImport} onExport={props.onExport} />
  </header>
}
