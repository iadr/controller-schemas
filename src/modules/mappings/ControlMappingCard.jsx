import { useEffect, useRef } from 'react'
import { controlName } from '../controllers/controlName'
import ActionEventRow from './ActionEventRow'
import './card.css'

export default function ControlMappingCard({ control, visible, events, selected, hovered, onSelect, onHover, onEdit }) {
  const ref = useRef(null)
  useEffect(() => {
    if (selected) ref.current?.scrollIntoView({ block: 'nearest' })
  }, [selected])
  return <article ref={ref} className={'mapping-card' + (selected ? ' is-selected' : '') + (hovered ? ' is-hovered' : '')}
    onMouseEnter={() => onHover(true)} onMouseLeave={() => onHover(false)}
    onFocus={() => onHover(true)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) onHover(false) }}>
    <button className="mapping-card-heading" aria-pressed={selected} onClick={onSelect}>
      <strong>{controlName(control)}</strong>
      <span>{control.type === 'stick' ? 'Stick' : 'Boton'} / {events.length} acciones</span>
    </button>
    {!visible && <p className="mapping-card-empty">No visible en este dibujo</p>}
    {events.length ? events.map((event, index) => <ActionEventRow key={index} event={event} />)
      : <p className="mapping-card-empty">Sin acciones</p>}
    <button className="ui-button mapping-card-edit" onClick={onEdit}
      aria-label={'Editar acciones de ' + controlName(control)}>Editar acciones</button>
  </article>
}
