import { useReducer } from "react";
import { notesReducer, initialNotesState } from "../notesReducer";
import type { Note, CreateNotePayload } from "../types";

export const useNotes = () => {
  const [state, dispatch] = useReducer(notesReducer, initialNotesState);

  const addNote = (payload: CreateNotePayload) => {
    dispatch({
      type: "ADD_NOTE",
      payload,
    });
  };

  const updateNote = (id: string, changes: Partial<Note>) => {
    dispatch({
      type: "UPDATE_NOTE",
      payload: {
        id,
        changes,
      },
    });
  };

  const removeNote = (id: string) => {
    dispatch({
      type: "REMOVE_NOTE",
      payload: {
        id,
      },
    });
  };

  const bringToFront = (id: string) => {
    dispatch({
      type: "BRING_TO_FRONT",
      payload: {
        id,
      },
    });
  };

  return {
    notes: state.notes,
    addNote,
    updateNote,
    removeNote,
    bringToFront,
  };
};
