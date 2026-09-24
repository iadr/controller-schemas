import ControlMappingCard from './ControlMappingCard'
import { getGestures } from './model/gestures'
import './panel.css'
import { artworkControls } from '../controllers/artwork'

export default function MappingPanel({ controller, controls, context, mappings, selection, onEdit }) {
  const mappedControls = controls.filter(control => getGestures(mappings[control.id]).length > 0)
  return <aside className="mapping-panel" tabIndex={-1} aria-labelledby="mapping-title">
    <div className="mapping-panel-heading">
      <h2 id="mapping-title">Asociaciones</h2><span title={context}>{context}</span>
    </div>
    <div className="mapping-panel-list">
      {mappedControls.length ? mappedControls.map(control => <ControlMappingCard key={control.id} control={control}
        visible={artworkControls[controller]?.has(control.id)} events={getGestures(mappings[control.id])} selected={selection.selected === control.id}
        hovered={selection.hovered === control.id} onSelect={() => selection.select(control.id)}
        onHover={value => selection.hover(value ? control.id : null)} onEdit={() => onEdit(control)} />)
        : <p className="ui-muted">Sin asociaciones. Pulsa un control del dibujo para agregar un mapeo.</p>}
    </div>
  </aside>
}
