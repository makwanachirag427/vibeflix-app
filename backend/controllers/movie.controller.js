import { fetchFromTmdb } from "../services/tmdb.service.js";

export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const trendingMovie =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({ success: true, content: trendingMovie });
  } catch (error) {
    console.log("Error in getTrendingMovie controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    console.log("Error in getMovieTrailers controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMovieDetails = async (req, res) => {
  try {
      const { id } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    );
     res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    console.log("Error in getMovieDetails controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarMovies = async (req, res) => {
  try {
      const { id } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`
    );
     res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.log("Error in getSimilarMovies controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getMoviesByCategory = async (req, res) => {
  try {
       const { category } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`
    );
     res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getMoviesByCategory controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
