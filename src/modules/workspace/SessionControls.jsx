import ContextSelector from '../contexts/ContextSelector'
import ControllerSelector from '../controllers/ControllerSelector'

export default function SessionControls({ contexts, context, device, onContextChange, onDeviceChange, onCreate }) {
  return <div className="session-controls">
    <ContextSelector contexts={contexts} value={context} onChange={onContextChange} onCreate={onCreate} />
    <ControllerSelector selected={device} onChange={onDeviceChange} />
  </div>
}
