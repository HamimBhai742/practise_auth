import express, { Application } from "express";
import { notFound } from "./app/middleware/notFound";
import { globalError } from "./app/middleware/globalError";

export const app: Application = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Auth server is running.......");
});

//not found route
app.use(notFound);

//global error handler
app.use(globalError);
