import User from "../models/user.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import { fetchFromTmdb } from "../services/tmdb.service.js";

export const signup = async (req, res) => {
  try {
    //get all credentials from req body
    const { email, username, password } = req.body;

    //check for all fields
    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    // check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email format" });
    }

    //check for password length
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "password must be atleast 6 characters long",
      });
    }

    //check for existing user with email
    const userExitsWithEmail = await User.findOne({ email });
    if (userExitsWithEmail) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    //check for existing user with username
    const userExitsWithUsername = await User.findOne({ username });
    if (userExitsWithUsername) {
      return res
        .status(400)
        .json({ success: false, message: "username already exists" });
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const PROFILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];

    const image = PROFILE_PICS[Math.floor(Math.random() * PROFILE_PICS.length)];

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image,
    });

    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    newUser.password = "";

    return res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.log("error in signup controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fileds are required" });
    }

    console.log("check 1");

    const user = await User.findOne({ email: email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    console.log("check 2");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    generateTokenAndSetCookie(user._id, res);

    user.password = "";

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.log("error in login controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Successfully logged out" });
  } catch (error) {
    console.log("error in logout controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const authCheck = async (req, res) => {
  try {
    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("error in authCheck controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const trending = async (req, res) => {
  try {
    const data = await fetchFromTmdb(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US"
    );
    const trending = data.results.slice(0, 10);
    res.status(200).json({ success: true, trending });
  } catch (error) {
    console.log("error in trending controller ", error.message);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

