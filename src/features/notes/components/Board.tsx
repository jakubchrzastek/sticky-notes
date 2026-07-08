import type { Note } from "../types";
import { StickyNote } from "./StickyNote";
import "./Board.scss";

type BoardProps = {
  notes: Note[];
  updateNote: (id: string, changes: Partial<Note>) => void;
  bringToFront: (id: string) => void;
  createNote: (position: { x: number; y: number }) => void;
};

export const Board = ({
  notes,
  updateNote,
  bringToFront,
  createNote,
}: BoardProps) => {
  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    createNote({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY,
    });
  };

  return (
    <section className="board" onPointerDown={handlePointerDown}>
      {notes.map((note) => (
        <StickyNote
          key={note.id}
          note={note}
          updateNote={updateNote}
          bringToFront={bringToFront}
        />
      ))}
    </section>
  );
};
