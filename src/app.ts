import express, { Application } from "express";
import { notFound } from "./app/middleware/notFound";
import { globalError } from "./app/middleware/globalError";
import { router } from "./app/routes";

export const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth server is running.......");
});

app.use("/api/v1", router);

//not found route
app.use(notFound);

//global error handler
app.use(globalError);
