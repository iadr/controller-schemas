import { PLAYSTATION_BUTTONS } from './data/playstation'
import { XBOX_BUTTONS } from './data/xbox'
import { SWITCH_BUTTONS } from './data/switch'
import { STEAMDECK_BUTTONS } from './data/steamdeck'
import { JOYCON_BUTTONS } from './data/joycon'
import { KEYBOARD_BUTTONS } from './data/keyboard'
import { MOUSE_BUTTONS } from './data/mouse'

const keyboardMouseButtons = [...KEYBOARD_BUTTONS, ...MOUSE_BUTTONS]
const controller = (id, name, icon, buttons, width) => ({
  id, name, icon, buttons, width, type: 'controller', category: 'Controllers',
})
const registry = {
  playstation: controller('playstation', 'PlayStation Controller', 'gamepad', PLAYSTATION_BUTTONS, 600),
  xbox: controller('xbox', 'Xbox Controller', 'xbox', XBOX_BUTTONS, 600),
  switch: controller('switch', 'Nintendo Switch', 'nintendo-switch', SWITCH_BUTTONS, 600),
  joycon: controller('joycon', 'Nintendo Switch Joy-Con (L)', 'nintendo-switch', JOYCON_BUTTONS, 600),
  steamdeck: controller('steamdeck', 'Steam Deck', 'steam', STEAMDECK_BUTTONS, 700),
  keyboardmouse: controller('keyboardmouse', 'Keyboard & Mouse', 'keyboard', keyboardMouseButtons, 620),
  keyboard: controller('keyboard', 'Keyboard', 'keyboard', KEYBOARD_BUTTONS, 620),
  mouse: controller('mouse', 'Mouse', 'gamepad', MOUSE_BUTTONS, 120),
}
export const AVAILABLE_CONTROLLERS = ['xbox', 'playstation', 'switch', 'joycon', 'steamdeck', 'keyboardmouse'].map(id => registry[id])
const unknown = { name: 'Controller', buttons: [], width: 600 }
export const getControllerConfig = id => registry[id] || unknown
export const getControllerButtons = id => getControllerConfig(id).buttons
