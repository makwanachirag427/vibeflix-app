import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";
import ReactPlayer from "react-player";
import { ORIGINAL_IMG_BASE_URL, SMALL_IMG_BASE_URL } from "../utils/constants";
import { formatReleasedDate } from "../utils/dateFunctions";
import WatchPageSkeleton from "../components/skeletons/WatchPageSkeleton";

const WatchPage = () => {
  const { id } = useParams();
  const [trailers, setTrailers] = useState([]);
  const [similarContent, setSimilarContent] = useState([]);
  const [contentDetails, setContentDetails] = useState({});
  const [currentTrailerIndex, setCurrentTrailerIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const { contentType, watchList, setWatchList,getWatchList } =
    useContentStore();

  const sliderRef = useRef(null);

  const scollLeft = () => {
    sliderRef.current.scrollBy({
      left: -sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };
  const scollRight = () => {
    sliderRef.current.scrollBy({
      left: sliderRef.current.offsetWidth,
      behavior: "smooth",
    });
  };

  const handlePrev = () => {
    if (currentTrailerIndex > 0) {
      setCurrentTrailerIndex((idx) => idx - 1);
    }
  };
  const handleNext = () => {
    if (currentTrailerIndex < trailers.length - 1) {
      setCurrentTrailerIndex((idx) => idx + 1);
    }
  };

  const handleWatchListButton = async () => {
    if (isInWatchList) {
      const res = await axios.delete(`/api/v1/watchlist/remove/${id}`, {
        data: { contentType },
      });
      setIsInWatchList(false);
      setWatchList(res.data.watchlist);
    } else {
      const res = await axios.post(`/api/v1/watchlist/add/${id}`, {
        image: contentDetails?.poster_path,
        name: contentDetails?.title || contentDetails?.name,
        contentType,
      });
      setIsInWatchList(true);
      setWatchList(res.data.watchlist);
    }
  };

  useEffect(() => {
    const getTrailers = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/trailers`);
        setTrailers(res.data.trailers);
      } catch (error) {
        if (error.message.includes("404")) {
          setTrailers([]);
        }
      }
    };
    getTrailers();
  }, [id, contentType]);

  useEffect(() => {
    const getContentDetails = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/details`);
        setContentDetails(res.data.details);
      } catch (error) {
        if (error.message.includes("404")) {
          setContentDetails(null);
        }
      }
    };
    getContentDetails();
  }, [id, contentType]);

  useEffect(() => {
    const getSimilarContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${id}/similar`);
        setSimilarContent(res.data.similar);
      } catch (error) {
        if (error.message.includes("404")) {
          setSimilarContent([]);
        }
      } finally {
        setLoading(false);
      }
    };
    getSimilarContent();
  }, [id, contentType]);

  useEffect(() => {
    getWatchList();
    const exists = watchList.some(
      (item) => item.id === id && item.contentType === contentType
    );
    setIsInWatchList(exists);
  }, [id, contentType, watchList,getWatchList]);

  useEffect(() => {
    setLoading(true); // reset loading before refetch
    window.scrollTo(0, 0);
  }, [contentType, id]);

  if (loading) {
    return (
      <div className="p-10 bg-black ">
        <WatchPageSkeleton />
      </div>
    );
  }

  if (!contentDetails) {
    return (
      <div className="h-screen bg-black">
        <div className="max-w-6xl mx-auto">
          <Navbar />
          <div className="h-full text-center text-white p-4 mt-40">
            <h2 className="text-2xl sm:text-4xl font-bold text-balance">
              No content found 😥
            </h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="mx-auto container px-4 pb-8 h-full">
        <Navbar />
        {/* navigation buttons  */}
        {trailers.length > 0 && (
          <div className="my-4 flex justify-between items-center">
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded ${
                currentTrailerIndex === 0 && "opacity-50 cursor-not-allowed"
              }`}
              onClick={handlePrev}
              disabled={currentTrailerIndex === 0}
            >
              <ChevronLeft />
            </button>
            <button
              className={`bg-gray-500/70 hover:bg-gray-500 py-2 px-4 rounded ${
                currentTrailerIndex === trailers.length - 1 &&
                "opacity-50 cursor-not-allowed"
              }`}
              onClick={handleNext}
              disabled={currentTrailerIndex === trailers.length - 1}
            >
              <ChevronRight />
            </button>
          </div>
        )}

        {/* video container  */}
        <div className="aspect-video mb-8 p-2 md:px-16 lg:px-32">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIndex]?.key}`}
            width={"100%"}
            height={"70vh"}
            controls
            className="rounded-lg overflow-hidden "
          />
        </div>

        {/* details  */}
        <div className="flex flex-col lg:flex-row max-w-6xl gap-20 justify-between items-center">
          {/* info  */}
          <div className="mb-4 sm:mb-0">
            <h2 className="font-extrabold text-3xl sm:text-6xl text-balance mt-4">
              {contentDetails?.title || contentDetails?.name}
            </h2>
            <p className="mt-2 text-sm sm:text-lg">
              {formatReleasedDate(
                contentDetails?.release_date || contentDetails?.first_air_date
              )}{" "}
              |{" "}
              {contentDetails?.adult ? (
                <span className="text-red-600">18+</span>
              ) : (
                <span className="text-gray-500">PG13</span>
              )}
            </p>
            <p className="mt-2 text-sm sm:text-lg">
              {contentDetails?.overview}
            </p>
            {isInWatchList ? (
              <button
                className="bg-red-700/90 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded flex items-center gap-2 mt-4"
                onClick={handleWatchListButton}
              >
                <X />
                Remove from Watchlist
              </button>
            ) : (
              <button
                className="bg-white text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded flex items-center gap-2 mt-4"
                onClick={handleWatchListButton}
              >
                <Plus />
                Add to Watchlist
              </button>
            )}
          </div>
          {/* poster  */}
          <div className="p-1 lg:w-full  bg-gray-800 border border-gray-700 rounded-sm">
            <img
              src={ORIGINAL_IMG_BASE_URL + contentDetails?.poster_path}
              alt="poster image"
              className="max-h-[600px] h-full lg:h-[500px]  rounded-sm mx-auto border border-gray-700"
            />
          </div>
        </div>

        {/* similar movies  */}
        <div
          className="relative mt-10 max-w-[90vw] mx-auto  flex flex-col justify-center item-center p-2 sm:px-10 my-20"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          <h3 className="font-bold text-xl lg:text-3xl mb-4 ml-1.5">
            Similar Movies/Shows
          </h3>
          <div
            className="flex gap-5 overflow-x-auto no-scrollbar p-2"
            ref={sliderRef}
          >
            {similarContent &&
              similarContent.map((item, i) => {
                if (item.poster_path === null) {
                  return null;
                }
                return (
                  <Link
                    to={`/watch/${item.id}`}
                    key={i}
                    className="min-w-[150px] md:min-w-[180px]  overflow-hidden rounded-sm p-1  bg-gray-800 border border-gray-700 hover:scale-103 transition-all duration-300 bg-contain"
                  >
                    <img
                      src={SMALL_IMG_BASE_URL + item.poster_path}
                      alt=" poster image"
                      className=" rounded-sm border border-gray-700 h-full"
                    />
                  </Link>
                );
              })}
          </div>
          {showArrows && (
            <>
              <button
                className="absolute  top-40  md:top-50 left-0 -translate-y-1/2 bg-gray-700/90 hover:opacity-90 py-8 rounded-full "
                onClick={scollLeft}
              >
                <ChevronLeft />
              </button>
              <button
                className="absolute top-40 md:top-50 right-0 -translate-y-1/2 bg-gray-700/90 hover:opacity-90 py-8 rounded-full "
                onClick={scollRight}
              >
                <ChevronRight />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default WatchPage;
