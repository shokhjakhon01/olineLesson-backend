import postgres from "../utils/postgres.js";

const commentsModel = {
  createComment: async (user_id, video_id, comment) => {
    try {
      const data = await postgres.fetchData(
        `INSERT INTO comments (user_id, video_id, comment) VALUES ($1, $2, $3) RETURNING *`,
        [user_id, video_id, comment]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },

  findByIdAndUpdates: async (comment, comment_id, user_id) => {
    try {
      const data = await postgres.fetchData(
        "UPDATE comments SET comment = $1 WHERE coment_id = $2 and user_id = $3 RETURNING *",
        [comment, comment_id, user_id]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteComment: async (comment_id, user_id) => {
    try {
      const data = await postgres.fetchData(
        "DELETE FROM comments WHERE coment_id = $1 AND user_id = $2 RETURNING *",
        [comment_id, user_id]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default commentsModel;
