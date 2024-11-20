const express = require("express");
const routes = express.Router();

const controller = require("../../controllers");

routes.get("/", controller.getAllUsers);

routes.get("/:id", controller.findOneUser);

routes.post("/create", controller.createUser);

routes.delete("/:id", controller.deleteUser);

module.exports = routes;
