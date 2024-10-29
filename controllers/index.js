const { Schema } = require("mongoose");
const mongodb = require("../db/mongo");
const ObjectId = require("mongodb").ObjectId;
const postSchema = require("../models/posts");

//login request
const login = async (req, res) => {};

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

const createUser = async (req, res) => {
  try {
    const usersArr = await mongodb.getDb().db().collection("users").find();
    const users = usersArr.toArray().then((lists) => {
      for (let i = 0; i < lists.length; i++) {
        if (lists[i].userName == req.body.userName) {
          console.log(i);
          throw new Error("username is already in use");
        }
      }
    });
    try {
      const user = {
        userName: req.body.userName,
        password: req.body.password,
        posts: [],
      };

      const response = await mongodb
        .getDb()
        .db()
        .collection("users")
        .insertOne(user);
      if (response.acknowledged) {
        res.status(201).json(response);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
};

module.exports = { getAllPosts, createPost, getAllUsers, createUser };
