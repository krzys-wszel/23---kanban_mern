import uuid from 'uuid';

import callApi from '../../util/apiCaller';

import { updateLane } from '../Lane/LaneActions';

// Export Constants
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';

// Export Actions
export function createNote(laneId, note) {
  return dispatch => {
    return callApi(`lanes/${laneId}/notes`, 'post', note).then(res => {
      dispatch({
        type: CREATE_NOTE,
        note: res.note,
      });      
      const normalizedLaneNotes = res.lane.notes.map(note => note._id);
      dispatch(updateLane(Object.assign({}, res.lane, { notes: normalizedLaneNotes })));
    });
  }
}

export function createNotes(notes) {
  return {
    type: CREATE_NOTES,
    notes
  };
}

export function updateNote(laneId, note) {
  return dispatch => {
    return callApi(`lanes/${laneId}/notes/${note._id}`, 'put', note).then(res => {
      dispatch({
        type: UPDATE_NOTE,
        note
      })
    })
  }
}

export function deleteNote(laneId, noteId) {
  return dispatch => {
    return callApi(`lanes/${laneId}/notes/${noteId}`, 'delete').then(res =>{
      dispatch({
        type: DELETE_NOTE,
        id: noteId
      });
      const normalizedLaneNotes = res.lane.notes.map(note => note._id);
      dispatch(updateLane(Object.assign({}, res.lane, { notes: normalizedLaneNotes })));
    });
  }
}
