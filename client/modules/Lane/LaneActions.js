import callApi from '../../util/apiCaller';

import { normalize } from 'normalizr';
import { lanesSchema } from '../../util/normalizrSchema';

import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const SWAP_NOTES = 'SWAP_NOTES';
export const DETACH_FROM_LANE = 'DETACH_FROM_LANE';
export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';

// Export Actions
export function createLane(lane) {
  return dispatch => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch({
        type: CREATE_LANE,
        lane: res.lane
      });
    });
  }
}

export function createLanes(lanes) {
  return {
    type: CREATE_LANES,
    lanes
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane
  }
}

export function updateLaneRequest(lane) {
  return dispatch => {
    return callApi(`lanes/${lane._id}`, 'put', lane).then(res => {
      dispatch(updateLane(lane));
    });
  }
}

export function deleteLane(id) {
  return dispatch => {
    return callApi(`lanes/${id}`, 'delete').then(res => {
      dispatch({
        type: DELETE_LANE,
        id
      })
    })
  }
}

export function fetchLanes() {
  return dispatch => {
    return callApi('lanes').then(res => {
      const normalized = normalize(res.lanes, lanesSchema);
      const lanes = normalized.entities.lanes || [];
      const notes = normalized.entities.notes || [];
      dispatch(createNotes(Object.values(notes)));
      dispatch(createLanes(Object.values(lanes)));
    });
  }
}

export function swapNotes(laneId, sourceId, targetId) {
  return {
    type: SWAP_NOTES,
    laneId,
    sourceId,
    targetId
  };
}

export function detachFromLane(laneId, noteId) {
  return {
    type: DETACH_FROM_LANE,
    laneId,
    noteId
  };
}

export function attachToLane(laneId, noteId) {
  return {
    type: ATTACH_TO_LANE,
    laneId,
    noteId
  };
}
