/* eslint-disable react/prop-types */
import { useEffect } from "react";

const Slide = ({ slide, title, subTitle }) => {
  useEffect(() => {
    const elements = document.querySelectorAll('.slide-animate');
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  }, []);

  return (
    <div
      className="hero h-[80vh] bg-contain bg-top relative overflow-hidden group"
      style={{
        backgroundImage: `url(${slide})`,
        backgroundPosition: 'center',
      }}
    >
      <div className="hero-overlay bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="hero-content text-white text-center relative z-10">
        <div className="max-w-3xl">
          <h1 className="slide-animate mb-5 text-4xl lg:text-6xl font-bold opacity-0" style={{ transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.2s' }}>
            {title}
          </h1>
          <p className="slide-animate mb-5 text-lg lg:text-xl opacity-0" style={{ transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.4s' }}>
            {subTitle}
          </p>
          <button className="slide-animate btn btn-md lg:btn-lg bg-[#00c1a2] border-[#00c1a2] text-white hover:bg-[#00a681] hover:border-[#00a681] opacity-0 transform transition-all duration-700" style={{ transform: 'translateY(20px)', transition: 'all 0.8s ease-out 0.6s' }}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
