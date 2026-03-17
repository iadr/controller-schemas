function KeyboardDisplay({ mappings, onButtonClick, selectedButton }) {
  const keyboardLayout = [
    // Row 1
    { id: 'Esc', x: 2, y: 5, w: 3, label: 'Esc' },
    { id: 'F1', x: 8, y: 5, w: 3, label: 'F1' },
    { id: 'F2', x: 12, y: 5, w: 3, label: 'F2' },
    { id: 'F3', x: 16, y: 5, w: 3, label: 'F3' },
    { id: 'F4', x: 20, y: 5, w: 3, label: 'F4' },
    { id: 'F5', x: 25, y: 5, w: 3, label: 'F5' },
    { id: 'F6', x: 29, y: 5, w: 3, label: 'F6' },
    { id: 'F7', x: 33, y: 5, w: 3, label: 'F7' },
    { id: 'F8', x: 37, y: 5, w: 3, label: 'F8' },
    { id: 'F9', x: 42, y: 5, w: 3, label: 'F9' },
    { id: 'F10', x: 46, y: 5, w: 3, label: 'F10' },
    { id: 'F11', x: 50, y: 5, w: 3, label: 'F11' },
    { id: 'F12', x: 54, y: 5, w: 3, label: 'F12' },
    
    // Row 2 - Numbers
    { id: '`', x: 2, y: 12, w: 3, label: '`' },
    { id: '1', x: 6, y: 12, w: 3, label: '1' },
    { id: '2', x: 10, y: 12, w: 3, label: '2' },
    { id: '3', x: 14, y: 12, w: 3, label: '3' },
    { id: '4', x: 18, y: 12, w: 3, label: '4' },
    { id: '5', x: 22, y: 12, w: 3, label: '5' },
    { id: '6', x: 26, y: 12, w: 3, label: '6' },
    { id: '7', x: 30, y: 12, w: 3, label: '7' },
    { id: '8', x: 34, y: 12, w: 3, label: '8' },
    { id: '9', x: 38, y: 12, w: 3, label: '9' },
    { id: '0', x: 42, y: 12, w: 3, label: '0' },
    { id: '-', x: 46, y: 12, w: 3, label: '-' },
    { id: '=', x: 50, y: 12, w: 3, label: '=' },
    { id: 'Backspace', x: 54, y: 12, w: 5, label: '←' },
    
    // Row 3 - QWERTY
    { id: 'Tab', x: 2, y: 17, w: 4, label: 'Tab' },
    { id: 'Q', x: 7, y: 17, w: 3, label: 'Q' },
    { id: 'W', x: 11, y: 17, w: 3, label: 'W' },
    { id: 'E', x: 15, y: 17, w: 3, label: 'E' },
    { id: 'R', x: 19, y: 17, w: 3, label: 'R' },
    { id: 'T', x: 23, y: 17, w: 3, label: 'T' },
    { id: 'Y', x: 27, y: 17, w: 3, label: 'Y' },
    { id: 'U', x: 31, y: 17, w: 3, label: 'U' },
    { id: 'I', x: 35, y: 17, w: 3, label: 'I' },
    { id: 'O', x: 39, y: 17, w: 3, label: 'O' },
    { id: 'P', x: 43, y: 17, w: 3, label: 'P' },
    { id: '[', x: 47, y: 17, w: 3, label: '[' },
    { id: ']', x: 51, y: 17, w: 3, label: ']' },
    { id: '\\', x: 55, y: 17, w: 4, label: '\\' },
    
    // Row 4 - ASDF
    { id: 'CapsLock', x: 2, y: 22, w: 5, label: 'Caps' },
    { id: 'A', x: 8, y: 22, w: 3, label: 'A' },
    { id: 'S', x: 12, y: 22, w: 3, label: 'S' },
    { id: 'D', x: 16, y: 22, w: 3, label: 'D' },
    { id: 'F', x: 20, y: 22, w: 3, label: 'F' },
    { id: 'G', x: 24, y: 22, w: 3, label: 'G' },
    { id: 'H', x: 28, y: 22, w: 3, label: 'H' },
    { id: 'J', x: 32, y: 22, w: 3, label: 'J' },
    { id: 'K', x: 36, y: 22, w: 3, label: 'K' },
    { id: 'L', x: 40, y: 22, w: 3, label: 'L' },
    { id: ';', x: 44, y: 22, w: 3, label: ';' },
    { id: '\'', x: 48, y: 22, w: 3, label: '\'' },
    { id: 'Enter', x: 52, y: 22, w: 7, label: 'Enter' },
    
    // Row 5 - ZXCV
    { id: 'Shift', x: 2, y: 27, w: 7, label: 'Shift' },
    { id: 'Z', x: 10, y: 27, w: 3, label: 'Z' },
    { id: 'X', x: 14, y: 27, w: 3, label: 'X' },
    { id: 'C', x: 18, y: 27, w: 3, label: 'C' },
    { id: 'V', x: 22, y: 27, w: 3, label: 'V' },
    { id: 'B', x: 26, y: 27, w: 3, label: 'B' },
    { id: 'N', x: 30, y: 27, w: 3, label: 'N' },
    { id: 'M', x: 34, y: 27, w: 3, label: 'M' },
    { id: ',', x: 38, y: 27, w: 3, label: ',' },
    { id: '.', x: 42, y: 27, w: 3, label: '.' },
    { id: '/', x: 46, y: 27, w: 3, label: '/' },
    { id: 'RShift', x: 50, y: 27, w: 9, label: 'Shift' },
    
    // Row 6 - Bottom
    { id: 'Ctrl', x: 2, y: 32, w: 4, label: 'Ctrl' },
    { id: 'Win', x: 7, y: 32, w: 3, label: 'Win' },
    { id: 'Alt', x: 11, y: 32, w: 3, label: 'Alt' },
    { id: 'Space', x: 15, y: 32, w: 20, label: 'Space' },
    { id: 'RAlt', x: 36, y: 32, w: 3, label: 'Alt' },
    { id: 'Fn', x: 40, y: 32, w: 3, label: 'Fn' },
    { id: 'Menu', x: 44, y: 32, w: 3, label: '☰' },
    { id: 'RCtrl', x: 48, y: 32, w: 4, label: 'Ctrl' },
    
    // Arrow Keys
    { id: 'ArrowUp', x: 64, y: 27, w: 3, label: '↑' },
    { id: 'ArrowLeft', x: 60, y: 32, w: 3, label: '←' },
    { id: 'ArrowDown', x: 64, y: 32, w: 3, label: '↓' },
    { id: 'ArrowRight', x: 68, y: 32, w: 3, label: '→' }
  ]

  return (
    <div style={{ width: '800px', height: '350px', position: 'relative', background: '#2c2c2c', borderRadius: '12px', padding: '20px' }}>
      {keyboardLayout.map(key => {
        const mapping = mappings[key.id]
        const isSelected = selectedButton === key.id
        const hasMapping = !!mapping

        return (
          <div
            key={key.id}
            onClick={() => onButtonClick(key.id)}
            style={{
              position: 'absolute',
              left: `${key.x}%`,
              top: `${key.y}%`,
              width: `${key.w}%`,
              height: '12%',
              background: isSelected ? '#ef4444' : hasMapping ? '#10b981' : '#4b5563',
              border: '2px solid #1f2937',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '0.75rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <div style={{ textAlign: 'center' }}>
              <div>{key.label}</div>
              {mapping && (
                <div style={{ fontSize: '0.6rem', marginTop: '2px', opacity: 0.9 }}>
                  {mapping.action}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default KeyboardDisplay
