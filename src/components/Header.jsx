import PropTypes from "prop-types";
import { useState, useEffect, useRef, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";
import IconHeart from "../assets/heart.png";
const Header = ({ onSearch }) => {
  const [textSearch, setTextSearch] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isManualSearch, setIsManualSearch] = useState(false);

  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const handleSubmitSearch = async () => {
    if (textSearch.trim().length < 2) return;

    setIsManualSearch(true);
    setShowDropdown(false);

    await onSearch(textSearch);

    setTimeout(() => {
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }, 100);
  };

  useEffect(() => {
    if (isManualSearch) return;

    if (textSearch.trim().length < 2) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      const data = await onSearch(textSearch);
      setResults(data || []);
      setShowDropdown(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [textSearch, onSearch, isManualSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-2 bg-black flex justify-between items-center">
      {/* LOGO */}
      <Link to="/">
        <h1 className="text-red-600 text-2xl font-bold cursor-pointer">
          MOVIE
        </h1>
      </Link>

      {/* SEARCH BOX */}
      <div className="relative w-[350px]" ref={boxRef}>
        <div className="flex">
          <input
            type="text"
            placeholder="Search movies..."
            className="flex-1 p-3 rounded-l bg-white text-black"
            value={textSearch}
            onChange={(e) => {
              setTextSearch(e.target.value);
              setIsManualSearch(false);
            }}
            onFocus={() => results.length && setShowDropdown(true)}
          />

          <button
            onClick={handleSubmitSearch}
            className="bg-red-600 px-4 text-white rounded-r hover:bg-red-700"
          >
            Search
          </button>
        </div>

        {/* DROPDOWN */}
        {showDropdown && results.length > 0 && (
          <div className="absolute top-full left-0 w-full bg-black border border-gray-700 mt-1 max-h-[400px] overflow-y-auto z-50">
            {results.slice(0, 6).map((movie) => (
              <div
                key={movie.id}
                className="flex gap-3 p-3 hover:bg-gray-800 cursor-pointer"
                onClick={() => {
                  navigate(`/movie/${movie.id}`);
                  setShowDropdown(false);
                  setTextSearch("");
                }}
              >
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  className="w-10 h-14 object-cover"
                />
                <div>
                  <p className="text-white text-sm font-semibold">
                    {movie.title}
                  </p>
                  <p className="text-gray-400 text-xs">
                    {movie.release_date?.slice(0, 4)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FAVORITES WITH BADGE */}
      <Link
        to="/favorites"
        className="relative flex items-center text-white hover:text-pink-400 transition"
      >
        <div className="relative">
          <img src={IconHeart} alt="favorites" className="w-5 h-5" />

          {favorites.length > 0 && (
            <span
              className="
          absolute top-0 right-0
          translate-x-1/3 -translate-y-1/3
          bg-red-600 text-white
          text-[10px] font-bold
          min-w-[16px] h-4 px-1
          flex items-center justify-center
          rounded-full
          leading-none
        "
            >
              {favorites.length}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

Header.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default Header;
