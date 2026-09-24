import playstation from '../../../controllers/ps.svg?raw'
import xbox from '../../../controllers/xbox-one.svg?raw'
import switchController from '../../../controllers/switch.svg?raw'
import joycon from '../../../controllers/switch_joycon_processed.svg?raw'
import steamdeck from '../../../controllers/steam-deck_processed.svg?raw'
import keyboard from '../../../controllers/keyboard.svg?raw'
import mouse from '../../../controllers/mouse.svg?raw'
const sources = { playstation, xbox, switch: switchController, joycon, steamdeck, keyboard, mouse }
export const artwork = Object.fromEntries(Object.entries(sources).map(([id, markup]) => [
  id, markup.replace(/<\?xml[^>]*\?>|<!DOCTYPE[^>]*>/g, ''),
]))

export const artworkControls = Object.fromEntries(Object.entries(artwork).map(([id, markup]) => [
  id, new Set([...markup.matchAll(/data-button-id="([^"]+)"/g)].map(match => match[1])),
]))
artworkControls.keyboardmouse = new Set([...artworkControls.keyboard, ...artworkControls.mouse])
