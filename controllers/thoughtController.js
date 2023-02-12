// getThought,
// getSingleThought,
// createThought,
// updateThought,
// deleteThought,
// createReaction,
// deleteReaction,

const { Thought, User } = require("../models");

module.exports = {
  // Get all thoughts
  getThought(req, res) {
    Thought.find()
      // assume we're using routes/api/index.js thoughts plural
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // Get single thought
  // not quite sure where singular thought comes from?
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v") // what does this do?
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Create a thought. Accepts a request body with the entire Thought object.
  // Because thoughts are associated with Users, we then update the User who created the app and add the ID of the thought to the thoughts array
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Application created, but found no user with that ID",
            })
          : res.json("Created the application 🎉")
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // Delete a thought from db.  Looks for a thought by ID.
  // Then if the thought exists, we look for any users associated with th thought based on the thought ID and update the thoughts array for the User.
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with that ID" })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((user) =>
        !user
          ? res.status(404).json({
              message: "Thought deleted but no user with this id!",
            })
          : res.json({ message: "Thought successfully deleted!" })
      )
      .catch((err) => res.status(500).json(err));
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Add the whole body of a reaction to a thought.
  createReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with the id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // Delete whole body of reaction from thought
  deleteReaction(req, res) {
    Thought.findOneAndDelete(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought found with the id" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
};
