const mongoose = require("mongoose");

const DB = process.env.DATABASE;
mongoose
  .connect(DB)
  .then(() => {
    console.log("DATABASE CONNECTED");
  })
  .catch(() => {
    console.log("Database Connection FAILED!");
  });
