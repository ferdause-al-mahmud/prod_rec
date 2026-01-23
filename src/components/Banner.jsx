// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Slide from "./Slide";
import slide1 from "../assets/banner-1.jpg";
import slide2 from "../assets/banner-2.jpg";
import slide3 from "../assets/banner-3.jpg";

const Banner = () => {
  return (
    <div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <Slide
            slide={slide1}
            title={"Share & grow knowledge with us!"}
            subTitle={
              "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
            }
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            slide={slide2}
            title={"Share & grow knowledge with us!"}
            subTitle={
              "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
            }
          ></Slide>
        </SwiperSlide>
        <SwiperSlide>
          <Slide
            slide={slide3}
            title={"Share & grow knowledge with us!"}
            subTitle={
              "If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text."
            }
          ></Slide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
