import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { MovieContext } from "../context/MoviePro";
import { useNavigate } from "react-router-dom";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 10,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1200 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 1200, min: 600 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 2,
  },
};

const MovieList = ({ title, data }) => {
  const navigate = useNavigate();

  return (
    <div className="text-white p-10 mb-10">
      <h2 className="uppercase text-xl mb-4">{title}</h2>
      <Carousel responsive={responsive} itemClass="px-2">
        {data?.map((item) => (
          <div
            key={item.id}
            className="h-[300px] relative group cursor-pointer"
            onClick={() => navigate(`/movie/${item.id}`)}
          >
            <div className="group-hover:scale-105 transition-transform duration-500 w-full h-full">
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <img
                src={`${import.meta.env.VITE_IMAGE_URL}${item.poster_path}`}
                alt={item.title}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute bottom-4 left-2">
                <p className="uppercase text-sm">
                  {item.title || item.original_title}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

MovieList.propTypes = {
  title: PropTypes.string,
  data: PropTypes.array,
};

export default MovieList;
