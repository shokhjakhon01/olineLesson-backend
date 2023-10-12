import "dotenv/config";
const PORT = process.env.PORT || 3000;

const pgConfig = {
  user: process.env.PUSER,
  host: process.env.HOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
};

export { PORT, pgConfig };
