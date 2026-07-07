export type NoteColor = "yellow" | "blue" | "green" | "pink";

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
