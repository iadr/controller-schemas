import './event-row.css'
export const eventNames = { press: 'Pulsar', hold: 'Mantener', direction: 'Direccion', action: 'Accion' }

export default function ActionEventRow({ event }) {
  return <div className="action-event-row">
    <strong>{eventNames[event.type] || event.type}</strong>
    {event.description && <span>{event.description}</span>}
    <p>{event.action}</p>
  </div>
}
