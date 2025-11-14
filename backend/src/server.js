import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import { errorMiddleware } from "./middleware/errorMiddleware.js";
import cors from "cors";
import authRouter from "./routes/authRoute.js";

// create server
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRoutes);
app.use("/products", productRoutes);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
