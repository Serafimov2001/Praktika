const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/app", require("./routes/app.routes"));
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://DbUser:0vdkp9DflPCKn465@cluster0.7c9gb.mongodb.net/app?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
    app.listen(5000, () => {
      console.log("app start!!!");
    });
  } catch (e) {
    console.log("server error:", e);
    process.exit(1);
  }
}
start();
