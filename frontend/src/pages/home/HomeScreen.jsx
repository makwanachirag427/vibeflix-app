import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
import {
  ORIGINAL_IMG_BASE_URL,
  TV_CATEGORIES,
  MOVIE_CATEGORIES,
} from "../../utils/constants";
import { Info, Play, Plus, X } from "lucide-react";
import { useContentStore } from "../../store/content";
import MovieSlider from "../../components/MovieSlider";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import { useAuthStore } from "../../store/authUser";

const HomeScreen = () => {
  const [isInWatchList, setIsInWatchList] = useState(false);
  const [imgLoading, setImgLoading] = useState(true);

  const { trendingContent } = useGetTrendingContent();
  const { contentType } = useContentStore();
  const { user } = useAuthStore();

  const handleWatchListButton = async () => {
    if (isInWatchList) {
      await axios.delete(`/api/v1/watchlist/remove/${trendingContent?.id}`, {
        data: { contentType: trendingContent?.media_type },
      });
      setIsInWatchList(false);
    } else {
      await axios.post(`/api/v1/watchlist/add/${trendingContent?.id}`, {
        image: trendingContent?.poster_path,
        name: trendingContent?.title || trendingContent?.name,
        contentType: trendingContent?.media_type,
      });
      setIsInWatchList(true);
    }
  };

  useEffect(() => {
    const exists = user?.watchlist?.some(
      (item) =>
        item.id === trendingContent?.id &&
        item.contentType === trendingContent?.media_type
    );

    setIsInWatchList(exists);
  }, [user, trendingContent?.id, trendingContent?.media_type]);

  useEffect(() => {
    setImgLoading(true);
  }, [contentType,trendingContent]);

  if (!trendingContent)
    return (
      <div className="h-screen text-white relative">
        <Navbar />
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
      </div>
    );

  return (
    <>
      <div className="relative min-h-screen text-white">
        <Navbar />
        {imgLoading && (
          <div className="absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer" />
        )}
        <img
          src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
          className="absolute top-0 left-0 h-full w-full -z-50 object-cover"
          onLoad={() => setImgLoading(false)}
        />
        <div
          className="absolute top-0 left-0 h-full w-full bg-black/50 -z-50"
          aria-hidden="true"
        />

        {/* info */}
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 sm:px-16 lg:px-32">
          {/* gradient  */}
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-b from-black top bg-transparent via-transparent to-transparent -z-10" />
          <div className="max-w-2xl">
            <h1 className="font-extrabold text-3xl sm:text-6xl text-balance mt-4">
              {trendingContent?.title || trendingContent?.name}
            </h1>
            <p className="mt-2 text-sm sm:text-lg">
              {trendingContent?.release_date?.split("-")[0] ||
                trendingContent?.first_air_date?.split("-")[0]}{" "}
              | {trendingContent?.adult ? "18+" : "PG13"}
            </p>
            <p className="mt-2 text-sm sm:text-lg">
              {trendingContent?.overview.length > 200
                ? trendingContent?.overview.slice(0, 200) + "..."
                : trendingContent?.overview}
            </p>
          </div>
          <div className="flex flex-col mt-8">
            <div className="flex">
              <Link
                to={`/watch/${trendingContent?.id}`}
                className="bg-white text-black font-bold flex items-center px-2 py-2 rounded hover:opacity-50"
              >
                <Play className="fill-black size-6 mr-2" />
                Play
              </Link>

              <Link
                to={`/watch/${trendingContent?.id}`}
                className="bg-gray-400/40 hover:bg-gray-400/50 flex items-center px-4 py-2 rounded ml-4 "
              >
                <Info className="mr-2 text-white" />
                More Info
              </Link>
            </div>
            {isInWatchList ? (
              <button
                className="w-fit bg-red-700/90 hover:bg-red-700 text-white font-semibold p-2 pr-3 rounded flex items-center gap-2 mt-4"
                onClick={handleWatchListButton}
              >
                <X />
                Remove from Watchlist
              </button>
            ) : (
              <button
                className="w-fit bg-white text-black hover:bg-gray-200 font-semibold p-2 pr-3 rounded flex items-center justify-between gap-2 mt-4"
                onClick={handleWatchListButton}
              >
                <Plus />
                Add to Watchlist
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col pt-4 pb-10 bg-black">
        {contentType === "movie"
          ? MOVIE_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))
          : TV_CATEGORIES.map((category) => (
              <MovieSlider key={category} category={category} />
            ))}
      </div>
    </>
  );
};
export default HomeScreen;
