import "reflect-metadata";
import "dotenv/config";

import "@shared/container";

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";

import { router } from "./routes";
import { AppError } from "@shared/infra/errors/AppError";

const app = express();

app.use(cors());
app.use(express.json());

app.use(router);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: "error",
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
