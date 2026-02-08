import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MovieContext } from "../context/MoviePro";
import { FavoriteContext } from "../context/FavoriteContext";
import calendarIcon from "../assets/calendarIcon.svg";
import IconRateting from "../assets/rating.png";
import IconRuntime from "../assets/runtime.png";
import IconStatus from "../assets/status.png";
import IconBudget from "../assets/budget.png";
import IconRevenue from "../assets/revenue.png";
import IconPlay from "../assets/play.png";
import IconHeart from "../assets/heart.png";
import IconHeartBroken from "../assets/heart-broken.png";
import { useNavigate } from "react-router-dom";
import { HistoryContext } from "../context/HistoryContext";

const MovieDetail = () => {
  const { id } = useParams();
  const { hanldeTrailer } = useContext(MovieContext);
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [similar, setSimilar] = useState([]);
  const { addFavorite, removeFavorite, isFavorite } =
    useContext(FavoriteContext);
  const { addToHistory } = useContext(HistoryContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchAll = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const [detailRes, castRes, similarRes] = await Promise.all([
        fetch(`https://api.themoviedb.org/3/movie/${id}?language=vi`, options),
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits`, options),
        fetch(
          `https://api.themoviedb.org/3/movie/${id}/similar?language=vi&page=1`,
          options,
        ),
      ]);

      const detailData = await detailRes.json();
      const castData = await castRes.json();
      const similarData = await similarRes.json();

      setMovie(detailData);
      setCasts(castData.cast.slice(0, 10));
      setSimilar(similarData.results.slice(0, 10));
    };

    fetchAll();
  }, [id]);
  useEffect(() => {
    if (movie) {
      addToHistory(movie);
    }
  }, [movie]);

  if (!movie) return <div className="text-white p-10">Loading...</div>;

  return (
    <div className="text-white">
      {/* BACKDROP */}
      <div
        className="min-h-[500px] bg-cover bg-center relative"
        style={{
          backgroundImage: `url(${import.meta.env.VITE_IMAGE_URL}${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 flex flex-col md:flex-row p-6 md:p-10 gap-6 md:gap-10">
          {/* POSTER */}
          <img
            src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
            alt={movie.title}
            className="w-[180px] md:w-[250px] rounded-lg mx-auto md:mx-0"
          />

          {/* INFO */}
          <div className="w-full md:max-w-2xl">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">
              {movie.title}
            </h1>

            <p className="mb-4 text-gray-300 leading-relaxed text-sm md:text-base">
              {movie.overview}
            </p>

            {/* META */}
            <p className="mb-2 flex items-center gap-2">
              <img src={calendarIcon} className="w-4 h-4" />
              <span>Ngày phát hành:</span>
              <span className="text-gray-300">{movie.release_date}</span>
            </p>

            <p className="mb-2 flex items-center gap-2">
              <img src={IconRateting} className="w-4 h-4" />
              <span>Đánh giá:</span>
              <span className="text-gray-300">{movie.vote_average}</span>
            </p>

            {/* GENRES */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {movie.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 bg-gray-800 rounded-full text-sm"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {/* EXTRA INFO */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-sm">
              <p className="flex items-center gap-2">
                <img src={IconRuntime} className="w-4 h-4 opacity-70" />
                <span>Thời lượng:</span>
                <span className="text-gray-300">{movie.runtime} phút</span>
              </p>

              <p className="flex items-center gap-2">
                <img src={IconStatus} className="w-4 h-4 opacity-70" />
                <span>Trạng thái:</span>
                <span className="text-gray-300">{movie.status}</span>
              </p>

              <p className="flex items-center gap-2">
                <img src={IconBudget} className="w-4 h-4 opacity-70" />
                <span>Ngân sách:</span>
                <span className="text-gray-300">
                  ${movie.budget?.toLocaleString()}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <img src={IconRevenue} className="w-4 h-4 opacity-70" />
                <span>Doanh thu:</span>
                <span className="text-gray-300">
                  ${movie.revenue?.toLocaleString()}
                </span>
              </p>
            </div>

            {/* BUTTONS */}
            <div className="mt-6 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => hanldeTrailer(movie.id)}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-red-600 rounded hover:bg-red-700 transition"
              >
                <img src={IconPlay} className="w-4 h-4 brightness-0 invert" />
                Xem Phim
              </button>

              {isFavorite(movie.id) ? (
                <button
                  onClick={() => removeFavorite(movie.id)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 rounded hover:bg-gray-600 transition"
                >
                  <img
                    src={IconHeartBroken}
                    className="w-4 h-4 brightness-0 invert opacity-80"
                  />
                  Bỏ yêu thích
                </button>
              ) : (
                <button
                  onClick={() => addFavorite(movie)}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-pink-600 rounded hover:bg-pink-700 transition"
                >
                  <img
                    src={IconHeart}
                    className="w-4 h-4 brightness-0 invert"
                  />
                  Thêm yêu thích
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CAST */}
      <div className="p-6 md:p-10">
        <h2 className="text-xl font-semibold mb-4">Diễn viên</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {casts
            .filter((c) => c.profile_path)
            .map((cast) => (
              <div key={cast.id} className="text-center">
                <img
                  src={`${import.meta.env.VITE_IMAGE_URL}${cast.profile_path}`}
                  className="w-full h-[200px] object-cover rounded"
                  alt={cast.name}
                />
                <p className="mt-2 text-sm font-medium">{cast.name}</p>
                <p className="text-xs text-gray-400">{cast.character}</p>
              </div>
            ))}
        </div>
      </div>

      {/* SIMILAR */}
      <div className="p-6 md:p-10">
        <h2 className="text-xl font-semibold mb-4">Phim tương tự</h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {similar.map((item) => (
            <div
              key={item.id}
              className="cursor-pointer group"
              onClick={() => navigate(`/movie/${item.id}`)}
            >
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                className="rounded group-hover:scale-105 transition"
              />
              <p className="text-sm mt-2">
                {item.title || item.original_title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
