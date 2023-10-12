import postgres from "../utils/postgres.js";

const authModel = {
  signUp: async (username, email, password) => {
    try {
      const newUser = await postgres.fetchData(
        "INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *",
        [username, email, password]
      );
      return newUser;
    } catch (error) {
      console.log(error);
    }
  },
  login: async (email, password) => {
    try {
      const existingUser = await postgres.fetchData(
        "SELECT * FROM users WHERE email = $1 and password = $2",
        [email, password]
      );
      return existingUser;
    } catch (error) {
      console.log(error);
    }
  },
};

export default authModel;
