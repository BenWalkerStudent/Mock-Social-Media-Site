const express = require("express");
const cors = require("cors");
const mongodb = require("./db/mongo");

const routes = require("./routes/connect");
const app = express();

const PORT = 3001;

app
  .use(cors())
  .use(express.json())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
  })
  .use("/", require("./routes/connect"));
mongodb.initDb((err) => {
  app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
});
