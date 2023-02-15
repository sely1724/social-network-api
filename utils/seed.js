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
  const thoughts = getRandomThoughts(2);

  // Loop 20 times -- add students to the students array
  for (let i = 0; i < 20; i++) {
    const username = getRandomUser();
    const email = getRandomEmail();
    const thoughts = getRandomThoughts(2);

    users.push({
      username,
      email,
      thoughts,
    });
    console.log(users);
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
