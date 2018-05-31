import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createLane, fetchLanes } from '../Lane/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { compose } from 'redux';

import Lanes from '../Lane/Lanes';

// Import Style
import styles from './Kanban.css';

class Kanban extends Component {
  componentDidMount() {
    this.props.fetchLanes();
  }

  render() {
    const { lanes, createLane } = this.props;

    return (
      <div className={styles.KanbanContainer}>
        <button 
          className={styles.AddLane}
          onClick={() => this.props.createLane({
            name: `New Lane`
          })}
        >
          Add lane
        </button>
        <Lanes
          lanes={lanes}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  lanes: state.lanes,
  notes: state.notes
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  createLane: lane => {
    dispatch(createLane(lane))
  },
  fetchLanes: () => {
    dispatch(fetchLanes())
  }
});

Kanban.propTypes = {
  lanes: PropTypes.array
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend)
)(Kanban);
