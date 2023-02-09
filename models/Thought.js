const { Schema, Types } = require("mongoose");

// ^^^ do we need to include model up here???

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: { type: String, required: true, maxlength: 280 },
    username: { type: String, required: true },
    createdAt: {
      type: Date,
      default: Date.now, // TODO: !!!!!!!!!!!!  // Use a getter method to format the timestamp on query
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280, // TODO: !!!!!!    add created at
    },
    date: {
      type: Date,
      default: Date.now,

      // getter method to format the timestamp on query.
    },
    username: { type: String, required: true },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);
// Schema Settings:

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.

module.exports = thoughtSchema;
