const connection = require("../config/connection");
const { Thought, User } = require("../models");
const { getRandomUser, getRandomEmail, getRandomThoughts } = require("./data");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Drop existing users
  await User.deleteMany({});

  // Create empty array to hold the students
  const users = [];
  const thoughts = getRandomThoughts(13);

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 5; i++) {
    // Get some random assignment objects using a helper function that we imported from ./data
    const thoughts = getRandomThoughts(13);
    const user = getRandomUser();
    const email = getRandomEmail();

    users.push({
      user,
      email,
      thoughts,
    });
  }

  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info("Seeding complete! 🌱");
  process.exit(0);
});
