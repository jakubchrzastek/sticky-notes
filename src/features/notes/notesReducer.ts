import type { Note, CreateNotePayload } from "./types";
import { v4 as uuidv4 } from "uuid";

export type NotesState = {
  notes: Note[];
};

export type NotesAction =
  | {
      type: "ADD_NOTE";
      payload: CreateNotePayload;
    }
  | {
      type: "UPDATE_NOTE";
      payload: {
        id: string;
        changes: Partial<Note>;
      };
    }
  | {
      type: "REMOVE_NOTE";
      payload: {
        id: string;
      };
    }
  | {
      type: "BRING_TO_FRONT";
      payload: {
        id: string;
      };
    };

export const initialNotesState: NotesState = {
  notes: [],
};

export const notesReducer = (
  state: NotesState,
  action: NotesAction,
): NotesState => {
  switch (action.type) {
    case "ADD_NOTE": {
      const note: Note = {
        id: uuidv4(),
        position: action.payload.position,
        size: action.payload.size,
        text: "",
        color: "yellow",
        zIndex: state.notes.length + 1,
      };

      return {
        notes: [...state.notes, note],
      };
    }

    case "UPDATE_NOTE": {
      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                ...action.payload.changes,
              }
            : note,
        ),
      };
    }

    case "REMOVE_NOTE": {
      return {
        notes: state.notes.filter((note) => note.id !== action.payload.id),
      };
    }

    case "BRING_TO_FRONT": {
      const highestZIndex = Math.max(
        0,
        ...state.notes.map((note) => note.zIndex),
      );

      return {
        notes: state.notes.map((note) =>
          note.id === action.payload.id
            ? {
                ...note,
                zIndex: highestZIndex + 1,
              }
            : note,
        ),
      };
    }

    default:
      return state;
  }
};
