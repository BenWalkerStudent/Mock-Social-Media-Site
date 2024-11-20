const express = require("express");
const routes = express.Router();

const controller = require("../../controllers");

routes.get("/", controller.getAllPosts);

routes.post("/create", controller.createPost);

routes.delete("/:id", controller.deletePost);

module.exports = routes;
