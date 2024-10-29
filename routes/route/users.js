const express = require("express");
const routes = express.Router();

const controller = require("../../controllers");

routes.get("/", controller.getAllUsers);

routes.post("/create", controller.createUser);

module.exports = routes;
