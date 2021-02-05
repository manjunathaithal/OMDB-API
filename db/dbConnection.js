const mongoose = require("mongoose");
const mongouri = "mongodb://localhost:27017" + "/movie";
const mongodb = async () => {
  try {
    const con = await mongoose.connect(mongouri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.log("database is failed to connect", error);
  }
};
module.exports = mongodb;
