import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorHandler } from "./middlewares/error.middleware";
import { swaggerUi, specs } from "./config/swagger";

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

app.use("/api", routes);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Error handling middleware
app.use(errorHandler);

export default app;
