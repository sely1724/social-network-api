const { User, Thought } = require("../models");

module.exports = {
  // Get all users
  allUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get single user
  singleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Delete user and their associated thoughts
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id" })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: "User deleted." }))
      .catch((err) => res.status(500).json(err));
  },

  // Update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  // TODO: Figure out how to: Add friend to users friend list

  // Add a Friend.  Connect to User.

  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with this id" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    User.findOneAndDelete(
      { _id: req.params.userId },
      { $pull: { friends: { friendsId: req.params.friendsId } } },
      { runValidators: true, new: true }
    ).then((user) =>
      !user
        ? res.status(404).json({ message: "No user found with the id" })
        : res.json(user)
    );
  },
};
