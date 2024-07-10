import { User } from "../models/userSchema.js";
import { generateHash, verifyHash } from "../service/user.js";

const verifyUser = async (req, res) => {
  const { email, password } = req.body;
  const data = await User.find({ email: email }, { password: 1, name: 1 })
    .then((data) => data)
    .catch((err) => console.log(err));
  const hash = data[0] === undefined ? "" : data[0].password;
  const result = verifyHash(password, hash);
  if (result) {
    res.json({
      msg: true,
      name: data[0].name,
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

export { verifyUser, registerUser, getUsers };
