const { Schema } = require("mongoose");
const mongodb = require("../db/mongo");
const ObjectId = require("mongodb").ObjectId;
const postSchema = require("../models/posts");

//post requests
const getAllPosts = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("posts").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const createPost = async (req, res) => {
  try {
    const post = new postSchema({
      title: req.body.title,
      content: req.body.content,
      author: {
        userId: "67167e00bb47ffac5914956b",
        username: "test",
      },
      createdAt: Date,
      comments: [],
    });
    const response = await mongodb
      .getDb()
      .db()
      .collection("posts")
      .insertOne(post);

    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

const deletePost = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDb()
      .db()
      .collection("posts")
      .deleteOne({ _id: userId }, true);
    if (response.acknowledged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//user requests
const getAllUsers = async (req, res) => {
  try {
    const result = await mongodb.getDb().db().collection("users").find();
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const findOneUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .find({ _id: userId });
    result.toArray().then((lists) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(lists[0]);
      return lists[0];
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createUser = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const existingUser = await db
      .collection("users")
      .findOne({ userName: req.body.userName });

    if (existingUser) {
      return res.status(409).json("Username is already in use");
    }

    const user = {
      userName: req.body.userName,
      password: req.body.password,
      posts: [],
    };

    await db.collection("users").insertOne(user);
    res.status(201).json("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json("An error occurred while creating the user");
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDb()
      .db()
      .collection("users")
      .deleterOne({ _id: userId }, true);
    if (response.acknowledged) {
      res.status(200).send(response);
    } else {
      res
        .status(500)
        .json(
          response.error || "Some error occured while deleting the student."
        );
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//login
const log = async (req, res) => {
  try {
    const db = mongodb.getDb().db();
    const existingUser = await db
      .collection("users")
      .findOne({ userName: req.body.userName });
    if (existingUser) {
      const result = await mongodb
        .getDb()
        .db()
        .collection("users")
        .find({ userName: req.body.userName });
      result.toArray().then((lists) => {
        if (req.body.password == lists[0].password) {
          console.log("login was successful");
        }
      });
    } else {
      throw new Error("no user with that name");
    }
  } catch (error) {}
};

module.exports = {
  getAllPosts,
  createPost,
  deletePost,
  getAllUsers,
  createUser,
  findOneUser,
  deleteUser,
  log,
};
