import axios from "../utils/axios";
import { create } from "zustand";
import { toast } from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isSigningIn: false,
  isCheckingAuth: true,

  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ user: null, isSigningUp: false });
    }
  },

  signin: async (credentials) => {
    set({ isSigningIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isSigningIn: false });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
      set({ user: null, isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message || "An error occured");
    }
  },

  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      console.warn(error.message)
      set({ user: null, isCheckingAuth: false });
    }
  },
}));
