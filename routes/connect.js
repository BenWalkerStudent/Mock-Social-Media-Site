const routes = require("express").Router();

const posts = require("./route/posts");
const users = require("./route/users");

routes.use("/posts", posts);
routes.use("/", users);

module.exports = routes;
