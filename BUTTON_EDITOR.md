# Button Editor - Documentation

## Overview

The Button Editor is a runtime utility that allows you to visually edit controller button configurations including positions, types, shapes, and sizes. When you're done editing, it generates the properly formatted button array code that you can copy and paste directly into your controller component files.

## Features

- **Visual Button Editing**: Click on any button to edit its properties
- **Add/Delete Buttons**: Dynamically add new buttons or remove existing ones
- **Real-time Preview**: See changes immediately as you edit
- **Export to Code**: Generate properly formatted JavaScript arrays ready to paste into your code
- **Same Layout as Mapping Mode**: Ensures coordinates work correctly between editor and mapping modes

## How to Use

### 1. Switch to Editor Mode

Click the **Editor** button in the header navigation to switch from Mapping mode to Editor mode.

### 2. Select a Controller

Use the controller selector in the sidebar to choose which controller you want to edit (Xbox, Switch, Steam Deck, etc.).

### 3. Edit Button Properties

Click on any button marker on the controller diagram to open the edit modal. You can modify:

- **Button ID**: Unique identifier (e.g., `south`, `leftStick`)
- **X Position (%)**: Horizontal position as a percentage (0-100)
- **Y Position (%)**: Vertical position as a percentage (0-100)
- **Label**: Display text, Unicode character, or icon class
  - Text: `A`, `B`, `LT`, `RT`
  - Icon classes: `bi bi-caret-up-fill`, `fas fa-bars`
- **Shape**: 
  - `circle` - Round button
  - `rect` - Rectangle
  - `capsule` - Pill-shaped button
  - `dpad` - D-pad button
- **Type**:
  - `button` - Standard button
  - `stick` - Analog stick
- **Size Properties** (depends on shape):
  - For `circle` and `dpad`: diameter in pixels
  - For `rect` and `capsule`: width, height, and border radius in pixels
- **Hide Label**: Checkbox to hide the button label overlay

### 4. Add New Buttons

Click the **+** (plus) button in the left panel to add a new button with default properties. You can then click on it to customize.

### 5. Delete Buttons

Click the trash icon next to any button in the left panel list to delete it.

### 6. Export Button Array

When you're finished editing, click the **Export** button (download icon) in the left panel. The properly formatted button array will be automatically copied to your clipboard.

The exported code will look like:

```javascript
const buttons = [
  { id: 'south', x: 76.09, y: 37.56, label: 'A', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  { id: 'east', x: 83.09, y: 27.80, label: 'B', shape: 'circle', size: 42, hideLabel: true, type: 'button' },
  // ... more buttons
]
```

### 7. Apply to Your Code

1. Open the controller component file you want to update (e.g., `XboxController.jsx`)
2. Find the `buttons` array definition
3. Replace the array contents with the exported code
4. Save the file

## Button Configuration Properties

### Required Properties

- `id` (string): Unique identifier for the button
- `x` (number): Horizontal position percentage (0-100)
- `y` (number): Vertical position percentage (0-100)
- `label` (string): Button label or icon class
- `shape` (string): Shape type
- `hideLabel` (boolean): Whether to hide the label
- `type` (string): Button type

### Shape-Specific Properties

#### Circle and D-Pad
```javascript
{
  shape: 'circle', // or 'dpad'
  size: 42 // diameter in pixels
}
```

#### Rectangle and Capsule
```javascript
{
  shape: 'rect', // or 'capsule'
  width: 32, // width in pixels
  height: 24, // height in pixels
  borderRadius: 4 // optional, border radius in pixels
}
```

## Tips and Best Practices

1. **Positioning**: Positions are percentages relative to the controller SVG dimensions
   - Use decimal precision (e.g., `76.09`) for precise alignment
   - Test in mapping mode to ensure buttons align correctly with the SVG image

2. **Labels**: 
   - Use icon classes from Bootstrap Icons (`bi bi-*`) or Font Awesome (`fas fa-*`, `far fa-*`)
   - Set `hideLabel: true` for buttons where the label interferes with visibility

3. **Button IDs**: Use descriptive, consistent naming:
   - Face buttons: `north`, `south`, `east`, `west`
   - D-pad: `dPadUp`, `dPadDown`, `dPadLeft`, `dPadRight`
   - Triggers: `leftTrigger`, `rightTrigger`
   - Bumpers: `leftButton`, `rightButton`
   - Sticks: `leftStick`, `rightStick`

4. **Testing**: Always test your exported configuration in mapping mode to ensure:
   - Buttons are positioned correctly over the controller image
   - Click targets work as expected
   - Labels display properly

## Workflow Example

1. Switch to Editor mode
2. Select Xbox controller
3. Click the "A" button marker
4. Adjust X position from 76.09 to 75.00
5. Adjust Y position from 37.56 to 38.00
6. Click "Save Changes"
7. See the button move in real-time
8. Click Export when satisfied
9. Paste into `XboxController.jsx`
10. Switch back to Mapping mode to test

## Troubleshooting

### Buttons not appearing
- Check that x, y coordinates are within 0-100 range
- Verify the controller SVG image is loading correctly

### Export not working
- Make sure you have granted clipboard permissions
- Check browser console for any error messages

### Positions don't match between modes
- Ensure you're using the exact same controller SVG in both modes
- Verify percentage values are consistent

## Future Enhancements

Potential improvements for the button editor:

- Drag-and-drop positioning
- Visual grid overlay
- Undo/redo functionality
- Import existing button configurations
- Batch edit multiple buttons
- Preset templates for common layouts
