import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Banner from "./components/Banner";
import MovieList from "./components/MovieList";
import MovieSearch from "./components/MovieSearch";

import MovieDetail from "./pages/MovieDetail";
import Favorites from "./pages/Favorites";
import History from "./pages/History";

import { MoviePro } from "./context/MoviePro";
import HistoryProvider from "./context/HistoryContext";

function App() {
  const [movie, setMovie] = useState([]);
  const [movieRate, setMovieRate] = useState([]);
  const [movieSearch, setMovieSearch] = useState([]);

  const handleSearch = async (searchVal) => {
    if (!searchVal.trim()) {
      setMovieSearch([]);
      return [];
    }

    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const res = await fetch(url, options);
      const data = await res.json();

      setMovieSearch(data.results);
      return data.results;
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const [res1, res2] = await Promise.all([
        fetch(
          "https://api.themoviedb.org/3/movie/popular?language=vi&page=1",
          options,
        ),
        fetch(
          "https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1",
          options,
        ),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();

      setMovie(data1.results);
      setMovieRate(data2.results);
    };

    fetchMovie();
  }, []);

  return (
    <MoviePro>
      <HistoryProvider>
        <div className="bg-black min-h-screen pb-10">
          <Header onSearch={handleSearch} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Banner />
                  {movieSearch.length > 0 ? (
                    <MovieSearch title="Kết quả tìm kiếm" data={movieSearch} />
                  ) : (
                    <>
                      <MovieList title="Phim Hot" data={movie} />
                      <MovieList title="Phim Đề Cử" data={movieRate} />
                    </>
                  )}
                </>
              }
            />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/history" element={<History />} />
          </Routes>

          <Footer />
        </div>
      </HistoryProvider>
    </MoviePro>
  );
}

export default App;
