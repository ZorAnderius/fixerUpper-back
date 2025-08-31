import setupServer from "./src/server.js"

const bootstrap = async () => {
  try {
    await setupServer();
  } catch (error) {
    console.error('Error during server setup:', error);
    process.exit(1);
  }
}

bootstrap();