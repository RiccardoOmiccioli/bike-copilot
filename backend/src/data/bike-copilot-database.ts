import mongoose from "mongoose";

import {Environment} from "../environment";
import {User, USER_SCHEMA} from "./schemas/user";

/**
 * Database needed to access related data.
 */
export class BikeCopilotDatabase {

    /** A singleton of the database used to access data belonging to the application. */
    public static readonly Singleton: BikeCopilotDatabase = new BikeCopilotDatabase();

    /** The collection of users. */
    public readonly Users: mongoose.Model<User>;

    private readonly connection : mongoose.Connection;

    private constructor() {
        this.connection = mongoose.createConnection(
            `mongodb://${Environment.DATABASE_HOST}`, {
            authSource: "admin",
            user: Environment.DATABASE_USERNAME,
            pass: encodeURIComponent(Environment.DATABASE_PASSWORD),
            dbName: Environment.DATABASE_NAME,
        });
        this.Users = this.connection.model<User>('users', USER_SCHEMA);
    }
}

/** Used for creating user documents. Alias for {@link BikeCopilotDatabase.Singleton.Users}. */
export const UserDocument = BikeCopilotDatabase.Singleton.Users;
