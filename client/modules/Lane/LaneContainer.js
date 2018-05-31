import { connect } from 'react-redux';
import Lane from './Lane';
import { updateLaneRequest, deleteLane, detachFromLane, attachToLane} from './LaneActions';
import { createNote } from '../Note/NoteActions';

const mapStateToProps = (state, ownProps) => ({
    notes: ownProps.lane.notes.map(noteId => state.notes.find(note => note._id === noteId)).filter(note => note)
});

const mapDispatchToProps = dispatch => ({
  updateLane: (lane) => {
    dispatch(updateLaneRequest(lane))
  },
  deleteLane: (laneId) => {
    dispatch(deleteLane(laneId))
  },
  createNote: (laneId, note) => {
    dispatch(createNote(laneId, note))
  },
  detachFromLane: (laneId, noteId) => {
    dispatch(detachFromLane(laneId, noteId))
  },
  attachToLane: (laneId, noteId) => {
    dispatch(attachToLane(laneId, noteId))
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Lane);

