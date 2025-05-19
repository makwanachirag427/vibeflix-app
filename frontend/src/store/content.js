import axios from "axios";
import { create } from "zustand";

export const useContentStore = create((set) => ({
  contentType: "movie",
  setContentType: (type) => set({ contentType: type }),
  watchList: [],
  setWatchList: (list) => set({ watchList: list }),
  getWatchList: async () => {
    try {
      const res = await axios.get("/api/v1/watchlist");
      set({ watchList: res.data.watchlist });
    } catch (error) {
      console.error(error.message);
    }
  },
}));
