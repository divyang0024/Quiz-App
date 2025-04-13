import express from "express";

import {
  registerUser,
  verifyUser,
  getUsers,
  getUserResults,
} from "../controllers/user.js";

const userRouter = express.Router();

userRouter
  .use(express.urlencoded({ extended: true }))
  .post("/getUsers", getUsers);

userRouter
  .use(express.urlencoded({ extended: true }))
  .post("/verifyUser", verifyUser);

userRouter
  .use(express.urlencoded({ extended: true }))
  .post("/registerUser", registerUser);

userRouter
  .use(express.urlencoded({ extended: true }))
  .post("/getUserResults", getUserResults);

export { userRouter };
