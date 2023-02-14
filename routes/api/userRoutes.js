const router = require("express").Router();
const {
  allUsers,
  singleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// methods that user api/users
router.route("/").get(allUsers).post(createUser);
// methods that user api/users/userID
router.route("/:userId").get(singleUser).put(updateUser).delete(deleteUser);
// methods that user api/users/userID/friends/friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
