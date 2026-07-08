import { useNotes } from "./features/notes/hooks/useNotes";
import { Board } from "./features/notes/components/Board";
import "./App.scss";

export const App = () => {
  const { notes, addNote, updateNote, removeNote, bringToFront } = useNotes();

  const handleCreateNote = (position: { x: number; y: number }) => {
    addNote({
      position,
      size: {
        width: 200,
        height: 150,
      },
    });
  };

  return (
    <main className="app">
      <p className="toolbar">Click on grey background to add sticky note</p>
      <Board
        notes={notes}
        updateNote={updateNote}
        removeNote={removeNote}
        bringToFront={bringToFront}
        createNote={handleCreateNote}
      />
    </main>
  );
};
