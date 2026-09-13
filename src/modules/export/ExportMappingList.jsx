import { renderLabel } from '../../shared/icons/Label'
import { getButtonMapping } from '../mappings/model/buttonMatching'
import { getGestures } from '../mappings/model/gestures'
export default function ExportMappingList({ side, buttons, mappings }) {
  return <div className={'export-mappings-list export-mappings-' + side}>
    <h2>{side === 'left' ? 'Left Side' : 'Right Side'}</h2>
    {buttons.length === 0 ? <div className="no-mappings"><p>No {side} side mappings</p></div> :
      <div className="export-mappings-table">
        {buttons.map(button => <div key={button.id} className="export-mapping-row" data-button-id={button.id}>
          <div className="export-button-name">{renderLabel(button.label)}</div>
          <div className="export-actions">
            {getGestures(getButtonMapping(button, mappings)).map((gesture, index) =>
              <div key={index} className="export-gesture">
                <span className="export-gesture-type">{gesture.type}:</span>
                <span className="export-action-name">{gesture.action}</span>
                {gesture.description && <span className="export-description">({gesture.description})</span>}
              </div>)}
          </div>
        </div>)}
      </div>}
  </div>
}
