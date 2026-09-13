import Icon from '../../shared/icons/Icon.jsx'
import { useState } from 'react'

function ContextManager({ contexts, currentContext, onContextChange, onAddContext, onDeleteContext }) {
  const [newContextName, setNewContextName] = useState('')

  const handleAddContext = () => {
    if (newContextName.trim()) {
      onAddContext(newContextName.trim())
      setNewContextName('')
    }
  }

  return (
    <div className="context-manager">
      <h3>Contexts</h3>
      <div className="context-list">
        {contexts.map(context => (
          <div key={context} className="context-item">
            <button
              className={`btn ${currentContext === context ? 'active' : ''}`}
              onClick={() => onContextChange(context)}
            >
              {context}
            </button>
            {contexts.length > 1 && (
              <button
                className="contextDelete btn btn-danger btn-small"
                onClick={() => onDeleteContext(context)}
                title="Delete context"
              >
                <Icon name="trash" />
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="add-context">
        <input
          type="text"
          placeholder="New context name..."
          value={newContextName}
          onChange={(e) => setNewContextName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddContext()}
        />
        <button className="contextAdd btn btn-primary btn-small" onClick={handleAddContext}>
          <Icon name="plus" />
        </button>
      </div>
    </div>
  )
}

export default ContextManager
