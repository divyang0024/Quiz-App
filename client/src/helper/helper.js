import { useSelector } from "react-redux";
import { redirect, useNavigate } from "react-router-dom";
import * as jose from "jose";
import axios from "axios";
import Cookies from "js-cookie";
import { Children, useEffect } from "react";

const secret = new TextEncoder().encode(
  "That rug really tied the room together."
);

export const attemptsNumber = (result) => {
  return result.filter((r) => r !== undefined).length;
};

export const earnPointsNumber = (result, answers) => {
  return result
    .map((element, i) => answers[i] == element)
    .filter((i) => i)
    .map((i) => 10)
    .reduce((p, c) => p + c, 0);
};

export const flagResult = (totalPoints, earnPoints) => {
  return earnPoints > (totalPoints * 50) / 100;
};

export const getServerData = async (url) => {
  const data = await (await axios.get(url))?.data;
  return data;
};
export const postServerData = async (url, results, callback) => {
  const { result, username, attempts, points, achived } = results;

  await axios.post(url, {
    result: result,
    username: username,
    attempts: attempts,
    points: points,
    achived,
  });
};
export const generateToken = async (user) => {
  try {
    return new jose.SignJWT({
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
  } catch (err) {
    console.log(err);
  }
};

export const verifyToken = async () => {
  const hash = Cookies.get("uid");
  if (hash === undefined) {
    return false;
  } else {
    try {
      const { payload } = await jose
        .jwtVerify(hash, secret)
        .then((data) => data);
      const { name, email } = payload;
      return { name, email };
    } catch (err) {
      console.log(err);
    }
  }
};

export const IsSignedUp = ({ children }) => {
  const navigate = useNavigate();
  const hash = Cookies.get("uid");

  useEffect(() => {
    if (hash === undefined) {
      navigate("/signup", { replace: true });
    }
  }, [hash, navigate]);

  return hash !== undefined ? children : null;
};
