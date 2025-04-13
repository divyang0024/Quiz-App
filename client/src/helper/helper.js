import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as jose from "jose";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

// Secret for signing/verifying JWT
const secret = new TextEncoder().encode(
  "That rug really tied the room together."
);

// Score-related helpers
export const attemptsNumber = (result) => {
  return result.filter((r) => r !== undefined).length;
};

export const earnPointsNumber = (result, answers) => {
  return result
    .map((element, i) => answers[i] == element)
    .filter((i) => i)
    .map(() => 10)
    .reduce((p, c) => p + c, 0);
};

export const flagResult = (totalPoints, earnPoints) => {
  return earnPoints > (totalPoints * 50) / 100;
};

// Server communication helpers
export const getServerData = async (url) => {
  const data = await (await axios.get(url))?.data;
  return data;
};

export const postServerData = async (url, results, callback) => {
  const { result, username, attempts, points, achived } = results;

  await axios.post(url, {
    result,
    username,
    attempts,
    points,
    achived,
  });

  if (callback) callback();
};

// JWT handling
export const generateToken = async (user) => {
  try {
    return await new jose.SignJWT({
      name: user.name,
      email: user.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secret);
  } catch (err) {
    console.log("Token generation error:", err);
  }
};

export const verifyToken = async () => {
  const hash = Cookies.get("uid");
  if (!hash) return false;

  try {
    const { payload } = await jose.jwtVerify(hash, secret);
    const { name, email } = payload;
    return { name, email };
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return false;
  }
};

// Auth component
export const IsSignedUp = ({ children }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const isValid = await verifyToken();
      if (!isValid) {
        Cookies.remove("uid");
        navigate("/signup", { replace: true });
      } else {
        setValid(true);
      }
      setLoading(false);
    };
    verify();
  }, [navigate]);

  if (loading) return null; // Optional: Add a loader here
  return valid ? children : null;
};
