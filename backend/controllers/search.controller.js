import User from "../models/user.model.js";
import { fetchFromTmdb } from "../services/tmdb.service.js";

export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`
    );

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          title: data.results[0].title,
          image: data.results[0].poster_path,
          searchType: "movie",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in searchMovie controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const searchShow = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`
    );

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          title: data.results[0].name,
          image: data.results[0].poster_path,
          searchType: "tv",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in searchShow controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const data = await fetchFromTmdb(
      `https://api.themoviedb.org/3/search/person?query=${query}&include_adult=false&language=en-US&page=1`
    );

    await User.findByIdAndUpdate(req.user._id, {
      $push: {
        searchHistory: {
          id: data.results[0].id,
          title: data.results[0].name,
          image: data.results[0].profile_path,
          searchType: "person",
          createdAt: new Date(),
        },
      },
    });

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in searchPerson controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSearchHistory = async (req, res) => {
  try {
    res.status(200).json({ success: true, content: req.user.searchHistory });
  } catch (error) {
    console.log("Error in getSearchHistory controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const removeItemFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;
    id = parseInt(id);

    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id },
      },
    });
    res
      .status(200)
      .json({
        success: true,
        message: "Removed from search history successfully",
      });
  } catch (error) {
    console.log(
      "Error in removeItemFromSearchHistory controller ",
      error.message
    );
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
