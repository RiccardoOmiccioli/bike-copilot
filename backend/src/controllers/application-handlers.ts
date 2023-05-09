import {RequestHandler, Request, Response, NextFunction} from "express";
import {StatusCodes} from "http-status-codes";

/**
 * Request handlers that handles generic tasks inside the application.
 */
export class ApplicationHandlers {
    public static readonly welcome: RequestHandler = (req: Request, res: Response) => {
        res.status(StatusCodes.OK).send("The backend server is up");
    }
    public static readonly notFound: RequestHandler = (req: Request, res: Response) => {
        res.status(StatusCodes.NOT_FOUND).send("Page Not Found");
    }
}