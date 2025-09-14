import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import axios from "../utils/axios";
import { useContentStore } from "../store/content";
const WatchListPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const { watchList, setWatchList, getWatchList } = useContentStore();

  const filteredItems = watchList.filter(
    (item) => item.contentType === activeTab
  );

  const handleDeleteButton = async (id, contentType) => {
    try {
      await axios.delete(`/api/v1/watchlist/remove/${id}`, {
        data: { contentType },
      });
      setWatchList(
        watchList.filter(
          (item) => item.id !== id || item.contentType !== contentType
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getWatchList();
  }, [watchList,getWatchList]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center">
        <div className="flex justify-center gap-5 mt-5 mb-10">
          {["movie", "tv"].map((type) => (
            <button
              key={type}
              className={` py-2 px-4 rounded hover:bg-red-700 ${
                activeTab === type ? "bg-red-600" : "bg-gray-800"
              }`}
              onClick={() => setActiveTab(type)}
            >
              {type === "movie" ? "Movies" : "Shows"}
            </button>
          ))}
        </div>
        <div className="max-w-[90vw] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 pb-20 mx-auto">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div
                className="relative w-[50vw] sm:w-[220px] rounded-sm p-1 bg-gray-800 border border-gray-700 group"
                key={item.id}
              >
                <Link to={`/watch/${item.id}`}>
                  <img
                    src={SMALL_IMG_BASE_URL + item.image}
                    alt=" poster image"
                    className="rounded-sm border border-gray-700 h-full"
                  />
                </Link>
                <button
                  type="button"
                  className="hidden absolute top-5 right-5 group-hover:block  rounded-full p-1.5 border-2 border-white hover:border-red-600  bg-slate-600 hover:bg-slate-700  z-10 transition-all duration-300 group/button"
                  onClick={() => handleDeleteButton(item.id, item.contentType)}
                >
                  <X className="group-hover/button:text-red-600 transition-all duration-300" />
                </button>
              </div>
            ))
          ) : (
            <h4 className="col-span-full  text-center text-gray-400 hover:text-gray-font-semibold">
              No{" "}
              <span className="text-red-600 font-bold">
                {activeTab === "movie" ? "movies" : "tv shows"}
              </span>{" "}
              in your watchlist.
            </h4>
          )}
        </div>
      </div>
    </div>
  );
};
export default WatchListPage;
