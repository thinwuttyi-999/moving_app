import "dotenv/config";
import express from "express";
import cors from "cors";
import { router as movieRouter } from "./src/routes/movies";
import { router as userRouter } from "./src/routes/users";
import { router as adminRouter } from "./src/routes/admin"; 

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.json({ msg: "API running..." }));

app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/admin", adminRouter);

app.listen(8800, () => console.log("Server running at http://localhost:8800"));