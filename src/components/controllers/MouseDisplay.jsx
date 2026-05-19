import { getButtonMapping } from '../../utils/buttonMatching'

function MouseDisplay({ mappings, onButtonClick, selectedButton }) {
  const buttons = [
    { id: 'LeftClick', x: 35, y: 25, width: 20, height: 25, label: 'Left', shape: 'rect', borderRadius: 2, type: 'button' },
    { id: 'RightClick', x: 55, y: 25, width: 20, height: 25, label: 'Right', shape: 'rect', borderRadius: 2, type: 'button' },
    { id: 'MiddleClick', x: 47, y: 20, width: 6, height: 10, label: 'M', shape: 'rect', borderRadius: 3, type: 'button' },
    { id: 'ScrollUp', x: 47, y: 35, width: 6, height: 8, label: '↑', shape: 'rect', borderRadius: 1, type: 'button' },
    { id: 'ScrollDown', x: 47, y: 43, width: 6, height: 8, label: '↓', shape: 'rect', borderRadius: 1, type: 'button' },
    { id: 'Side1', x: 25, y: 45, width: 5, height: 12, label: 'S1', shape: 'rect', borderRadius: 2, type: 'button' },
    { id: 'Side2', x: 25, y: 57, width: 5, height: 12, label: 'S2', shape: 'rect', borderRadius: 2, type: 'button' }
  ]

  return (
    <div style={{ width: '300px', height: '500px', position: 'relative', margin: '0 auto' }}>
      {/* Mouse body */}
      <svg width="100%" height="100%" viewBox="0 0 100 150">
        <defs>
          <linearGradient id="mouseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4b5563', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1f2937', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Main body */}
        <ellipse cx="50" cy="70" rx="28" ry="45" fill="url(#mouseGradient)" stroke="#1f2937" strokeWidth="2"/>
        
        {/* Top curve */}
        <path d="M 22 50 Q 22 20, 50 20 Q 78 20, 78 50" fill="none" stroke="#1f2937" strokeWidth="2"/>
        
        {/* Left button outline */}
        <path d="M 22 50 L 22 30 Q 22 20, 35 20 L 48 20 L 48 35" fill="none" stroke="#1f2937" strokeWidth="2"/>
        
        {/* Right button outline */}
        <path d="M 78 50 L 78 30 Q 78 20, 65 20 L 52 20 L 52 35" fill="none" stroke="#1f2937" strokeWidth="2"/>
        
        {/* Middle button */}
        <rect x="47" y="22" width="6" height="15" rx="3" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
        
        {/* Scroll wheel indicator */}
        <line x1="50" y1="27" x2="50" y2="30" stroke="#6b7280" strokeWidth="1"/>
        <line x1="50" y1="32" x2="50" y2="35" stroke="#6b7280" strokeWidth="1"/>
        
        {/* Side buttons */}
        <rect x="20" y="65" width="4" height="15" rx="2" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
        <rect x="20" y="82" width="4" height="15" rx="2" fill="#374151" stroke="#1f2937" strokeWidth="1.5"/>
      </svg>

      {/* Clickable button overlays */}
      {buttons.map(button => {
        const mapping = getButtonMapping(button, mappings)
        const isSelected = selectedButton === button.id
        const hasMapping = !!mapping

        return (
          <div
            key={button.id}
            onClick={(e) => onButtonClick(button.id, button, e)}
            style={{
              position: 'absolute',
              left: `${button.x}%`,
              top: `${button.y}%`,
              width: `${button.width}%`,
              height: `${button.height}%`,
              background: isSelected ? 'rgba(239, 68, 68, 0.6)' : hasMapping ? 'rgba(16, 185, 129, 0.6)' : 'rgba(75, 85, 99, 0.3)',
              border: `2px solid ${isSelected ? '#ef4444' : hasMapping ? '#10b981' : '#6b7280'}`,
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = isSelected ? 'rgba(239, 68, 68, 0.8)' : hasMapping ? 'rgba(16, 185, 129, 0.8)' : 'rgba(75, 85, 99, 0.5)'}
            onMouseLeave={(e) => e.currentTarget.style.background = isSelected ? 'rgba(239, 68, 68, 0.6)' : hasMapping ? 'rgba(16, 185, 129, 0.6)' : 'rgba(75, 85, 99, 0.3)'}
          >
            <div>{button.label}</div>
            {mapping && (
              <div style={{ fontSize: '0.65rem', marginTop: '2px' }}>
                {mapping.action}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default MouseDisplay
