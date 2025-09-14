import { useState } from "react";
import Navbar from "../components/Navbar";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { Loader, Search } from "lucide-react";
import { useContentStore } from "../store/content";
import axios from "../utils/axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState("movie");
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    tab === "movie" ? setContentType("movie") : setContentType("tv");
    setActiveTab(tab);
    setResults([]);
    setSearchTerm("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      console.log(res.data.content);
      setResults(res.data.content);
      setSearchTerm("");
    } catch (error) {
      if (error.response.status === 404) {
        toast.error(
          "Nothing found, Make sure that you are searching under the right category."
        );
      } else {
        toast.error("An error occurred, Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-col items-center max-w-[85vw] mx-auto">
        {/* navigation buttons */}
        <div className="flex justify-center gap-3 mt-8 mb-4">
          {["movie", "tv", "person"].map((type) => (
            <button
              key={type}
              className={` py-2 px-4 rounded hover:bg-red-700 ${
                activeTab === type ? "bg-red-600" : "bg-gray-800"
              }`}
              onClick={() => handleTabClick(type)}
            >
              {type === "movie"
                ? "Movies"
                : type === "tv"
                ? "TV shows"
                : "Person"}
            </button>
          ))}
        </div>
        {/* input  */}
        <form
          onSubmit={handleFormSubmit}
          className="flex mb-10 max-w-2xl gap-2 w-full"
        >
          <input
            type="text"
            placeholder={`Search for a ${
              activeTab === "tv" ? "tv shows" : activeTab
            }`}
            className="py-2 px-4 bg-gray-800 w-full rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="p-2 bg-red-600 rounded hover:bg-red-700 transition-all duration-300">
            <Search />
          </button>
        </form>
        {/* search result container  */}
        <div className="max-w-[90vw] grid col-span-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 p-4 pb-20 mx-auto">
          {loading && (
            <div className="col-span-full w-full h-full">
              <Loader className="animate-spin size-10 text-red-600" />
            </div>
          )}
          {!loading &&
            results.map((result) => {
              if (!result.poster_path && !result.profile_path) {
                return null;
              }

              return (
                <div
                  className="relative w-full sm:w-[220px] rounded-sm p-1.5 bg-gray-800 border border-gray-700 overflow-hidden  group flex flex-col"
                  key={result.id}
                >
                  {activeTab === "person" ? (
                    <>
                      <img
                        src={SMALL_IMG_BASE_URL + result.profile_path}
                        alt=" poster image"
                        className="rounded-sm border border-gray-700 h-75 w-full"
                      />
                      <h4 className="px-1 pt-2 font-bold">{result.name}</h4>
                    </>
                  ) : (
                    <Link to={`/watch/${result.id}`}>
                      <img
                        src={SMALL_IMG_BASE_URL + result.poster_path}
                        alt=" poster image"
                        className="rounded-sm border border-gray-700 h-75 w-full bg-contain"
                      />
                    </Link>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;
