import { createContext, useEffect, useState } from "react";

export const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const MAX_HISTORY = 20;

  // Load history từ localStorage
  useEffect(() => {
    const saved = localStorage.getItem("history");
    if (saved) {
      setHistory(JSON.parse(saved));
    }
    setIsLoaded(true);
  }, []);

  // Save history vào localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem("history", JSON.stringify(history));
  }, [history, isLoaded]);

  // Thêm phim vào lịch sử xem
  const addToHistory = (movie) => {
    if (!movie) return;

    setHistory((prev) => {
      const filtered = prev.filter((item) => item.id !== movie.id);

      return [
        {
          id: movie.id,
          title: movie.title || movie.original_title,
          poster_path: movie.poster_path,
          viewedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX_HISTORY);
    });
  };

  const clearHistory = () => {
    setHistory([]);
  };
  const removeHistory = (id) => {
    setHistory((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        removeHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
