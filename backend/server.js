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
import { fileURLToPath }  from "url"
import path,{dirname} from "path"

//middleware
import { protectRoute } from "./middleware/protectRoute.js";

const app = express();
const PORT = ENV_VARS.PORT;

// recreate __dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",protectRoute,movieRoutes);
app.use("/api/v1/tv",protectRoute,tvRoutes);
app.use("/api/v1/search",protectRoute,searchRoutes);
app.use("/api/v1/watchlist",protectRoute,watchlistRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.use((req, res, next) => {
    console.log("Incoming request URL:", req.url);
    next();
  });

  
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
  
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is listening on port ${PORT}`);
});
