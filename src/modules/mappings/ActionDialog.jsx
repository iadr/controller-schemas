import Modal from '../../shared/ui/Modal'
import MappingEditor from './MappingEditor'
import { controlName } from '../controllers/controlName'

export default function ActionDialog({ control, context, mapping, onSave, onClose }) {
  return <Modal title={'Acciones de ' + controlName(control)} size="action" onClose={onClose}>
    <p className="ui-muted">{context}</p>
    <MappingEditor control={control} mapping={mapping} onSave={onSave} onCancel={onClose} />
  </Modal>
}
