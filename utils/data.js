const userArray = [
  "sely",
  "equilibrium",
  "isaacnewton",
  "testtest",
  "test2",
  "test3",
  "test4",
  "test5",
  "test6",
  "test7",
];

const emailArray = [
  "sely@gmail.com",
  "equilibrium@gmail.com",
  "isaacnewton@gmail.com",
  "testtest@gmail.com",
  "lydia@gmail.com",
  "kevin@gmail.com",
  "amy@gmail.com",
  "sylvia@gmail.com",
  "norman@gmail.com",
  "regex@gmail.com",
  "natasha@gmail.com",
  "lyonne@gmail.com",
];

const thoughtArray = [
  "testing",
  "hello",
  "my thought 1",
  "my thought 2",
  "one two",
  "buckle",
  "my shoe",
  "aloha",
  "me too",
  "same",
  "noice",
  "my thought 7",
];

const reactionArray = [
  "cool",
  "heck yeah",
  "nice",
  "love",
  "way to go",
  "lovely",
  "wow",
  "great",
];

// Get a random item given an array
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Get a random user
const getRandomUser = () => getRandomItem(userArray);

// get random email
const getRandomEmail = () => getRandomItem(emailArray);

// Function to generate random thoughts that we can add to user object.
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    results.push({
      thoughtText: getRandomItem(thoughtArray),
      reactions: getRandomItem(reactionArray),
    });
  }
  return results;
};

// Export the functions for use in seed.js
module.exports = { getRandomUser, getRandomEmail, getRandomThoughts };
