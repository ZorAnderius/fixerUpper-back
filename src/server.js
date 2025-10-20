import app from './app.js';
import ENV_VARIABLES from './constants/envVars.js';
import db from './db/models/index.js';
import './cron/cleanTokenSchedult.js';
import env from './utils/envConfig.js';

const PORT = env(ENV_VARIABLES.PORT, 3000);

/**
 * Sets up the Express server, syncs Sequelize models,
 * and seeds initial data from JSON files.
 *
 * @async
 */
const setupServer = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('\x1b[32mDatabase connected successfully!\x1b[0m');
    app.listen(PORT, () => {
      console.log(`\x1b[35mServer is running on the port ${PORT}\x1b[0m`);
    });
  } catch (error) {
    throw new Error(error);
  }
};

export default setupServer;