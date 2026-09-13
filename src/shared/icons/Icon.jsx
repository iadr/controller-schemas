import { BsXbox, BsNintendoSwitch, BsSteam, BsKeyboard, BsDpadFill,
  BsCaretUpFill, BsCaretDownFill, BsCaretLeftFill, BsCaretRightFill,
  BsGearFill, BsThreeDots, BsRecordCircle } from 'react-icons/bs'
import { FaBars, FaClone, FaDownload, FaEdit, FaFileExport, FaFileImport,
  FaGamepad, FaHome, FaImage, FaInfoCircle, FaMinus, FaPlus, FaSpinner,
  FaTimes, FaTrash } from 'react-icons/fa'

const icons = {
  xbox: BsXbox, 'nintendo-switch': BsNintendoSwitch, steam: BsSteam,
  keyboard: BsKeyboard, dpad: BsDpadFill, 'caret-up-fill': BsCaretUpFill,
  'caret-down-fill': BsCaretDownFill, 'caret-left-fill': BsCaretLeftFill,
  'caret-right-fill': BsCaretRightFill, 'gear-fill': BsGearFill,
  'three-dots': BsThreeDots, 'record-circle': BsRecordCircle,
  bars: FaBars, clone: FaClone, download: FaDownload, edit: FaEdit,
  'file-export': FaFileExport, 'file-import': FaFileImport, gamepad: FaGamepad,
  house: FaHome, image: FaImage, 'info-circle': FaInfoCircle,
  minus: FaMinus, plus: FaPlus, spinner: FaSpinner, times: FaTimes, trash: FaTrash,
}
export function getIconName(value = '') {
  return value.match(/(?:bi|fa)-([a-z0-9-]+)/)?.[1] || value
}
export function hasIcon(value) {
  return Boolean(icons[getIconName(value)])
}
export default function Icon({ name = '', className = '', title, spin = false, ...props }) {
  const Component = icons[getIconName(name)]
  if (!Component) return null
  const modifiers = [
    (spin || name.includes('fa-spin')) ? 'icon-spin' : '',
    name.includes('fa-rotate-90') ? 'icon-rotate' : '',
  ].filter(Boolean).join(' ')
  return <Component className={['icon', modifiers, className].filter(Boolean).join(' ')}
    aria-hidden={title ? undefined : true} title={title} focusable="false" {...props} />
}
