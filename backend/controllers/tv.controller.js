import { fetchFromTmdb } from "../services/tmdb.service.js";

export const getTrendingShow = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/tv/day?language=en-US"
    );
    const trendingShow =
      data.results[Math.floor(Math.random() * data.results.length)];
    res.status(200).json({ success: true, content: trendingShow });
  } catch (error) {
    console.log("Error in getTrendingShow controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getShowTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`
    );
    res.status(200).json({ success: true, trailers: data.results });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    console.log("Error in getShowTrailers controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getShowDetails = async (req, res) => {
  try {
      const { id } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US`
    );
     res.status(200).json({ success: true, details: data });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).send(null);
    }
    console.log("Error in getShowDetails controller", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSimilarShows = async (req, res) => {
  try {
      const { id } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=1`
    );
     res.status(200).json({ success: true, similar: data.results });
  } catch (error) {
    console.log("Error in getSimilarShows Controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getShowsByCategory = async (req, res) => {
  try {
       const { category } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`
    );
     res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getShowsByCategory controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
