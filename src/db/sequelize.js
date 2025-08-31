import { Sequelize } from "sequelize";
import env from "../utils/envConfig.js";
import ENV_VARS from "../constants/envVars.js";

const sequelize = new Sequelize({
  dialect: env(ENV_VARS.POSTGRES.DB_DIALECT),
  username: env(ENV_VARS.POSTGRES.DB_USERNAME),
  port: env(ENV_VARS.POSTGRES.DB_PORT, 5432),
  password: env(ENV_VARS.POSTGRES.DB_PASSWORD),
  database: env(ENV_VARS.POSTGRES.DB_DATABASE),
  host: env(ENV_VARS.POSTGRES.DB_HOST),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    connectTimeout: 10000,
  },
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 5000,
  },
  timezone: '+00:00',
  define: {
    timestamps: true,
    underscored: true,
  }
});

export default sequelize;