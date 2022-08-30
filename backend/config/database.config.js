module.exports = {
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  port: process.env.DATABASE_PORT,
  password: process.env.DATABASE_PWD,
  db: process.env.DATABASE_NAME,
  dialect: "mysql",
};
