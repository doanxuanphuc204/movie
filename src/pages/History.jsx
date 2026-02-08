import { useContext } from "react";
import { HistoryContext } from "../context/HistoryContext";
import { useNavigate } from "react-router-dom";
import IconCancel from "../assets/icon_cancel.png";

const History = () => {
  const { history, clearHistory, removeHistory } = useContext(HistoryContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white p-6 md:p-10">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
          Lịch sử xem phim
          <span className="ml-3 text-sm bg-blue-600 px-3 py-1 rounded-full">
            {history.length}
          </span>
        </h1>

        {history.length > 0 && (
          <button
            onClick={() => {
              if (confirm("Bạn có chắc muốn xóa toàn bộ lịch sử?")) {
                clearHistory();
              }
            }}
            className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 text-sm"
          >
            Xóa lịch sử
          </button>
        )}
      </div>

      {/* EMPTY */}
      {history.length === 0 && (
        <p className="text-gray-400 text-center mt-20">Bạn chưa xem phim nào</p>
      )}

      {/* GRID */}
      {history.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
          {history.map((movie) => (
            <div
              key={movie.id}
              className="relative group cursor-pointer"
              onClick={() => navigate(`/movie/${movie.id}`)}
            >
              {/* POSTER */}
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                className="rounded-lg group-hover:scale-105 transition"
              />

              {/* HOVER OVERLAY */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center rounded-lg">
                <span className="text-sm">Xem lại</span>
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // QUAN TRỌNG
                  removeHistory(movie.id);
                }}
                className="absolute top-2 right-2 bg-black/70 w-8 h-8 rounded-full flex items-center justify-center opacity-80 hover:opacity-100 hover:scale-110 transition"
              >
                <img
                  src={IconCancel}
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

export default History;
