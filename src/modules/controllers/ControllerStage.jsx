import ControllerArtwork from './ControllerArtwork'
import './stage.css'

export default function ControllerStage({ controller, mappings, selection, onEdit }) {
  return <section className="controller-stage" aria-labelledby="device-title">
    <h2 id="device-title">{controller.name}</h2>
    <div className="controller-stage-art">
      <ControllerArtwork controller={controller.id} mappings={mappings}
        selectedButton={selection.selected} hoveredButton={selection.hovered}
        onButtonHover={selection.hover} onButtonClick={(_id, control) => onEdit(control)} />
    </div>
  </section>
}
