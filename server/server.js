import express from "express";
import morgan from "morgan";
import cors from "cors";
import "dotenv/config.js";
import router from "./routes/route.js";
import { userRouter } from "./routes/user.js";
import { connectDatabase } from "./database/connect.js";
const app = express();
const port = process.env.PORT || 3000;

//APP level middlewares.
app.use(morgan("tiny"));
app.use(express.json());
app.use(cors());

//routers
app.use("/api", router);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  try {
    res.json({
      msg: "this is root route.",
    });
  } catch (err) {
    console.log(err);
  }
});

const start = () => {
  try {
    app.listen(port, () => {
      console.log(`server id up and running at port : ${port}.`);
    });
    connectDatabase();
  } catch (err) {
    console.log(err);
  }
};

start();
