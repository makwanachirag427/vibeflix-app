import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: [Object],
    default: [],
  },
  reviews: {
    type: [Object],
    default: [],
  },
  watchlist: {
    type: [Object],
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

export default User;
