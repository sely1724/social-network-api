const { Schema, Types } = require("mongoose");

const responseSchema = new Schema(
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
    reactions: [
      {
        // array of nested documents created within the reactionSchema?? how to create
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = responseSchema;

// Schema Settings:

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
