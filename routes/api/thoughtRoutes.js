const router = require("express").Router();
const {
  getThought,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../../controllers/thoughtController.js");

// methods that use /api/thoughts:
router.route("/").get(getThought).post(createThought);

//  methods that use /api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

//  methods that use /api/thoughts/:thoughtId
router.route("/:thoughtId/reactions").post(createReaction);

router.route("/:thoughtId/reactions/reactionId").delete(deleteReaction);
module.exports = router;
