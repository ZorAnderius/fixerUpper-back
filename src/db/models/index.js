import sequelize from "../sequelize.js";

const db = {};

db.sequelize = sequelize;
db.Sequelize = sequelize.Sequelize;

export default db;