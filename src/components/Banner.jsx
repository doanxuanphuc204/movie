import IconRateting from "../assets/rating.png";
import IconRatetingHalf from "../assets/rating-half.png";
import ImageMovie from "../assets/avatar.jpg";
import IconPlay from "../assets/play-button.png";
import { MovieContext } from "../context/MoviePro";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-[600px] bg-banner bg-center bg-no-repeat bg-cover relative">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 p-6">
        {/* LEFT CONTENT */}
        <div className="flex flex-col items-baseline space-y-5 w-full md:w-1/2">
          <p className="text-white bg-gradient-to-r from-red-600 to-red-300 py-1 px-3 text-xl">
            TV Show
          </p>

          <div className="flex flex-col space-y-4">
            <h2 className="text-white text-3xl font-bold">
              Avatar: Lửa và Tro Tàn
            </h2>

            <div className="flex items-center gap-2">
              <img src={IconRateting} className="w-8 h-8" />
              <img src={IconRateting} className="w-8 h-8" />
              <img src={IconRateting} className="w-8 h-8" />
              <img src={IconRateting} className="w-8 h-8" />
              <img src={IconRatetingHalf} className="w-8 h-8" />
            </div>
            <p className="text-white leading-relaxed ">
              Sau cuộc chiến tàn khốc với RDA và nỗi mất mát to lớn khi đứa con
              trai cả hy sinh, Jake Sully và Neytiri phải đối mặt với một mối đe
              dọa mới trên Pandora: tộc Tro Tàn — một nhóm Na'vi hung bạo và
              khát khao quyền lực, do thủ lĩnh tàn nhẫn Varang dẫn dắt. Gia đình
              Jake buộc phải chiến đấu để sinh tồn và bảo vệ tương lai của
              Pandora, trong một cuộc xung đột đẩy họ đến giới hạn cuối cùng cả
              về thể xác lẫn tinh thần.
            </p>
            <div className="flex items-center gap-4">
              <button className="bg-black text-white px-3 py-2 font-bold">
                Chi tiết
              </button>
              <button
                onClick={() => navigate("/movie/83533")}
                className="bg-red-600 text-white px-3 py-2 font-bold hover:bg-red-700 transition"
              >
                Xem Phim
              </button>
            </div>
          </div>
        </div>

        {/* POSTER */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-[220px] h-[320px] md:w-[300px] md:h-[400px] relative group">
            <img src={ImageMovie} className="w-full h-full object-cover" />
            <div
              onClick={() => navigate("/movie/123")}
              className="absolute inset-0 flex items-center justify-center backdrop-blur-sm opacity-0 group-hover:opacity-100 transition cursor-pointer"
            >
              <img src={IconPlay} className="w-14 h-14 md:w-16 md:h-16" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
