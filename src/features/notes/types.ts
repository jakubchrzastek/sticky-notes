export const NOTE_COLORS = ["yellow", "blue", "green", "pink"] as const;
export type NoteColor = (typeof NOTE_COLORS)[number];

export type Position = {
  x: number;
  y: number;
};

export type Size = {
  width: number;
  height: number;
};

export type Note = {
  id: string;
  position: Position;
  size: Size;
  text: string;
  color: NoteColor;
  zIndex: number;
};

export type CreateNotePayload = {
  position: Position;
  size: Size;
};
