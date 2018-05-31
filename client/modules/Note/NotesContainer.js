import { connect } from 'react-redux';
import Notes from './Notes';
import { deleteNote, updateNote } from './NoteActions';
import { swapNotes, detachFromLane, attachToLane } from '../Lane/LaneActions';

const mapDispatchToProps = dispatch => ({
  deleteNote: (laneId, noteId) => dispatch(deleteNote(laneId, noteId)),
  updateNote: (laneId, note) => dispatch(updateNote(laneId, note)),
  swapNotes: (laneId, sourceId, targetId) => dispatch(swapNotes(laneId, sourceId, targetId)),
  detachFromLane: (laneId, noteId) => dispatch(detachFromLane(laneId, noteId)),
  attachToLane: (laneId, noteId) => dispatch(attachToLane(laneId, noteId))
});

const mapStateToProps = store => ({
  storeLanes: store.lanes
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);