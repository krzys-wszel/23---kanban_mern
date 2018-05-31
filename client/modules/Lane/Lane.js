import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as laneActions from './LaneActions';
import { createNote } from '../Note/NoteActions';
import Notes from '../Note/Notes';
import NotesContainer from '../Note/NotesContainer';
import Edit from '../../components/Edit.js';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { compose } from 'redux';

// Import Style
import styles from './Lane.css';

class Lane extends Component {

  render() {
    const { lane, notes, connectDropTarget,
      createNote, updateLane, deleteLane } = this.props;

    const laneId = lane._id;
    return connectDropTarget(
      <div className={styles.LaneContainer}>
        <div className={styles.LaneHeader}>
          <button
            className={styles.LaneButton}
            onClick={() => createNote(laneId, {task: `New Note`})}
          >+</button>
          <Edit
            className={styles.LaneName}
            value={lane.name}
            onEdit={name => updateLane({_id: laneId, name})} 
            placeholder="Enter Lane Name..."
          />
          <button 
            className={styles.LaneButton}
            onClick={() => deleteLane(laneId)}
          >x</button>
        </div>
        <NotesContainer
          notes={notes}
          laneId={laneId}
        />       
      </div>
    );
  }
}

Lane.propTypes = {
  lane: PropTypes.object,
  notes: PropTypes.array
};

const noteTarget = {
  hover(targetProps, monitor) {
    const targetLaneId = targetProps.lane._id;
    const sourceLaneId = monitor.getItem().laneId;
    const noteId = monitor.getItem()._id;
    if(targetLaneId !== sourceLaneId) {
      targetProps.detachFromLane(sourceLaneId, noteId);
      targetProps.attachToLane(targetLaneId, noteId);
      monitor.getItem().laneId = targetLaneId;
    }
  }
};


export default DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  })
)(Lane)
