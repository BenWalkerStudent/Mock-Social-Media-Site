const express = require("express");
const routes = express.Router();

const controller = require("../../controllers");

routes.get("/", controller.getAllUsers);

module.exports = routes;
