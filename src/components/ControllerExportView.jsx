import { useRef, useEffect, useState } from 'react'
import { getControllerConfig } from '../constants/controllers'
import { getOrganizedButtons } from '../utils/controllerDragDrop'
import KeyboardSvg from './controllers/KeyboardSvg'
import MouseSvg from './controllers/MouseSvg'
import XboxSvg from './controllers/XboxSvg'
import SwitchSvg from './controllers/SwitchSvg'

/**
 * Render label for export (SVG icons or text)
 * Uses SVG files from /public/icons for proper rendering in exported images
 */
const renderExportLabel = (label) => {
  if (!label) return null
  
  // Check if it's an icon class - if so, use SVG equivalent
  const isIcon = /^(bi bi-|fa[sbrldt]? fa-|fa )/.test(label)
  
  if (isIcon) {
    // Map icon classes to SVG files in /public/icons
    const iconSvgMap = {
      'bi bi-dpad': 'dpad-fill.svg',
      'bi bi-caret-up-fill': 'caret-up-fill.svg', // Keep Unicode for arrows if no SVG
      'bi bi-caret-down-fill': 'caret-down-fill.svg',
      'bi bi-caret-left-fill': 'caret-left-fill.svg',
      'bi bi-caret-right-fill': 'caret-right-fill.svg',
      'fas fa-bars': 'bars.svg',
      'far fa-clone fa-rotate-90': 'clone-rotated.svg',
      'bi bi-gear-fill': 'gear-fill.svg',
      'bi bi-three-dots': 'three-dots.svg',
      'fas fa-plus': 'plus.svg',
      'fas fa-minus': 'minus.svg',
      'fas fa-house': 'house.svg',
      'bi bi-record-circle': 'record-circle.svg'
    }
    
    const iconValue = iconSvgMap[label]
    
    // If it's an SVG file, render as img element
    if (iconValue && iconValue.endsWith('.svg')) {
      return <img src={`./icons/${iconValue}`} alt={label} className="export-icon-svg" />
    }
    
    // Otherwise return Unicode character or cleaned label
    return iconValue || label.replace(/^(bi bi-|fa[sbrldt]? fa-|fa )/, '')
  }
  
  // Return plain text or Unicode character
  return label
}

/**
 * ControllerExportView - A component optimized for exporting controller mappings as an image
 * Displays the controller image with all mappings organized in lists with connecting lines
 */
function ControllerExportView({ 
  controller, 
  context, 
  mappings, 
  buttonSideOverrides = {}, 
  customOrder = {},
  showLines = true // Boolean to control whether to draw connection lines
}) {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [connections, setConnections] = useState([])

  // Get controller-specific configuration from centralized source
  const config = getControllerConfig(controller)

  // Extract gesture information from mapping
  const getGestures = (mapping) => {
    if (!mapping) return []

    const gestures = []
    
    // Handle new multi-gesture format
    if (typeof mapping === 'object' && !mapping.action) {
      ['direction', 'press', 'hold'].forEach(gestureType => {
        if (mapping[gestureType] && mapping[gestureType].action) {
          gestures.push({
            type: gestureType,
            action: mapping[gestureType].action,
            description: mapping[gestureType].description || ''
          })
        }
      })
    }
    // Handle single-gesture format
    else if (typeof mapping === 'object' && mapping.action) {
      gestures.push({
        type: mapping.gesture || 'action',
        action: mapping.action,
        description: mapping.description || ''
      })
    }
    // Handle legacy string format
    else if (typeof mapping === 'string') {
      gestures.push({
        type: 'action',
        action: mapping,
        description: ''
      })
    }

    return gestures
  }

  // Build list of all mappings in order using the same logic as the controller display
  const { sortedLeftButtons, sortedRightButtons } = getOrganizedButtons(
    config.buttons,
    mappings,
    buttonSideOverrides,
    customOrder
  )
  
  // Combine left and right buttons for line calculations
  const orderedButtons = [...sortedLeftButtons, ...sortedRightButtons]
  
  const leftMappingsList = sortedLeftButtons.map(button => ({
    button,
    gestures: getGestures(mappings[button.id])
  }))
  
  const rightMappingsList = sortedRightButtons.map(button => ({
    button,
    gestures: getGestures(mappings[button.id])
  }))

  // Calculate connection lines after render (only if showLines is enabled)
  useEffect(() => {
    if (!showLines) {
      setConnections([])
      return
    }

    const calculateConnections = () => {
      if (!containerRef.current || !imageRef.current) return

      const containerRect = containerRef.current.getBoundingClientRect()
      const imageRect = imageRef.current.getBoundingClientRect()

      const getButtonRect = (button) => {
        if (controller !== 'keyboard' && controller !== 'keyboardmouse') return null
        const element = Array.from(imageRef.current.querySelectorAll('[data-button-id]'))
          .find((item) => item.dataset.buttonId === button.id)
        return element?.getBoundingClientRect() || null
      }
      
      // Helper: Check if a point is inside a button's bounds
      const isPointInButton = (x, y, button, imageRect, containerRect) => {
        const elementRect = getButtonRect(button)
        if (elementRect) {
          const left = elementRect.left - containerRect.left - 15
          const right = elementRect.right - containerRect.left + 15
          const top = elementRect.top - containerRect.top - 15
          const bottom = elementRect.bottom - containerRect.top + 15
          return x >= left && x <= right && y >= top && y <= bottom
        }

        const btnX = imageRect.left - containerRect.left + (imageRect.width * button.x / 100)
        const btnY = imageRect.top - containerRect.top + (imageRect.height * button.y / 100)
        
        // Calculate button bounds based on shape and size
        const size = button.size || 40
        const width = button.width || size
        const height = button.height || size
        
        // Add generous padding for clearance
        const padding = 15
        const halfWidth = (width / 2) + padding
        const halfHeight = (height / 2) + padding
        
        return x >= btnX - halfWidth && x <= btnX + halfWidth &&
               y >= btnY - halfHeight && y <= btnY + halfHeight
      }
      
      // Helper: Check if line segment intersects any button
      const lineIntersectsButtons = (x1, y1, x2, y2, excludeButtonId, imageRect, containerRect) => {
        // Check many points along the line for better accuracy
        const steps = 30
        for (let i = 0; i <= steps; i++) {
          const t = i / steps
          const x = x1 + (x2 - x1) * t
          const y = y1 + (y2 - y1) * t
          
          for (const btn of config.buttons) {
            if (btn.id === excludeButtonId) continue // Skip source button
            if (isPointInButton(x, y, btn, imageRect, containerRect)) {
              return true
            }
          }
        }
        return false
      }
      
      // Helper: Calculate minimum distance between two line segments
      const distanceBetweenSegments = (seg1, seg2) => {
        let minDist = Infinity
        const steps = 15
        
        for (let i = 0; i <= steps; i++) {
          const t1 = i / steps
          const x1 = seg1.x1 + (seg1.x2 - seg1.x1) * t1
          const y1 = seg1.y1 + (seg1.y2 - seg1.y1) * t1
          
          for (let j = 0; j <= steps; j++) {
            const t2 = j / steps
            const x2 = seg2.x1 + (seg2.x2 - seg2.x1) * t2
            const y2 = seg2.y1 + (seg2.y2 - seg2.y1) * t2
            
            const dist = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
            minDist = Math.min(minDist, dist)
          }
        }
        return minDist
      }
      
      // Calculate routing channel between controller and list
      const controllerRight = imageRect.right - containerRect.left
      const channelStart = controllerRight + 30
      const channelWidth = 150 // Wider channel for more separation
      
      const newConnections = []
      const existingSegments = [] // Track segments to avoid line overlaps
      
      // Use orderedButtons directly to avoid stale closure
      orderedButtons.forEach((button, index) => {
        const buttonId = button.id
        const mapping = mappings[buttonId]
        
        // Skip buttons without mappings
        if (!mapping) return
        
        // Get button position (percentage relative to image)
        const elementRect = getButtonRect(button)
        const buttonX = elementRect
          ? elementRect.left - containerRect.left + elementRect.width / 2
          : imageRect.left - containerRect.left + (imageRect.width * button.x / 100)
        const buttonY = elementRect
          ? elementRect.top - containerRect.top + elementRect.height / 2
          : imageRect.top - containerRect.top + (imageRect.height * button.y / 100)

        // Get mapping row position
        const rowElement = Array.from(containerRef.current.querySelectorAll('.export-mapping-row[data-button-id]'))
          .find((element) => element.dataset.buttonId === buttonId)
        if (!rowElement) return

        const rowRect = rowElement.getBoundingClientRect()
        const rowX = rowRect.left - containerRect.left
        const rowY = rowRect.top - containerRect.top + (rowRect.height / 2)

        // Find waypoint that avoids button overlaps and line overlaps
        let bestWaypoint = null
        let bestScore = -Infinity
        
        // Try more waypoint positions across wider routing channel
        const horizontalSteps = 12 // More horizontal positions
        const verticalSteps = 8 // More vertical positions
        
        for (let channelPos = 0; channelPos < horizontalSteps; channelPos++) {
          const waypointX = channelStart + (channelPos * (channelWidth / horizontalSteps))
          
          // Try multiple vertical positions with more spread
          for (let verticalPos = 0; verticalPos < verticalSteps; verticalPos++) {
            const vertRatio = 0.15 + (verticalPos * 0.1) // More vertical variation
            const waypointY = buttonY + (rowY - buttonY) * vertRatio
            
            // Check if this waypoint creates a path that avoids buttons
            const seg1IntersectsBtn = lineIntersectsButtons(buttonX, buttonY, waypointX, waypointY, buttonId, imageRect, containerRect)
            const seg2IntersectsBtn = lineIntersectsButtons(waypointX, waypointY, waypointX, rowY, buttonId, imageRect, containerRect)
            const seg3IntersectsBtn = lineIntersectsButtons(waypointX, rowY, rowX, rowY, buttonId, imageRect, containerRect)
            
            if (seg1IntersectsBtn || seg2IntersectsBtn || seg3IntersectsBtn) {
              continue // Skip this waypoint, it intersects buttons
            }
            
            // Check minimum distance to existing lines
            const seg1 = { x1: buttonX, y1: buttonY, x2: waypointX, y2: waypointY }
            const seg2 = { x1: waypointX, y1: waypointY, x2: waypointX, y2: rowY }
            const seg3 = { x1: waypointX, y1: rowY, x2: rowX, y2: rowY }
            
            let minDistToExisting = Infinity
            for (const existingSeg of existingSegments) {
              const dist1 = distanceBetweenSegments(seg1, existingSeg)
              const dist2 = distanceBetweenSegments(seg2, existingSeg)
              const dist3 = distanceBetweenSegments(seg3, existingSeg)
              minDistToExisting = Math.min(minDistToExisting, dist1, dist2, dist3)
            }
            
            // Require minimum distance of 15px between lines
            if (minDistToExisting < 15 && existingSegments.length > 0) {
              continue
            }
            
            // Score this waypoint
            const pathLength = Math.sqrt((waypointX - buttonX) ** 2 + (waypointY - buttonY) ** 2) +
                              Math.abs(rowY - waypointY) +
                              Math.abs(rowX - waypointX)
            
            // Heavily favor routes that maximize distance from existing lines
            const separationBonus = minDistToExisting * 5
            const spreadBonus = channelPos * 3 + verticalPos * 4 // Favor spreading out
            const score = -pathLength * 0.5 + separationBonus + spreadBonus
            
            if (score > bestScore) {
              bestScore = score
              bestWaypoint = { x: waypointX, y: waypointY, seg1, seg2, seg3 }
            }
          }
        }
        
        // Fallback if no good waypoint found - use aggressive vertical staggering
        if (!bestWaypoint) {
          const waypointX = channelStart + ((index * 17) % channelWidth)
          const waypointY = buttonY + (rowY - buttonY) * (0.25 + (index % 6) * 0.1)
          bestWaypoint = {
            x: waypointX,
            y: waypointY,
            seg1: { x1: buttonX, y1: buttonY, x2: waypointX, y2: waypointY },
            seg2: { x1: waypointX, y1: waypointY, x2: waypointX, y2: rowY },
            seg3: { x1: waypointX, y1: rowY, x2: rowX, y2: rowY }
          }
        }
        
        // Store segments for future collision checking
        existingSegments.push(bestWaypoint.seg1, bestWaypoint.seg2, bestWaypoint.seg3)
        
        // Create path with angled segments
        const path = `M ${buttonX} ${buttonY} L ${bestWaypoint.x} ${bestWaypoint.y} L ${bestWaypoint.x} ${rowY} L ${rowX} ${rowY}`

        newConnections.push({
          buttonId,
          path,
          startX: buttonX,
          startY: buttonY,
          endX: rowX,
          endY: rowY,
          color: `hsl(${210 + (index * 15) % 60}, 65%, 52%)` // More color variation
        })
      })

      setConnections(newConnections)
    }

    // Calculate after a delay to ensure layout is complete
    const timer = setTimeout(calculateConnections, 200)
    return () => clearTimeout(timer)
  }, [orderedButtons, mappings, config.buttons, showLines])

  return (
    <div className="controller-export-view" ref={containerRef}>
      <div className="export-header">
        <h1>{config.name} - {context}</h1>
      </div>
      
      <div className="export-content">
        {/* Left Side Mappings */}
        <div className="export-mappings-list export-mappings-left">
          <h2>Left Side</h2>
          {leftMappingsList.length === 0 ? (
            <div className="no-mappings">
              <p>No left side mappings</p>
            </div>
          ) : (
            <div className="export-mappings-table">
              {leftMappingsList.map(({ button, gestures }) => (
                <div 
                  key={button.id} 
                  className="export-mapping-row"
                  data-button-id={button.id}
                >
                  <div className="export-button-name">
                    {renderExportLabel(button.label)}
                  </div>
                  <div className="export-actions">
                    {gestures.map((gesture, idx) => (
                      <div key={idx} className="export-gesture">
                        <span className="export-gesture-type">{gesture.type}:</span>
                        <span className="export-action-name">{gesture.action}</span>
                        {gesture.description && (
                          <span className="export-description">({gesture.description})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Controller Image */}
        <div className="export-controller-image">
          {controller === 'xbox' ? (
            <XboxSvg ref={imageRef} mappings={mappings} />
          ) : controller === 'switch' ? (
            <SwitchSvg ref={imageRef} mappings={mappings} />
          ) : controller === 'keyboard' ? (
            <KeyboardSvg ref={imageRef} mappings={mappings} />
          ) : controller === 'keyboardmouse' ? (
            <div ref={imageRef} className="keyboard-mouse-export">
              <KeyboardSvg mappings={mappings} />
              <MouseSvg mappings={mappings} />
            </div>
          ) : (
            <img ref={imageRef} src={config.image} alt={config.name} />
          )}
        </div>
        
        {/* Right Side Mappings */}
        <div className="export-mappings-list export-mappings-right">
          <h2>Right Side</h2>
          {rightMappingsList.length === 0 ? (
            <div className="no-mappings">
              <p>No right side mappings</p>
            </div>
          ) : (
            <div className="export-mappings-table">
              {rightMappingsList.map(({ button, gestures }) => (
                <div 
                  key={button.id} 
                  className="export-mapping-row"
                  data-button-id={button.id}
                >
                  <div className="export-button-name">
                    {renderExportLabel(button.label)}
                  </div>
                  <div className="export-actions">
                    {gestures.map((gesture, idx) => (
                      <div key={idx} className="export-gesture">
                        <span className="export-gesture-type">{gesture.type}:</span>
                        <span className="export-action-name">{gesture.action}</span>
                        {gesture.description && (
                          <span className="export-description">({gesture.description})</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG overlay for connection lines */}
      {showLines && connections.length > 0 && (
        <svg className="export-connection-lines" style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1
        }}>
          {connections.map((conn) => (
            <g key={conn.buttonId}>
              {/* Line path with color variation to distinguish overlaps */}
              <path
                d={conn.path}
                stroke={conn.color}
                strokeWidth="1.5"
                fill="none"
                opacity="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Start circle (on button) */}
              <circle
                cx={conn.startX}
                cy={conn.startY}
                r="3"
                fill={conn.color}
                opacity="0.7"
              />
              {/* End circle (at row) */}
              <circle
                cx={conn.endX}
                cy={conn.endY}
                r="3"
                fill={conn.color}
                opacity="0.7"
              />
            </g>
          ))}
        </svg>
      )}
      
      <div className="export-footer">
        <p>Generated by Controller Scheme Designer</p>
      </div>
    </div>
  )
}

export default ControllerExportView
