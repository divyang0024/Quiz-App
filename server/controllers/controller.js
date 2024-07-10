import { Questions } from "../models/questionSchema.js";
import { Results } from "../models/resultSchema.js";
import questionJSON from "../database/data.js";

const getQuestions = async (req, res) => {
  try {
    const queue = await Questions.find();
    res.json(queue);
  } catch (err) {
    res.json({
      msg: err,
    });
  }
};
const insertQuestions = async (req, res) => {
  try {
    await Questions.insertMany(questionJSON);
    res.json({
      msg: "data created successfully",
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
};
const dropQuestions = async (req, res) => {
  try {
    await Questions.deleteMany();
    res.json({
      msg: "data deleted successfully",
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
};
const getResult = async (req, res) => {
  try {
    const results = await Results.find();
    res.json({
      msg: results,
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
};
const insertResult = async (req, res) => {
  const { username, result, attempts, points, achived } = req.body;
  try {
    await Results.create({
      username: username,
      result: result,
      attempts: attempts,
      points: points,
      achived: achived,
    });
    res.json({
      msg: "result inserted successfully",
    });
  } catch (err) {
    res.json({
      msg: "there is an error",
    });
  }
};
const dropResult = async (req, res) => {
  try {
    await Results.deleteMany();
    res.json({
      msg: "result deleted successfully",
    });
  } catch (err) {
    res.json({
      msg: err,
    });
  }
};
export {
  getQuestions,
  insertQuestions,
  dropQuestions,
  getResult,
  insertResult,
  dropResult,
};
