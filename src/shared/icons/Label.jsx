import Icon, { hasIcon } from './Icon'
export const renderLabel = (label) => {
  if (!label) return null
  return hasIcon(label) ? <Icon name={label} /> : label
}
