import Modal from '../../shared/ui/Modal'
import { getGestures } from './model/gestures'
import MappingEditor from './MappingEditor'
import { controlName } from '../controllers/controlName'

export default function ActionDialog({ control, context, mapping, initialScope, onSave, onClose }) {
  return <Modal title={(getGestures(mapping).length ? 'Editar mapeo de ' : 'Agregar mapeo a ') + controlName(control)} size="action" onClose={onClose}>
    <p className="ui-muted">{context}</p>
    <MappingEditor control={control} mapping={mapping} initialScope={initialScope} onSave={onSave} onCancel={onClose} />
  </Modal>
}
