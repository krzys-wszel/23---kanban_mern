// Import Actions
import { CREATE_LANE, CREATE_LANES, 
  UPDATE_LANE, DELETE_LANE, SWAP_NOTES, 
  ATTACH_TO_LANE, DETACH_FROM_LANE } from './LaneActions';

// Initial State
const initialState = [];

const LaneReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_LANES:
      return action.lanes;

    case CREATE_LANE:
      return [...state, action.lane];

    case UPDATE_LANE:
      return state.map(lane => action.lane._id === lane._id ? Object.assign(lane, action.lane) : lane);

    case DELETE_LANE:
      return state.filter(lane => lane._id !== action.id);

    case SWAP_NOTES:
      return state.map(lane => {
        if (lane._id !== action.laneId) {
          return lane;
        } else {
          return Object.assign({}, lane, {
            notes: lane.notes.map(noteId => {
              if(noteId === action.sourceId) {
                return action.targetId;
              } else if(noteId === action.targetId) {
                return action.sourceId;
              } else {
              return noteId;
              } 
            })
          })
        }
      })
    
    case DETACH_FROM_LANE:
      return state.map(lane => {
        if (lane._id !== action.laneId) {
          return lane;
        } else {
          return Object.assign({}, lane, { notes: lane.notes.filter(noteId => noteId !== action.noteId) });
        }
      });

    case ATTACH_TO_LANE:
      return state.map(lane => {
        if (lane._id !== action.laneId) {
          return lane;
        } else {
          return Object.assign({}, lane, { notes: [...lane.notes, action.noteId] });
        }
      });

    default:
      return state;
  }
};

export default LaneReducer;
