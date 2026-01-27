import { useContext } from "react";
import { FavoriteContext } from "../context/FavoriteContext";
import { useNavigate } from "react-router-dom";
import IconRemove from "../assets/heart-broken.png";
const Favorites = () => {
  const { favorites, removeFavorite, clearFavorites } =
    useContext(FavoriteContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          Phim yêu thích
          <span className="text-sm bg-pink-600 px-3 py-1 rounded-full">
            {favorites.length}
          </span>
        </h1>

        {favorites.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Bạn có chắc muốn xóa tất cả phim yêu thích?")) {
                clearFavorites();
              }
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition text-sm font-medium"
          >
            Xóa tất cả
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {favorites.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-400">
          <p className="text-lg">Danh sách yêu thích đang trống</p>
          <p className="text-sm mt-2">
            Hãy thêm phim bạn thích để xem lại sau nhé!
          </p>
        </div>
      )}

      {/* GRID */}
      {favorites.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="relative group cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {/* POSTER */}
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                className="rounded-lg shadow-lg group-hover:scale-105 group-hover:shadow-pink-600/40 transition duration-300"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
                <span className="text-sm font-semibold">Xem chi tiết</span>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFavorite(movie.id);
                }}
                className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 transition"
              >
                <img
                  src={IconRemove}
                  alt="remove"
                  className="w-4 h-4 brightness-0 invert"
                />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
