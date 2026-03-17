# 🎮 Controller Scheme Designer

A web-based application to create, manage, and export console controller diagrams with custom button mappings.

## Features

- ✅ **Multiple Controller Types**
  - Xbox Controller
  - Nintendo Switch Controller
  - Keyboard
  - Mouse
  - Steam Deck (optional)

- ✅ **Context Management**
  - Create multiple contexts (gameplay, menu, etc.)
  - Switch between contexts easily
  - Each context has independent mappings

- ✅ **Gesture Support**
  - Tap
  - Press
  - Hold

- ✅ **Import/Export**
  - Save schemes as JSON files
  - Import previously saved schemes
  - Export diagrams as PNG images

- ✅ **Interactive UI**
  - Click buttons to map actions
  - Visual feedback for mapped buttons
  - Real-time preview of mappings

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the development server:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:5173` (or the port shown in the terminal)

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` folder.

## How to Use

1. **Select a Controller**: Choose from Xbox, Switch, Keyboard, Mouse, or Steam Deck
2. **Select a Context**: Switch between different contexts (gameplay, menu, etc.) or create new ones
3. **Map Buttons**: 
   - Click on any button/key in the controller diagram
   - Enter the action name
   - Select gesture type (tap, press, hold)
   - Add optional description
   - Click "Save Mapping"
4. **Export**:
   - **Export Scheme (JSON)**: Save your mappings to a file
   - **Import Scheme (JSON)**: Load previously saved mappings
   - **Download as PNG**: Export the current diagram as an image

## Project Structure

```
controllers-schemes/
├── controllers/           # SVG controller images
│   ├── xbox-one.svg
│   └── switch.svg
├── src/
│   ├── components/
│   │   ├── controllers/   # Controller display components
│   │   │   ├── XboxController.jsx
│   │   │   ├── SwitchController.jsx
│   │   │   ├── KeyboardDisplay.jsx
│   │   │   ├── MouseDisplay.jsx
│   │   │   └── SteamDeckController.jsx
│   │   ├── ControllerSelector.jsx
│   │   ├── ControllerDisplay.jsx
│   │   ├── MappingEditor.jsx
│   │   └── ContextManager.jsx
│   ├── utils/
│   │   └── export.js      # Export/Import utilities
│   ├── App.jsx            # Main application
│   ├── App.css            # Styles
│   └── main.jsx           # Entry point
├── index.html
├── package.json
└── vite.config.js
```

## Technologies Used

- **React 18**: UI framework
- **Vite**: Build tool and dev server
- **html-to-image**: PNG export functionality
- **CSS3**: Styling and animations

## Features in Detail

### Multiple Contexts
Create different mapping contexts for various game modes:
- Gameplay
- Menu navigation
- Driving
- Combat
- Inventory
- etc.

### Gesture Types
Define how buttons should be used:
- **Tap**: Quick press
- **Press**: Standard press
- **Hold**: Long press/hold

### Visual Feedback
- 🔵 Blue: Unmapped button
- 🟢 Green: Mapped button
- 🔴 Red: Currently selected button

## Tips

1. Use descriptive action names for clarity
2. Add descriptions to complex mappings
3. Export your schemes regularly to save progress
4. Use different contexts for different game modes
5. The PNG export captures the current visible context

## License

MIT License - Feel free to use and modify!
