import { useEffect, useId, useRef } from 'react'
import './modal.css'

export default function Modal({ title, size = 'file', onClose, children, busy = false }) {
  const ref = useRef(null)
  const titleId = useId()
  useEffect(() => {
    const dialog = ref.current
    const opener = document.activeElement
    dialog.showModal()
    const initial = dialog.querySelector('[data-initial-focus]') || dialog.querySelector('input, select, button')
    initial?.focus()
    return () => {
      dialog.close()
      const fallback = document.querySelector('.mapping-panel')
      if (opener?.isConnected && opener !== document.body) opener.focus()
      else fallback?.focus()
    }
  }, [])
  return <dialog ref={ref} className={'ui-modal ui-modal-' + size} aria-labelledby={titleId}
    aria-busy={busy} onCancel={event => { event.preventDefault(); if (!busy) onClose() }}>
    <div className="ui-modal-heading">
      <h2 id={titleId}>{title}</h2>
      <button type="button" className="ui-button" aria-label="Cerrar modal" disabled={busy} onClick={onClose}>Cerrar</button>
    </div>
    {children}
  </dialog>
}
