const { Schema, Types } = require("mongoose");

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"], // found on: https://masteringjs.io/tutorials/mongoose/mongoose-validate-unique-email
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      // array of _id values referencing the user model (self - reference)
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Indicate that we want virtuals to be included with our response, overriding the default behavior
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// TO DO !!!!!!!!!!!!!!!!!!!!!!!
// Schema Settings:
// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema
  .virtual("friendCount")

  .get(function () {
    return this + ".friends.length";
  });
const User = model("user", userSchema);

module.exports = User;
