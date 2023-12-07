
module.exports = {
  dbConfig: {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Ps1234',
    database: process.env.DB_DATABASE || 'nodedb',
    port: process.env.DB_PORT || 3306,
  },
};
