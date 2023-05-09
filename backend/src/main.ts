import {ApplicationHandlers} from "./controllers/application-handlers";
import cors from "cors"
import {CorsOrigins} from "./utils/cors-origins"
import {Environment} from "./environment"
import express from "express"
import {routers} from "./routes/routers";

type Application = express.Express;
const app: Application = express();

app.use(cors({
  origin: CorsOrigins([`http://${Environment.FRONTEND_HOST}`]),
  credetials: true,
  optionsSuccessStatus: 200,
  exposedHeaders: ['set-cookie'],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  methods: ["GET","HEAD","POST","PATCH","PUT","DELETE","OPTIONS"],
}));

app.use(express.json());

routers.forEach((router) => app.use(router));
app.use(ApplicationHandlers.notFound);

app.listen(Environment.BACKEND_PORT, Environment.BACKEND_HOST, () => {
  console.log(`Server is listening at ${Environment.BACKEND_HOST}:${Environment.BACKEND_PORT}`);
}).on("error", (err: {message: any;}) => console.error(err.message));