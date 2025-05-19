import { Link } from "react-router-dom";
import { LogOut, Menu, Search } from "lucide-react";
import { useState } from "react";
import { useContentStore } from "../store/content";
import { useAuthStore } from "../store/authUser";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { setContentType } = useContentStore();
  const { logout, user } = useAuthStore();

  return (
    <header className="max-w-6xl mx-auto p-4 flex flex-wrap justify-between text-white">
      <div className="flex items-center gap-10 z-50">
        <Link to={"/"}>
          <img src="/vibeflix-logo.png" className="w-30 md:w-40" />
        </Link>

        {/* desktop icons */}
        <div className="hidden sm:flex items-center gap-2">
          <Link
          to={"/"}
            className="hover:underline"
            onClick={() => setContentType("movie")}
          >
            Movies
          </Link>
          <Link
          to={"/"}
            className="hover:underline"
            onClick={() => setContentType("tv")}
          >
            Tv Shows
          </Link>
          <Link to={"/history"} className="hover:underline">
            Search History
          </Link>
          <Link to={"/watchlist"} className="hover:underline">
            Watchlist
          </Link>
        </div>
      </div>
      {/* logout and search   */}
      <div className="flex items-center gap-4 sm:gap-2 z-50">
        <Link to={"/search"}>
          <Search/>
        </Link>
        <img src={user.image} className="size-8 rounded" />
        <LogOut onClick={logout} />
        <div className="sm:hidden">
          <Menu onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}/>
        </div>
      </div>

      {/* mobile menu  */}
      {isMobileMenuOpen && (
        <div className="sm:hidden flex flex-col gap-4 w-full mt-5 bg-black rounded border border-gray-400 p-4 z-50">
          <Link
            to={"/"}
            className=" block hover:underline"
            onClick={() => {
              setContentType("movie");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            Movies
          </Link>
          <Link
            to={"/"}
            className="block hover:underline"
            onClick={() => {
              setContentType("tv");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
          >
            Tv Shows
          </Link>
          <Link
            to={"/history"}
            className="block hover:underline"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Search History
          </Link>
          <Link
            to={"/watchlist"}
            className="block hover:underline"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            Watchlist
          </Link>
        </div>
      )}
    </header>
  );
};
export default Navbar;
