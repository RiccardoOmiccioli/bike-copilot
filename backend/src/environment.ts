import {Time} from "./utils/time";

export class Environment {

    /** The host for the backend application. */
    public static readonly BACKEND_HOST: string = "127.0.0.1";
    /** The port for the backend application. */
    public static readonly BACKEND_PORT: number = 3001;

    /** The host for the frontend application. */
    public static readonly FRONTEND_HOST: string = "127.0.0.1";
    /** The port for the frontend application. */
    public static readonly FRONTEND_PORT: number = 3000;

    /** The host for the backend database. */
    public static readonly DATABASE_HOST: string = "127.0.0.1";
    /** The port for the backend database. */
    public static readonly DATABASE_PORT: number = 27017;

    /** The duration in milliseconds of a new session before expiration. */
    public static readonly SESSION_DURATION: number = 1 * Time.Days;

}