import React, { PropTypes } from 'react';
import Lane from './Lane.js';
import LaneContainer from './LaneContainer.js';
import styles from './Lane.css';

const Lanes = ({ lanes }) => {
  return (
    <div className={styles.LanesContainer}>
      {lanes.map(lane => 
          <LaneContainer 
            key={lane._id}
            lane={lane}
          />
      )}
    </div>
  );
}

Lanes.propTypes = {
  lanes: PropTypes.array
};

export default Lanes;
