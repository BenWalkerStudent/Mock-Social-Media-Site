const routes = require("express").Router();

const posts = require("./route/posts");
const log = require("./route/login");
const users = require("./route/users");

routes.use("/posts", posts);
routes.use("/", users);
routes.use("/log", log);

module.exports = routes;
