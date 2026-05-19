# Context-Based Button Mapping Feature

## Overview

This feature allows you to create controller mappings that work across different controllers by matching buttons based on their **position**, **label**, or **specific button ID**. This is particularly useful for creating universal control schemes that adapt to different controller layouts.

## Key Concepts

### Matching Strategies

1. **By Button ID (This button only)**
   - Maps to a specific button on a specific controller
   - Example: `south` button on Xbox controller only
   - Key format: `buttonId` (e.g., `"south"`)

2. **By Position (All buttons at this position)**
   - Maps to all buttons at the same physical position across controllers
   - Example: All buttons at SOUTH position (Xbox A, Switch B)
   - Key format: `position:buttonId` (e.g., `"position:south"`)

3. **By Label (All buttons with this label)**
   - Maps to all buttons with the same label across controllers
   - Example: All "A" buttons (Xbox A at SOUTH, Switch A at EAST)
   - Key format: `label:buttonLabel` (e.g., `"label:A"`)

## Use Cases

### Menu Navigation (By Label)

In menus, you want the "A" button to confirm regardless of controller:
- **Nintendo Switch**: A button is at EAST position
- **Xbox**: A button is at SOUTH position
- **Solution**: Map by label `label:A` → "CONFIRM"

```json
{
  "MENU": {
    "label:A": {
      "matchType": "label",
      "matchValue": "A",
      "press": {
        "action": "CONFIRM",
        "description": "Confirm selection"
      }
    }
  }
}
```

### Gameplay Actions (By Position)

In gameplay, you want the SOUTH position button for running:
- **Nintendo Switch**: SOUTH position is B button
- **Xbox**: SOUTH position is A button
- **Solution**: Map by position `position:south` → "RUN"

```json
{
  "GAMEPLAY": {
    "position:south": {
      "matchType": "position",
      "matchValue": "south",
      "press": {
        "action": "RUN",
        "description": "Run/Sprint"
      },
      "hold": {
        "action": "WALK",
        "description": "Walk slowly"
      }
    }
  }
}
```

## Button Position Reference

### Standard Face Button Positions

```
      NORTH (Y)
         |
WEST (X) - EAST (B)
         |
      SOUTH (A)
```

**Xbox Layout:**
- NORTH: Y button
- SOUTH: A button
- EAST: B button
- WEST: X button

**Nintendo Switch Layout:**
- NORTH: X button
- SOUTH: B button
- EAST: A button
- WEST: Y button

**Steam Deck Layout:**
- Same as Xbox (NSEW → YABC)

## How to Use

### Creating a Context-Based Mapping

1. **Select a Context** (e.g., MENU, GAMEPLAY)
2. **Click on a button** on the controller display
3. **Choose your matching strategy:**
   - "This button only" - Specific to current controller
   - "All buttons at this position" - Works for any controller
   - "All buttons labeled [X]" - Matches by button label
4. **Define your actions** (press, hold, direction)
5. **Save the mapping**

### Example Scenario

Creating a universal control scheme:

**MENU Context:**
- `label:A` → CONFIRM (works for all A buttons)
- `label:B` → CANCEL (works for all B buttons)

**GAMEPLAY Context:**
- `position:south` → RUN (bottom button on any controller)
- `position:east` → JUMP (right button on any controller)
- `position:west` → ATTACK (left button on any controller)
- `position:north` → RELOAD (top button on any controller)

This means:
- On **Xbox**: A=RUN, B=JUMP, X=ATTACK, Y=RELOAD
- On **Switch**: B=RUN, A=JUMP, Y=ATTACK, X=RELOAD
- Actions stay consistent based on button position!

## Mapping Data Structure

```json
{
  "contexts": ["MENU", "GAMEPLAY"],
  "contextMappings": {
    "MENU": {
      "label:A": {
        "matchType": "label",
        "matchValue": "A",
        "press": { "action": "CONFIRM", "description": "" }
      }
    },
    "GAMEPLAY": {
      "position:south": {
        "matchType": "position",
        "matchValue": "south",
        "press": { "action": "RUN", "description": "Sprint" },
        "hold": { "action": "WALK", "description": "Walk" }
      }
    }
  }
}
```

## Resolution Order

When displaying a button's mapping, the system checks in this order:

1. **Direct ID match** (`buttonId`)
2. **Position match** (`position:buttonId`)
3. **Label match** (`label:buttonLabel`)

The first match found is used.

## Benefits

✅ **Universal Schemes**: Create one control scheme that works on all controllers
✅ **Context Awareness**: Different mappings for menus vs gameplay
✅ **Consistency**: Actions stay in the same physical position
✅ **Flexibility**: Mix and match strategies as needed

## Files Modified

- `src/utils/buttonMatching.js` - Core matching logic
- `src/constants/controllers.js` - Added position metadata
- `src/components/MappingEditor/MappingEditor.jsx` - Match type UI
- `src/components/MappingEditor/MappingModal.jsx` - Pass controller prop
- `src/App.jsx` - Updated mapping resolution
- `src/utils/controllerDragDrop.js` - Use button matching
- `src/components/controllers/*.jsx` - Use button matching
- `src/App.css` - Match type selector styles

## Migration

Existing mappings using direct button IDs will continue to work. The system is backward compatible with the old format.
