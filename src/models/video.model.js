import postgres from "../utils/postgres.js";

const videoModel = {
  createVideo: async (user_id, title, sup_category_id, link) => {
    try {
      const video = await postgres.fetchData(
        `
      INSERT INTO videos (user_id, title, sup_category_id, link)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `,
        [user_id, title, sup_category_id, link]
      );
      return video;
    } catch (error) {
      console.log(error);
    }
  },
  findByIdAndUpdate: async (sup_category_id, title, link, id, user_id) => {
    try {
      const data = await postgres.fetchData(
        `UPDATE videos SET sup_category_id = COALESCE($1, sup_category_id), 
      title = COALESCE($2, title),
      link = COALESCE($3, link) 
      WHERE video_id = $4 and user_id = $5 RETURNING *`,
        [sup_category_id, title, link, id, user_id]
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  findByIdAndDelete: async (video_id, user_id) => {
    try {
      const deletedVideo = await postgres.fetchData(
        "DELETE FROM videos WHERE video_id = $1 and user_id = $2 RETURNING *",
        [video_id, user_id]
      );
      return deletedVideo;
    } catch (error) {
      console.log(error);
    }
  },
};

export default videoModel;
