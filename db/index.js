const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_CONN_DEV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("db connected"))
  .catch(e => {
    console.error("Connection error", e.message);
  });

const db = mongoose.connection;

module.exports = db;
