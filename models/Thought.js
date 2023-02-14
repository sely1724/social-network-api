const { Schema, Types, model } = require("mongoose");
const moment = require("moment");

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
      get: (createdAtTime) =>
        moment(createdAtTime).format("MMMM Do YYYY, [at] hh:mm a"),
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
      get: (createdAtTime) =>
        moment(createdAtTime).format("MMMM Do YYYY, [at] hh:mm a"),

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
thoughtSchema
  .virtual("reactionCount")
  // Getter
  .get(function () {
    return `${this.reactions.length}`;
  });

// Initialize our Thought model
const Thought = model("thought", thoughtSchema);

module.exports = Thought;
