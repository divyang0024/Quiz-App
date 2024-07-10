import bcrypt from "bcryptjs";
const secret = "code once debug everywhere guess who i am ?";

const generateHash = (password) => {
  try {
    const hash = bcrypt.hashSync(password, 4);
    return hash;
  } catch (err) {
    console.log(err);
  }
};

const verifyHash = (password, hash) => {
  if (bcrypt.compareSync(password, hash)) {
    return true;
  } else {
    return false;
  }
};

export { generateHash, verifyHash };
