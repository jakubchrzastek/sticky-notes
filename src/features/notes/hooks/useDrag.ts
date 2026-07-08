import { useRef } from "react";
import type { PointerEvent, RefObject } from "react";
import type { Note } from "../types";

type Point = Note["position"];

type DragState = {
  active: boolean;
  startPointer: Point;
  startPosition: Point;
  delta: Point;
};

type UseDragParams = {
  id: string;
  position: Point;
  ref: RefObject<HTMLElement | null>;
  updateNote: (id: string, changes: Partial<Note>) => void;
  removeNote: (id: string) => void;
  bringToFront: (id: string) => void;
  trashRef: RefObject<HTMLDivElement | null>;
};

export const useDrag = ({
  id,
  position,
  ref,
  updateNote,
  removeNote,
  bringToFront,
  trashRef,
}: UseDragParams) => {
  const state = useRef<DragState>({
    active: false,
    startPointer: { x: 0, y: 0 },
    startPosition: position,
    delta: { x: 0, y: 0 },
  });

  const isInsideTrash = (element: HTMLElement, trash: HTMLElement) => {
    const noteRect = element.getBoundingClientRect();
    const trashRect = trash.getBoundingClientRect();

    return (
      noteRect.left < trashRect.right &&
      noteRect.right > trashRect.left &&
      noteRect.top < trashRect.bottom &&
      noteRect.bottom > trashRect.top
    );
  };

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    bringToFront(id);
    event.currentTarget.setPointerCapture(event.pointerId);

    state.current = {
      active: true,
      startPointer: { x: event.clientX, y: event.clientY },
      startPosition: position,
      delta: { x: 0, y: 0 },
    };
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!ref.current || !state.current.active) {
      return;
    }

    const delta = {
      x: event.clientX - state.current.startPointer.x,
      y: event.clientY - state.current.startPointer.y,
    };
    state.current.delta = delta;

    ref.current.style.transform = `translate(${delta.x}px, ${delta.y}px)`;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!state.current.active) {
      return;
    }

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    state.current.active = false;

    const { startPosition, delta } = state.current;

    const finalPosition = {
      x: startPosition.x + delta.x,
      y: startPosition.y + delta.y,
    };

    const isOverTrash =
      ref.current &&
      trashRef?.current &&
      isInsideTrash(ref.current, trashRef.current);

    if (ref.current) {
      ref.current.style.transform = "";
    }
    if (isOverTrash) {
      removeNote(id);
      return;
    }

    updateNote(id, {
      position: finalPosition,
    });
  };

  return { onPointerDown, onPointerMove, onPointerUp };
};
