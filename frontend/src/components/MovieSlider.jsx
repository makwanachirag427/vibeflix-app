import { useEffect, useRef, useState } from "react";
import { SMALL_IMG_BASE_URL } from "../utils/constants";
import { useContentStore } from "../store/content";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { Link } from "react-router-dom";

const MovieSlider = ({ category }) => {
  const [showArrows, setShowArrows] = useState(false);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  const { contentType } = useContentStore();

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

  const formatedCategoryName = category.toUpperCase()[0] + category.replaceAll("_"," ").slice(1);
  const formatedContentType = contentType === "movie" ? "movies" : "shows";
  useEffect(() => {
    const getContent = async () => {
      try {
        const res = await axios.get(`/api/v1/${contentType}/${category}`);
        setContent(res.data.content);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };
    getContent();
  }, [contentType, category]);

  return (
    <div
      className="relative mt-10 max-w-[90vw] mx-auto  flex flex-col justify-center item-center p-2 sm:px-10  text-white"
      onMouseEnter={() => setShowArrows(true)}
      onMouseLeave={() => setShowArrows(false)}
    >
      <h3 className="font-bold text-xl lg:text-2xl mb-4 ml-1.5">
       {formatedCategoryName} {formatedContentType}
      </h3>
      <div
        className="flex gap-5 overflow-x-auto no-scrollbar p-2"
        ref={sliderRef}
      >
        {loading && (
          <div className="flex gap-5">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-70 min-w-[150px] md:min-w-[180px] lg:min-w-[200px] bg-gray-700 rounded-lg animate-pulse "
              ></div>
            ))}
          </div>
        )}

        {content &&
          content.map((item, i) => (
            <Link
              to={`/watch/${item.id}`}
              key={i}
              className="min-w-[150px] h-full md:min-w-[180px] lg:min-w-[200px] overflow-hidden rounded-lg shadow-md shadow-gray-700 hover:scale-103 transition-all duration-300 bg-contain"
            >
              <img
                src={SMALL_IMG_BASE_URL + item.poster_path}
                alt=" poster image"
              />
            </Link>
          ))}
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
  );
};
export default MovieSlider;
