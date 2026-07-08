# Sticky Notes

A lightweight sticky notes application built with React and TypeScript.
The app allows users to create, edit, move, resize, customize, and remove sticky notes through an intuitive drag-and-drop interface.

## Features

- Create and edit sticky notes
- Drag notes around the workspace
- Resize notes using a resize handle
- Change note colors with a quick color picker
- Automatically bring active notes to the front
- Remove notes by dragging them into the trash zone
- Manage notes state using a reducer-based architecture

## Tech Stack

- React
- TypeScript
- Vite
- SCSS
- React hooks
- `useReducer` for state management

## Architecture

The application follows a feature-based structure where all note-related functionality is grouped together.
The notes feature contains UI components, interaction hooks, state management, and shared types:

```text
src/
└── features/
    └── notes/
        ├── components/
        │   └── Board
        │   ├── StickyNote
        │   └── ColorPicker
        │
        ├── hooks/
        │   ├── useDrag
        │   └── useResize
        │   └── useNotes
        │
        ├── notesReducer.ts
        └── types.ts
```

## Implementation Details

### State Management

Notes state is managed using React useReducer with a dedicated notesReducer.
The reducer contains all state transition logic, while the useNotes hook provides a simple API for components to interact with notes without directly dispatching actions.

Example operations exposed by useNotes:

- Add a note
- Update note properties
- Remove a note
- Change note position
- Resize a note
- Bring a note to the front

This separation keeps components focused on rendering and user interactions, while keeping state changes centralized, predictable, and easier to maintain.

### Dragging

Notes use Pointer Events with pointer capture to provide smooth dragging behavior.
Instead of updating React state on every pointer movement, the note position is temporarily updated using CSS transforms.
The final position is committed to state after releasing the pointer.
This approach reduces unnecessary React renders and keeps interactions smooth.

### Resizing

Resize behavior is implemented as a reusable hook.

The hook handles:

- Pointer lifecycle
- Size calculations
- Minimum size constraints
- Final state updates after resizing

### Trash Zone

When a note is released, its position is checked against the trash area using bounding box collision detection.
If the note overlaps the trash zone, it is removed from the workspace.

## Getting Started

### Requirements

Before running the project, make sure you have:

- Node.js `>= 22.x`
- npm `>= 10.x`

Check your installed versions:

```bash
node -v
npm -v
```

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd sticky-notes
```

Install dependencies:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at the URL provided by Vite (usually):

```text
http://localhost:5173
```
