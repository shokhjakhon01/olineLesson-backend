import postgres from "../utils/postgres.js";

const subcategoryModel = {
  getVideosForSubcategory: async (categoryName, subcategoryName) => {
    try {
      const videos = await postgres.fetchData(
        `SELECT v.video_id, v.title, v.link, v.date
        FROM videos v
        INNER JOIN sup_categories sc ON v.sup_category_id = sc.sup_id
        INNER JOIN categories c ON sc.cat_ref_id = c.cat_id
        WHERE c.cat_name = $1 AND sc.sup_name = $2`,
        [categoryName, subcategoryName]
      );
      return videos;
    } catch (error) {
      console.log(error);
    }
  },
  getVideoWithCommentsAndUser: async (videoId) => {
    try {
      const videoInfo = await postgres.fetchData(
        `SELECT
          v.title AS video_title,
          c.comment,
          u.username AS commenter_username
        FROM
          videos v
        LEFT JOIN
          comments c ON v.video_id = c.video_id
        LEFT JOIN
          users u ON c.user_id = u.user_id
        WHERE
          v.video_id = $1`,
        [videoId]
      );
      return videoInfo;
    } catch (error) {
      console.log(error);
    }
  },
};

export default subcategoryModel;
