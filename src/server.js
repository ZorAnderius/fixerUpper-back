import app from "./app.js";
import db from "./db/models/index.js";
import seedDatabase from "./db/seeds.js";

const PORT = 3000;

const setupServer = async () => {
  await db.sequelize.authenticate();
  console.log('\x1b[32mDatabase connected successfully!\x1b[0m');
  // await db.sequelize.sync({ force: true });
  // await seedDatabase();
  app.listen(PORT, () => {
    console.log(`\x1b[35mServer is running on the port ${PORT}\x1b[0m`);
  })
}
export default setupServer;