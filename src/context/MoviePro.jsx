import { createContext, useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import YouTube from "react-youtube";

const opts = {
  height: "390",
  width: "640",
  playerVars: {
    autoplay: 1,
  },
};

const MovieContext = createContext();

const MoviePro = ({ children }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState("");

  const hanldeTrailer = async (id) => {
    setTrailerKey("");

    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
        },
      };

      const moviekey = await fetch(url, options);
      const data = await moviekey.json();

      if (data.results && data.results.length > 0) {
        setTrailerKey(data.results[0].key);
        setModalIsOpen(true);
      }
    } catch (error) {
      setModalIsOpen(false);
      console.log(error);
    }
  };

  return (
    <MovieContext.Provider value={{ hanldeTrailer }}>
      {children}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { position: "fixed", zIndex: 9999 },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%,-50%)",
          },
        }}
      >
        <YouTube videoId={trailerKey} opts={opts} />
      </Modal>
    </MovieContext.Provider>
  );
};

MoviePro.propTypes = {
  children: PropTypes.node,
};

export { MoviePro, MovieContext };
