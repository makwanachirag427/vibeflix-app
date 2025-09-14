// imports
import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import cors from "cors";

// routes
import authRoutes from "./routes/auth.route.js";
import movieRoutes from "./routes/movie.route.js";
import tvRoutes from "./routes/tv.route.js";
import searchRoutes from "./routes/search.route.js";
import watchlistRoutes from "./routes/watchlist.route.js";

//middleware
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const PORT = ENV_VARS.PORT;
const frontendURL = ENV_VARS.NODE_ENV === "development" ? " http://localhost:5173" : ""


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin : frontendURL,
  credentials : true,
}));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", protectRoute, movieRoutes);
app.use("/api/v1/tv", protectRoute, tvRoutes);
app.use("/api/v1/search", protectRoute, searchRoutes);
app.use("/api/v1/watchlist", protectRoute, watchlistRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
