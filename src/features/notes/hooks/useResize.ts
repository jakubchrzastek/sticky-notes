import { useRef } from "react";
import type { PointerEvent, RefObject } from "react";
import type { Note } from "../types";

const MIN_WIDTH = 150;
const MIN_HEIGHT = 100;

type Point = Note["position"];
type Size = Note["size"];

type ResizeState = {
  active: boolean;
  startPointer: Point;
  startSize: Size;
  delta: Point;
};

type UseResizeParams = {
  id: string;
  size: Size;
  ref: RefObject<HTMLElement | null>;
  updateNote: (id: string, changes: Partial<Note>) => void;
};

const resizedSize = (startSize: Size, delta: Point): Size => ({
  width: Math.max(MIN_WIDTH, startSize.width + delta.x),
  height: Math.max(MIN_HEIGHT, startSize.height + delta.y),
});

export const useResize = ({ id, size, ref, updateNote }: UseResizeParams) => {
  const state = useRef<ResizeState>({
    active: false,
    startPointer: { x: 0, y: 0 },
    startSize: size,
    delta: { x: 0, y: 0 },
  });

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);

    state.current = {
      active: true,
      startPointer: { x: event.clientX, y: event.clientY },
      startSize: size,
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

    const { width, height } = resizedSize(state.current.startSize, delta);
    ref.current.style.width = `${width}px`;
    ref.current.style.height = `${height}px`;
  };

  const onPointerUp = (event: PointerEvent<HTMLElement>) => {
    if (!state.current.active) {
      return;
    }

    event.currentTarget.releasePointerCapture(event.pointerId);
    state.current.active = false;

    updateNote(id, {
      size: resizedSize(state.current.startSize, state.current.delta),
    });
  };

  return { onPointerDown, onPointerMove, onPointerUp };
};
