import type { Note } from "../types";
import "./StickyNote.scss";

type StickyNoteProps = {
  note: Note;
  updateNote: (id: string, changes: Partial<Note>) => void;
  bringToFront: (id: string) => void;
};

export const StickyNote = ({
  note: { position, size, zIndex, color, id, text },
  updateNote,
  bringToFront,
}: StickyNoteProps) => {
  return (
    <article
      className={`sticky-note sticky-note-${color}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: zIndex,
      }}
      onPointerDown={() => bringToFront(id)}
    >
      <textarea
        value={text}
        onChange={(event) =>
          updateNote(id, {
            text: event.target.value,
          })
        }
      />
    </article>
  );
};
