import { Router } from 'express';
import * as LaneController from '../controllers/lane.controller';
import noteRouter from './note.routes';

const router = new Router();

router.route('/lanes').post(LaneController.addLane);

router.route('/lanes').get(LaneController.getLanes);

router.route('/lanes/:laneId').get(LaneController.getLane);

router.route('/lanes/:laneId').delete(LaneController.deleteLane);

router.route('/lanes/:laneId').put(LaneController.updateLane);

router.use('/lanes/:laneId/', noteRouter);

router.use((err, req, res, next) => {
  res.status(404).send(err);
});

export default router;
