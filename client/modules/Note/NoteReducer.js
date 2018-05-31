// Import Actions
import {CREATE_NOTE, CREATE_NOTES, UPDATE_NOTE, DELETE_NOTE } from './NoteActions';

// Initial State
const initialState = [];

const NoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTES:
      return action.notes;

    case CREATE_NOTE:
      return [...state, action.note];

    case UPDATE_NOTE:
      return state.map(note => action.note._id === note._id ? action.note : note);

    case DELETE_NOTE:
      return state.filter(note => note._id !== action.id);
      
    default:
      return state;
  }
};

export default NoteReducer;
