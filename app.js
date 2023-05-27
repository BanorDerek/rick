require("dotenv").config();
require("express-async-errors");
const cors = require("cors");
const helmet = require("helmet");
const authRoutes = require("./routes/authRoutes");
const bankRoutes = require("./routes/bankRoutes");
const express = require("express");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const morgan = require("morgan");

const app = express();
const connectDB = require("./database/connect");

app.use(express.json());
app.use(morgan("tiny"));
app.use(
  cors({
    origin: true,
    Credentials: true,
  })
);

app.use(helmet());

app.use("/auth", authRoutes);
app.use("/my-banks", bankRoutes);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
