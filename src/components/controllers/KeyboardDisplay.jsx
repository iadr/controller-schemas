function KeyboardDisplay({ mappings, onButtonClick, selectedButton }) {
  const keyboardLayout = [
    // Row 1
    { id: 'Esc', x: 2, y: 5, width: 3, height: 3, label: 'Esc', shape: 'rect', borderRadius: 0.5 },
    { id: 'F1', x: 8, y: 5, width: 3, height: 3, label: 'F1', shape: 'rect', borderRadius: 0.5 },
    { id: 'F2', x: 12, y: 5, width: 3, height: 3, label: 'F2', shape: 'rect', borderRadius: 0.5 },
    { id: 'F3', x: 16, y: 5, width: 3, height: 3, label: 'F3', shape: 'rect', borderRadius: 0.5 },
    { id: 'F4', x: 20, y: 5, width: 3, height: 3, label: 'F4', shape: 'rect', borderRadius: 0.5 },
    { id: 'F5', x: 25, y: 5, width: 3, height: 3, label: 'F5', shape: 'rect', borderRadius: 0.5 },
    { id: 'F6', x: 29, y: 5, width: 3, height: 3, label: 'F6', shape: 'rect', borderRadius: 0.5 },
    { id: 'F7', x: 33, y: 5, width: 3, height: 3, label: 'F7', shape: 'rect', borderRadius: 0.5 },
    { id: 'F8', x: 37, y: 5, width: 3, height: 3, label: 'F8', shape: 'rect', borderRadius: 0.5 },
    { id: 'F9', x: 42, y: 5, width: 3, height: 3, label: 'F9', shape: 'rect', borderRadius: 0.5 },
    { id: 'F10', x: 46, y: 5, width: 3, height: 3, label: 'F10', shape: 'rect', borderRadius: 0.5 },
    { id: 'F11', x: 50, y: 5, width: 3, height: 3, label: 'F11', shape: 'rect', borderRadius: 0.5 },
    { id: 'F12', x: 54, y: 5, width: 3, height: 3, label: 'F12', shape: 'rect', borderRadius: 0.5 },
    
    // Row 2 - Numbers
    { id: '`', x: 2, y: 12, width: 3, height: 3, label: '`', shape: 'rect', borderRadius: 0.5 },
    { id: '1', x: 6, y: 12, width: 3, height: 3, label: '1', shape: 'rect', borderRadius: 0.5 },
    { id: '2', x: 10, y: 12, width: 3, height: 3, label: '2', shape: 'rect', borderRadius: 0.5 },
    { id: '3', x: 14, y: 12, width: 3, height: 3, label: '3', shape: 'rect', borderRadius: 0.5 },
    { id: '4', x: 18, y: 12, width: 3, height: 3, label: '4', shape: 'rect', borderRadius: 0.5 },
    { id: '5', x: 22, y: 12, width: 3, height: 3, label: '5', shape: 'rect', borderRadius: 0.5 },
    { id: '6', x: 26, y: 12, width: 3, height: 3, label: '6', shape: 'rect', borderRadius: 0.5 },
    { id: '7', x: 30, y: 12, width: 3, height: 3, label: '7', shape: 'rect', borderRadius: 0.5 },
    { id: '8', x: 34, y: 12, width: 3, height: 3, label: '8', shape: 'rect', borderRadius: 0.5 },
    { id: '9', x: 38, y: 12, width: 3, height: 3, label: '9', shape: 'rect', borderRadius: 0.5 },
    { id: '0', x: 42, y: 12, width: 3, height: 3, label: '0', shape: 'rect', borderRadius: 0.5 },
    { id: '-', x: 46, y: 12, width: 3, height: 3, label: '-', shape: 'rect', borderRadius: 0.5 },
    { id: '=', x: 50, y: 12, width: 3, height: 3, label: '=', shape: 'rect', borderRadius: 0.5 },
    { id: 'Backspace', x: 54, y: 12, width: 5, height: 3, label: '←', shape: 'rect', borderRadius: 0.5 },
    
    // Row 3 - QWERTY
    { id: 'Tab', x: 2, y: 17, width: 4, height: 3, label: 'Tab', shape: 'rect', borderRadius: 0.5 },
    { id: 'Q', x: 7, y: 17, width: 3, height: 3, label: 'Q', shape: 'rect', borderRadius: 0.5 },
    { id: 'W', x: 11, y: 17, width: 3, height: 3, label: 'W', shape: 'rect', borderRadius: 0.5 },
    { id: 'E', x: 15, y: 17, width: 3, height: 3, label: 'E', shape: 'rect', borderRadius: 0.5 },
    { id: 'R', x: 19, y: 17, width: 3, height: 3, label: 'R', shape: 'rect', borderRadius: 0.5 },
    { id: 'T', x: 23, y: 17, width: 3, height: 3, label: 'T', shape: 'rect', borderRadius: 0.5 },
    { id: 'Y', x: 27, y: 17, width: 3, height: 3, label: 'Y', shape: 'rect', borderRadius: 0.5 },
    { id: 'U', x: 31, y: 17, width: 3, height: 3, label: 'U', shape: 'rect', borderRadius: 0.5 },
    { id: 'I', x: 35, y: 17, width: 3, height: 3, label: 'I', shape: 'rect', borderRadius: 0.5 },
    { id: 'O', x: 39, y: 17, width: 3, height: 3, label: 'O', shape: 'rect', borderRadius: 0.5 },
    { id: 'P', x: 43, y: 17, width: 3, height: 3, label: 'P', shape: 'rect', borderRadius: 0.5 },
    { id: '[', x: 47, y: 17, width: 3, height: 3, label: '[', shape: 'rect', borderRadius: 0.5 },
    { id: ']', x: 51, y: 17, width: 3, height: 3, label: ']', shape: 'rect', borderRadius: 0.5 },
    { id: '\\', x: 55, y: 17, width: 4, height: 3, label: '\\', shape: 'rect', borderRadius: 0.5 },
    
    // Row 4 - ASDF
    { id: 'CapsLock', x: 2, y: 22, width: 5, height: 3, label: 'Caps', shape: 'rect', borderRadius: 0.5 },
    { id: 'A', x: 8, y: 22, width: 3, height: 3, label: 'A', shape: 'rect', borderRadius: 0.5 },
    { id: 'S', x: 12, y: 22, width: 3, height: 3, label: 'S', shape: 'rect', borderRadius: 0.5 },
    { id: 'D', x: 16, y: 22, width: 3, height: 3, label: 'D', shape: 'rect', borderRadius: 0.5 },
    { id: 'F', x: 20, y: 22, width: 3, height: 3, label: 'F', shape: 'rect', borderRadius: 0.5 },
    { id: 'G', x: 24, y: 22, width: 3, height: 3, label: 'G', shape: 'rect', borderRadius: 0.5 },
    { id: 'H', x: 28, y: 22, width: 3, height: 3, label: 'H', shape: 'rect', borderRadius: 0.5 },
    { id: 'J', x: 32, y: 22, width: 3, height: 3, label: 'J', shape: 'rect', borderRadius: 0.5 },
    { id: 'K', x: 36, y: 22, width: 3, height: 3, label: 'K', shape: 'rect', borderRadius: 0.5 },
    { id: 'L', x: 40, y: 22, width: 3, height: 3, label: 'L', shape: 'rect', borderRadius: 0.5 },
    { id: ';', x: 44, y: 22, width: 3, height: 3, label: ';', shape: 'rect', borderRadius: 0.5 },
    { id: '\'', x: 48, y: 22, width: 3, height: 3, label: '\'', shape: 'rect', borderRadius: 0.5 },
    { id: 'Enter', x: 52, y: 22, width: 7, height: 3, label: 'Enter', shape: 'rect', borderRadius: 0.5 },
    
    // Row 5 - ZXCV
    { id: 'Shift', x: 2, y: 27, width: 7, height: 3, label: 'Shift', shape: 'rect', borderRadius: 0.5 },
    { id: 'Z', x: 10, y: 27, width: 3, height: 3, label: 'Z', shape: 'rect', borderRadius: 0.5 },
    { id: 'X', x: 14, y: 27, width: 3, height: 3, label: 'X', shape: 'rect', borderRadius: 0.5 },
    { id: 'C', x: 18, y: 27, width: 3, height: 3, label: 'C', shape: 'rect', borderRadius: 0.5 },
    { id: 'V', x: 22, y: 27, width: 3, height: 3, label: 'V', shape: 'rect', borderRadius: 0.5 },
    { id: 'B', x: 26, y: 27, width: 3, height: 3, label: 'B', shape: 'rect', borderRadius: 0.5 },
    { id: 'N', x: 30, y: 27, width: 3, height: 3, label: 'N', shape: 'rect', borderRadius: 0.5 },
    { id: 'M', x: 34, y: 27, width: 3, height: 3, label: 'M', shape: 'rect', borderRadius: 0.5 },
    { id: ',', x: 38, y: 27, width: 3, height: 3, label: ',', shape: 'rect', borderRadius: 0.5 },
    { id: '.', x: 42, y: 27, width: 3, height: 3, label: '.', shape: 'rect', borderRadius: 0.5 },
    { id: '/', x: 46, y: 27, width: 3, height: 3, label: '/', shape: 'rect', borderRadius: 0.5 },
    { id: 'RShift', x: 50, y: 27, width: 9, height: 3, label: 'Shift', shape: 'rect', borderRadius: 0.5 },
    
    // Row 6 - Bottom
    { id: 'Ctrl', x: 2, y: 32, width: 4, height: 3, label: 'Ctrl', shape: 'rect', borderRadius: 0.5 },
    { id: 'Win', x: 7, y: 32, width: 3, height: 3, label: 'Win', shape: 'rect', borderRadius: 0.5 },
    { id: 'Alt', x: 11, y: 32, width: 3, height: 3, label: 'Alt', shape: 'rect', borderRadius: 0.5 },
    { id: 'Space', x: 15, y: 32, width: 20, height: 3, label: 'Space', shape: 'rect', borderRadius: 0.5 },
    { id: 'RAlt', x: 36, y: 32, width: 3, height: 3, label: 'Alt', shape: 'rect', borderRadius: 0.5 },
    { id: 'Fn', x: 40, y: 32, width: 3, height: 3, label: 'Fn', shape: 'rect', borderRadius: 0.5 },
    { id: 'Menu', x: 44, y: 32, width: 3, height: 3, label: '☰', shape: 'rect', borderRadius: 0.5 },
    { id: 'RCtrl', x: 48, y: 32, width: 4, height: 3, label: 'Ctrl', shape: 'rect', borderRadius: 0.5 },
    
    // Arrow Keys
    { id: 'ArrowUp', x: 64, y: 27, width: 3, height: 3, label: '↑', shape: 'rect', borderRadius: 0.5 },
    { id: 'ArrowLeft', x: 60, y: 32, width: 3, height: 3, label: '←', shape: 'rect', borderRadius: 0.5 },
    { id: 'ArrowDown', x: 64, y: 32, width: 3, height: 3, label: '↓', shape: 'rect', borderRadius: 0.5 },
    { id: 'ArrowRight', x: 68, y: 32, width: 3, height: 3, label: '→', shape: 'rect', borderRadius: 0.5 }
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
            onClick={() => onButtonClick(key.id, key)}
            style={{
              position: 'absolute',
              left: `${key.x}%`,
              top: `${key.y}%`,
              width: `${key.width}%`,
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
