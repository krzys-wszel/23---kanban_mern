import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Edit from '../../components/Edit.js';
import { DragSource, DropTarget } from 'react-dnd';
import { compose } from 'redux';
import ItemTypes from '../Kanban/itemTypes';

// Import Style
import styles from './Note.css';

class Note extends Component {

  render() {
    const { connectDragSource, connectDropTarget, isDragging,
      onMove, editing, note, laneId, updateNote, deleteNote } = this.props;

    return connectDragSource(connectDropTarget(
      <li 
        style={{opacity: isDragging ? 0 : 1}}
        className={styles.Note}
      >
        <Edit
          value={note.task}
          onEdit={task => updateNote(laneId, { _id: note._id, task })}
          onDelete={() => deleteNote(laneId, note._id)}
          placeholder="Enter Note..."
        />
      </li>
    ));
  }
};


Note.propTypes = {
  children: PropTypes.any
};

// Drag'n'Drop handling

const noteSource = {
  beginDrag(props) {
    props.onBeginDrag(props.laneId);
    return {
      index: props.index,
      _id: props.note._id,
      laneId: props.laneId
    }
  },
  isDragging(props, monitor) {
    const _id = monitor.getItem()._id;
    return props.note._id === _id;
  },
  endDrag(props, monitor) {
    props.onEndDrag(monitor.getItem()._id);
  }
};

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const targetId = targetProps.note._id;
    const sourceId = sourceProps._id;
    if(targetId !== sourceId) {
      targetProps.onMove(sourceProps, targetProps);
    }
  }

};

export default compose(
  DragSource(ItemTypes.NOTE, noteSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    })
  ),
  DropTarget(ItemTypes.NOTE, noteTarget, 
    connect => ({
      connectDropTarget: connect.dropTarget()
    })
  )
)(Note);
