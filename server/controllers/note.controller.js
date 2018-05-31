import Note from '../models/note';
import Lane from '../models/lane';

export function addNote(req, res) {
  if (!req.body.task) {
    res.status(403).end();
  } else {
    new Note(req.body).save()
    .then(savedNote => Promise.all([savedNote, Lane.findById(req.params.laneId)]))
    .then(([savedNote, lane]) => {
      if (lane) {
        lane.notes.push(savedNote);
        return Promise.all([savedNote, lane.save()]);
      }
    })
    .then(([savedNote, savedLane]) => {
      if (savedNote && savedLane) {
        res.json({ note: savedNote, lane: savedLane });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).send(err);
    });
  }
}

export function getNote(req, res) {
  Note.findById(req.params.noteId).exec()
  .then(note => {
    if (note) {
      res.json({ note });
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

export function deleteNote(req, res) {
  Lane.findById(req.params.laneId).exec()
  .then(foundLane => {
    if (foundLane) {
      const index = foundLane.notes.findIndex(n => String(n._id) === req.params.noteId);
      if (index >= 0) {
        foundLane.notes.splice(index, 1);
      }
      return foundLane.save();
    }
  })
  .then(foundLane => Promise.all([foundLane, Note.findByIdAndRemove(req.params.noteId).exec()]))
  .then(([foundLane, removedNote]) => {
    if (foundLane && removedNote) {
      res.json({ lane: foundLane });
    } else {
      res.status(404).end();
    }
  })
  .catch(err => {
    res.status(500).send(err);
  });
}

export function updateNote(req, res) {
  if (!req.body.task) {
    res.status(403).end();
  } else {
    Note.findByIdAndUpdate(req.params.noteId, { $set: { task: req.body.task } }).exec()
    .then(note => {
      if (note) {
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
