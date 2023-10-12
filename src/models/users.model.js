import postgres from "../utils/postgres.js";

const userModel = {
  getAllUsers: async () => {
    const users = await postgres.fetchData("SELECT * FROM users");
    return users;
  },
  getUser: async (email, password) => {
    const existingUser = await postgres.fetchData(
      "SELECT * FROM users WHERE email = $1 and password = $2",
      [email, password]
    );
    return existingUser;
  },
};

export default userModel;
