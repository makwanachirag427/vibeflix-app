import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../utils/axios";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatDate } from "../utils/dateFunctions";
import { Trash } from "lucide-react";
import toast, { ErrorIcon } from "react-hot-toast";

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  const deleteSearchItem = async (id) => {
    try {
      await axios.delete(`/api/v1/search/history/${id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== id));
    } catch (error) {
      console.warn(error.message);
      toast.error("Failed to delete search item");
    }
  };

  useEffect(() => {
    const getSearchHistory = async () => {
      try {
        const res = await axios.get("/api/v1/search/history");
        setSearchHistory(res.data.content);
      } catch (error) {
        console.error(error.message);
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  console.log(searchHistory);

  if (searchHistory.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-6xl px-4 py-8 mx-auto">
          <h2 className="text-3xl mb-8 font-bold">Search History</h2>
          <div className="flex justify-center items-center h-90">
            <p className="text-xl">No search history found</p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="max-w-6xl px-4 py-8 mx-auto">
        <h2 className="text-3xl mb-8 font-bold">Search History</h2>
        {/* history container  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 cursor-pointer">
          {searchHistory.length > 0 &&
            searchHistory.map((item) => (
              <div
                key={item.createdAt}
                className="flex items-start justify-between gap-2 px-2 py-3  bg-gray-900 rounded border border-gray-700 max-w-[350px]  w-full mx-auto"
              >
                <img
                  src={SMALL_IMG_BASE_URL + item.image}
                  alt=""
                  className="rounded-full  size-16 object-cover border border-gray-700"
                />
                <div className="flex flex-col w-[35%]">
                  <p>{item.title}</p>
                  <p className="text-gray-400  text-xs">
                    {formatDate(item.createdAt)}
                  </p>
                </div>
                <span
                  className={`text-xs px-4 py-1 h-fit rounded-full ${
                    item.searchType === "movie"
                      ? "bg-red-600"
                      : item.searchType === "tv"
                      ? "bg-green-700"
                      : "bg-blue-600"
                  }`}
                >
                  {item.searchType === "tv"
                    ? "Show"
                    : item.searchType.toUpperCase()[0] +
                      item.searchType.slice(1)}
                </span>
                <button onClick={() => deleteSearchItem(item.id)}>
                  <Trash className="text-red-600 hover:fill-red-600 size-5" />
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default SearchHistoryPage;
