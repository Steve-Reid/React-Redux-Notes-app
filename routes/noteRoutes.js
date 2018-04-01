const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const cleanCache = require('../middlewares/cleanCache');

const Note = mongoose.model('Note');

module.exports = app => {
  app.get('/api/notes/:id', requireLogin, async (req, res) => {
    const note = await Note.findOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(note);
  });

  app.get('/api/notes', requireLogin, async (req, res) => {
    const notes = await Note.find({ _user: req.user._id }).cache({
      key: req.user.id
    });

    res.send(notes);
  });

  app.post('/api/notes', requireLogin, cleanCache, async (req, res) => {
    const { title, body } = req.body;

    const note = new Note({
      title,
      body,
      _user: req.user.id
    });

    try {
      await note.save();
      res.send(note);
    } catch (err) {
      res.send(400, err);
    }
  });

  app.patch('/api/notes', requireLogin, cleanCache, async (req, res) => {
    const { _id, title, body } = req.body;
    const updatedAt = Date.now();
    const updatedAtString = new Date(updatedAt).toISOString();

    try {
      await Note.updateOne(
        {
          _user: req.user.id,
          _id
        },
        {
          title,
          body,
          updatedAt
        }
      );
      res.send({
        _id,
        title,
        body,
        updatedAt: updatedAtString
      });
    } catch (err) {
      console.log('------------------------------------');
      console.log(err);
      console.log('------------------------------------');
      res.send(400, err);
    }
  });

  app.delete('/api/notes/:id', requireLogin, cleanCache, async (req, res) => {
    const note = await Note.deleteOne({
      _user: req.user.id,
      _id: req.params.id
    });

    res.send(note);
  });
};
