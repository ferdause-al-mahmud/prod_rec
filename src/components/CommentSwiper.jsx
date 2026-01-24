/* eslint-disable react/prop-types */

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";
import CommentCard from "./CommentCard";
const CommentSwiper = ({ comments }) => {
  // console.log(comments);
  return (
    <div className="">
      <Swiper
        slidesPerView={3}
        spaceBetween={30}
        breakpoints={{
          // when the viewport is >= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          // when the viewport is >= 640px
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // when the viewport is >= 1024px
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
        className="mySwiper"
      >
        {comments.map((comment, idx) => (
          <SwiperSlide className="p-5 lg:p-10 lg:pt-0" key={idx}>
            <CommentCard comment={comment}></CommentCard>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CommentSwiper;
