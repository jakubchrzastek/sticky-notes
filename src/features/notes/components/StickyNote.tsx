import { useRef } from "react";
import type { Note } from "../types";
import { useDrag } from "../hooks/useDrag";
import { useResize } from "../hooks/useResize";
import "./StickyNote.scss";

type StickyNoteProps = {
  note: Note;
  updateNote: (id: string, changes: Partial<Note>) => void;
  bringToFront: (id: string) => void;
};

export const StickyNote = ({
  note,
  updateNote,
  bringToFront,
}: StickyNoteProps) => {
  const { id, text, color, position, size, zIndex } = note;

  const noteRef = useRef<HTMLElement>(null);
  const drag = useDrag({
    id,
    position,
    ref: noteRef,
    updateNote,
    bringToFront,
  });
  const resize = useResize({ id, size, ref: noteRef, updateNote });

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNote(id, { text: event.target.value });
  };

  return (
    <article
      ref={noteRef}
      className={`sticky-note sticky-note--${color}`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex,
      }}
      onPointerDown={drag.onPointerDown}
      onPointerMove={drag.onPointerMove}
      onPointerUp={drag.onPointerUp}
    >
      <textarea value={text} onChange={handleTextChange} />
      <button
        type="button"
        className="sticky-note__resize"
        onPointerDown={resize.onPointerDown}
        onPointerMove={resize.onPointerMove}
        onPointerUp={resize.onPointerUp}
      >
        Resize
      </button>
    </article>
  );
};
