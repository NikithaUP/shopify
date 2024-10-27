const app = require("./app");
const path = require("path");
const connectDatabase = require("./config/database");


connectDatabase();

const server=app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port: ${process.env.PORT} in ${process.env.NODE_ENV}`
  );
});

process.on('unhandledRejection', (err) => {
  console.error(`Unhandled Rejection at: ${err.message}`);
  console.log('Shutting down the server due to some unhandled rejection');
  server.close(() => {
    process.exit(1);
  })
})


process.on('uncaughtException', (err) => {
  console.error(`Unhandled Rejection at: ${err.message}`);
  console.log("Shutting down the server due to some uncaught exception rejection");
  server.close(() => {
    process.exit(1);
  });
})
 
