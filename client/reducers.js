/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import notes from './modules/Note/NoteReducer';
import lanes from './modules/Lane/LaneReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  lanes,
  notes,
  intl
});
