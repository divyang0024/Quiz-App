import express from "express";
import * as ctrlr from "../controllers/controller.js";
const router = express.Router();

router
  .route("/questions")
  .get(ctrlr.getQuestions)
  .post(ctrlr.insertQuestions)
  .delete(ctrlr.dropQuestions);

router
  .use(express.urlencoded({ extended: true }))
  .post("/result", ctrlr.insertResult);
router.route("/result").get(ctrlr.getResult).delete(ctrlr.dropResult);

export default router;
