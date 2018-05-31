import Lane from '../models/lane';
import Note from '../models/note';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  } else {
    const newLane = new Lane(req.body);
    newLane.notes = [];
    newLane.save()
    .then(savedLane => {
      res.json({ lane: savedLane });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}

export function getLanes(req, res) {
  Lane.find().exec()
  .then(lanes => {
    res.json({ lanes });
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

export function getLane(req, res) {
  Lane.findById(req.params.laneId).exec()
  .then(lane => {
    if (lane) {
      res.json({ lane });
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

export function deleteLane(req, res) {
  Lane.findByIdAndRemove(req.params.laneId).exec()
  .then(removedLane => {
    if (removedLane) {
      return Promise.all([removedLane, Note.remove({ _id: { $in: removedLane.notes } }).exec()]);
    }
  })
  .then(([removedLane, removedNotesCount]) => {
    if (removedLane) {
      res.json(removedNotesCount);
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

export function updateLane(req, res) {
  if (!req.body.name && !req.body.notes) {
    res.status(403).end();
  } else {
    const updateContent = Object.assign({},
      req.body.name ? { name: req.body.name } : {},
      req.body.notes ? { notes: req.body.notes } : {});

    Lane.findByIdAndUpdate(req.params.laneId, { $set: updateContent }).exec()
    .then(lane => {
      if (lane) {
        res.status(200).end();
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}
