/* eslint-disable react/prop-types */

const Slide = ({ slide, title, subTitle }) => {
  return (
    <div
      className="hero h-[80vh] bg-contain bg-top"
      style={{
        backgroundImage: `url(${slide})`,
      }}
    >
      <div className="hero-overlay bg-opacity-50"></div>
      <div className="hero-content text-white text-center">
        <div className="max-w-3xl">
          <h1 className="mb-5 text-4xl lg:text-6xl font-bold">{title}</h1>
          <p className="mb-5">{subTitle}</p>
          <button className="btn btn-md lg:btn-lg border-[#00c1a2] hover:bg-[#00c1a2] hover:text-white ">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
