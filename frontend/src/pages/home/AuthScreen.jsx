import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Cross, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { cardInfo, FAQs, SMALL_IMG_BASE_URL } from "../../utils/constants";
const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [trending, setTrending] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showArrows, setShowArrows] = useState(false);
  const [openFaqIndex,setOpenFaqIndex] = useState(null);

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    navigate("/signup?email=" + email);
    setEmail("");
  };

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

  useEffect(() => {
    const getTrendingContent = async () => {
      try {
        const response = await axios.get("/api/v1/auth/trending");
        setTrending(response.data.trending);
      } catch (error) {
        console.log(error.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    getTrendingContent();
  }, []);

  return (
    <div className="text-white bg-black">
      <div className=" pb-10 sm:pb-40 bg-[linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url('/hero.png')] bg-cover rounded-b-4xl shadow-md shadow-gray-700">
        {/* header  */}
        <header className="flex justify-between items-center max-w-[80vw] mx-auto p-4  text-white">
          <img src="/vibeflix-logo.png" className="w-25 lg:w-40" />
          <Link
            to={"/login"}
            className="bg-red-600 font-semibold text-sm rounded py-1.5 px-4 "
          >
            Sign In
          </Link>
        </header>
        {/* hero-section  */}
        <div className="flex flex-col mt-30 items-center h-full max-w-3xl mx-auto  text-center px-5 sm:px-10">
          <h1 className="text-3xl sm:text-5xl font-extrabold  leading-snug">
            Unlimited movies, TV shows and more
          </h1>
          <p className="sm:text-xl mt-2">Watch anywhere. Cancel at any time.</p>
          <p className="mt-5 text-sm">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>
          <form
            className="mt-10 w-full flex flex-col sm:flex-row  justify-center items-center"
            onSubmit={handleFormSubmit}
          >
            <input
              type="email"
              name="email"
              className="p-2.5 sm:p-3.5 border border-gray-500 bg-slate-500/20 rounded w-full sm:w-100"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
            <button className="mt-5 sm:mt-0 bg-red-600 px-3 md:px-10 py-2.5 sm:py-3 rounded font-bold text-lg lg:text-2xl  flex items-center sm:ml-2">
              Get Started
              <ChevronRight className="lg:size-8" />
            </button>
          </form>
        </div>
      </div>
      {/* Trending  */}
      <div
        className="relative mt-10 max-w-[90vw] mx-auto  flex flex-col justify-center item-center p-2 sm:px-10"
        onMouseEnter={() => setShowArrows(true)}
        onMouseLeave={() => setShowArrows(false)}
      >
        <h3 className="font-bold text-xl lg:text-2xl mb-4 ml-1.5">
          Trending Now
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

          {trending &&
            trending.map((item, i) => (
              <Link
                to={"/login"}
                key={i}
                className="min-w-[150px] md:min-w-[180px] lg:min-w-[200px] overflow-hidden rounded-lg shadow-md shadow-gray-700 hover:scale-103 transition-all duration-300 bg-contain"
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

      {/*Info cards*/}
      <div className=" mt-10 max-w-[85vw] mx-auto  pb-4">
        <h4 className="font-bold text-xl lg:text-2xl mb-4 ml-1.5">
          More reasons to join
        </h4>
        <div className="flex flex-col  lg:flex-row items-evely lg:justify-evenly gap-2">
          {cardInfo.map((item,i) => (
            <div key={i}  className=" bg-[#31223d86] p-4 rounded-2xl lg:w-full flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-xl">{item.heading}</h4>
                <p className="text-gray-400 mt-2">{item.text}</p>
              </div>
              <div className="flex justify-end">
                <img src={item.image} alt="card img" className="align-start" />
              </div>
            </div>
          ))}
        </div>
      </div>

     {/* faqs  */}
     <div className="mt-10 max-w-[85vw]  mx-auto pb-20">
        <h4 className="font-bold text-xl lg:text-2xl mb-4 ">Frequently Asked Questions</h4>
        <div className="flex flex-col gap-2">
          {FAQs.map((faq,i) => (
            <div key={i} className="flex flex-col gap-2">
              <p className="bg-[#2D2D2D] p-5 lg:p-6 text-lg lg:text-xl flex justify-between"
              onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              >{faq.que}
                {openFaqIndex === i ? <X className="size-8"/> : <Plus className="size-8"/>}
              </p>
              <p className={`bg-[#2D2D2D] p-5 lg:p-6 text-lg lg:text-xl  ${openFaqIndex === i ? "block" :"hidden"}`}>{faq.ans}</p>
            </div>
          ))}
        </div>
     </div>

    </div>
  );
};
export default AuthScreen;
