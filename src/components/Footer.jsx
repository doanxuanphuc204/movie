import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 w-full">
      <div className="border-t border-gray-700"></div>
      {/* TOP */}
      <div className="flex justify-center px-10 py-1">
        {/* LOGO CENTER */}
        <div className="text-center">
          <Link to="/">
            <h2 className="text-red-600 text-2xl font-bold">MOVIE</h2>
          </Link>
          <p className="text-sm mt-2 max-w-xs mx-auto">
            Discover movies, save favorites, and explore cinema.
          </p>
        </div>
      </div>

      {/* DIVIDER */}

      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row justify-between items-center px-10 py-1 text-xs">
        <p>© {new Date().getFullYear()} MOVIE. All rights reserved.</p>
        <p className="text-gray-500">
          Made with by{" "}
          <span className="text-gray-300 font-medium">Phúc Đoàn</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
