// imports 
import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";

// routes
import authRoutes from "./routes/auth.route.js"
import movieRoutes from "./routes/movie.route.js"
import tvRoutes from "./routes/tv.route.js"
import searchRoutes from "./routes/search.route.js"
import watchlistRoutes from "./routes/watchlist.route.js"
import reviewRoutes from "./routes/review.route.js"

//middleware

const app = express();
const PORT = ENV_VARS.PORT;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",movieRoutes);
app.use("/api/v1/tv",tvRoutes);
app.use("/api/v1/search",searchRoutes);
app.use("/api/v1/watchlist",watchlistRoutes);
app.use("/api/v1/review",reviewRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
