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
  bringToFront: (id: string) => void;
};

export const useDrag = ({
  id,
  position,
  ref,
  updateNote,
  bringToFront,
}: UseDragParams) => {
  const state = useRef<DragState>({
    active: false,
    startPointer: { x: 0, y: 0 },
    startPosition: position,
    delta: { x: 0, y: 0 },
  });

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

    event.currentTarget.releasePointerCapture(event.pointerId);
    state.current.active = false;

    const { startPosition, delta } = state.current;

    if (ref.current) {
      ref.current.style.transform = "";
    }

    updateNote(id, {
      position: {
        x: startPosition.x + delta.x,
        y: startPosition.y + delta.y,
      },
    });
  };

  return { onPointerDown, onPointerMove, onPointerUp };
};
