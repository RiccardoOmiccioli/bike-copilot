import {ApplicationHandlers} from "../controllers/application-handlers";
import express from "express";

type ExpressRouter = express.Router;

export const MainRouter: ExpressRouter = express.Router()
    .get("/", ApplicationHandlers.welcome)
;