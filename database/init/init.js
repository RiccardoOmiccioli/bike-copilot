const workdir = pwd() + "docker-entrypoint-initdb.d";

//UTILS
load(workdir + "/utils/mongo.js");

//DATA
load(workdir + "/data/users.js");

//SCHEMAS
load(workdir + "/schemas/user-schema.js");


const connection = connect();
const bike_copilot_database = createOrGetDB(connection, "bike-copilot-database");

const user_collection = createAndClearCollection(bike_copilot_database, "users", user_schema);
user_collection.insertMany(users);