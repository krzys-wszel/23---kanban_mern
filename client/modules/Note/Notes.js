import React, { PropTypes , Component } from 'react';
import Note from './Note';
import Edit from '../../components/Edit.js';
import callApi from '../../util/apiCaller';

import styles from './Note.css';

class Notes extends Component {

// Drag and Drop handling

  sourceDnDLaneId = null;

  onBeginDrag = (laneId) => {
    this.sourceDnDLaneId = laneId;
  }

  onMove = (sourceProps, targetProps) => {
    if (sourceProps.laneId === this.props.laneId) {
      this.props.swapNotes(this.props.laneId, sourceProps._id, targetProps.note._id);      
    }
  }

  onEndDrag = (noteId) => {
    //find lanes to update after Drag'n'Drop
    const sourceDnDLane = this.props.storeLanes.find(lane => lane._id === this.sourceDnDLaneId);
    const targetDnDLane = this.props.storeLanes.find(lane => lane.notes.includes(noteId));
    callApi(`lanes/${this.sourceDnDLaneId}`, 'put', { notes: sourceDnDLane.notes })
    .catch(err => console.log(err));

    if (targetDnDLane._id !== this.sourceDnDLaneId) {
      callApi(`lanes/${targetDnDLane._id}`, 'put', { notes: targetDnDLane.notes })
      .catch(err => console.log(err));
    }

    this.sourceDnDLaneId = null;
  }

  render() {

    const notes = this.props.notes;
    const laneId = this.props.laneId;
    return (
      <ul className={styles.NoteList}>
        {notes && notes.map((note, index) =>
          <Note
            key={note._id}
            note={note}
            laneId={laneId}
            {...this.props}
            onBeginDrag={this.onBeginDrag}
            onMove={this.onMove}
            onEndDrag={this.onEndDrag}
            index={index}
          />
        )}
      </ul>
    );
  }
}

Notes.propTypes = {
  notes: PropTypes.array,
  laneId: PropTypes.string,
};

export default Notes;