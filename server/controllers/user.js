import { User } from "../models/userSchema.js";
import { Results } from "../models/resultSchema.js";
import { generateHash, verifyHash } from "../service/user.js";
import jwt from "jsonwebtoken";

const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  const data = await User.find(
    { email: email },
    { password: 1, name: 1, email: 1 }
  )
    .then((data) => data)
    .catch((err) => console.log(err));
  const hash = data[0] === undefined ? "" : data[0].password;
  const result = verifyHash(password, hash);
  if (result) {
    res.json({
      msg: true,
      name: data[0].name,
      email: data[0].email,
    });
  } else {
    res.json({
      msg: false,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  let hashPass;
  if (!name && !password && !email) {
    res.json({
      error: "you need to fill all the fields!!!!",
    });
  } else {
    hashPass = generateHash(password);
    console.log(hashPass);
  }
  try {
    await User.create({ name: name, password: hashPass, email: email });
    res.json({
      name: name,
      password: hashPass,
      email: email,
    });
  } catch (err) {
    res.json({
      ERROR_MESSAGE: err,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const { email } = req.body;
    const users = await User.find({ email });
    if (users.length > 0) {
      res.json({
        msg: true,
      });
    } else {
      res.json({ msg: false });
    }
  } catch (err) {
    console.log(err);
  }
};

const getUserResults = async (req, res) => {
  const { username } = req.body;
  try {
    const results = await Results.find({ username });
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error fetching user results" });
  }
};

export { verifyUser, registerUser, getUsers, getUserResults };
