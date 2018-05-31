import {DragSource} from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

export default compose(
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Note);

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();

    if(targetProps.id !== sourceProps.id) {
      targetProps.onMove({targetProps.id, sourceProps.Id});
    }
  }
};