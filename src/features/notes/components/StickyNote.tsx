import { useRef } from "react";
import type { Note } from "../types";
import "./StickyNote.scss";

type StickyNoteProps = {
  note: Note;
  updateNote: (id: string, changes: Partial<Note>) => void;
  bringToFront: (id: string) => void;
};

export const StickyNote = ({
  note: { id, text, color, position, size, zIndex },
  updateNote,
  bringToFront,
}: StickyNoteProps) => {
  const noteRef = useRef<HTMLElement>(null);

  const dragRef = useRef({
    dragging: false,
    startPointer: {
      x: 0,
      y: 0,
    },
    startPosition: position,
    offset: {
      x: 0,
      y: 0,
    },
  });

  const handlePointerDown = ({
    clientX,
    clientY,
    currentTarget,
    pointerId,
  }: React.PointerEvent<HTMLElement>) => {
    bringToFront(id);

    currentTarget.setPointerCapture(pointerId);

    dragRef.current = {
      dragging: true,
      startPointer: {
        x: clientX,
        y: clientY,
      },
      startPosition: position,
      offset: {
        x: 0,
        y: 0,
      },
    };
  };

  const handlePointerMove = ({
    clientX,
    clientY,
  }: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current.dragging || !noteRef.current) {
      return;
    }

    const deltaX = clientX - dragRef.current.startPointer.x;
    const deltaY = clientY - dragRef.current.startPointer.y;

    dragRef.current.offset = {
      x: deltaX,
      y: deltaY,
    };

    noteRef.current.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
  };

  const handlePointerUp = ({
    currentTarget,
    pointerId,
  }: React.PointerEvent<HTMLElement>) => {
    if (!dragRef.current.dragging) {
      return;
    }

    dragRef.current.dragging = false;

    currentTarget.releasePointerCapture(pointerId);

    if (noteRef.current) {
      noteRef.current.style.transform = "";
    }

    updateNote(id, {
      position: {
        x: dragRef.current.startPosition.x + dragRef.current.offset.x,
        y: dragRef.current.startPosition.y + dragRef.current.offset.y,
      },
    });
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateNote(id, {
      text: event.target.value,
    });
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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      <textarea value={text} onChange={handleTextChange} />
    </article>
  );
};
