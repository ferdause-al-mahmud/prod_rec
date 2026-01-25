import { FcApproval, FcComments, FcDataProtection } from "react-icons/fc";
import Aos from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const Community = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out-quad',
      once: true,
    });
  }, []);

  return (
    <div className="mt-20 py-24 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <div className="absolute top-0 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10">
        <h1 className="mb-8 text-2xl max-w-3xl text-center mx-auto text-white md:text-5xl font-bold" data-aos="fade-up">
          ProdRec Q&A communities are different. <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Here&apos;s how</span>
        </h1>
        
        <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-11/12 lg:w-5/6 mx-auto mt-16">
          <div
            className="md:w-1/3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md text-center p-10 rounded-2xl shadow-2xl hover:shadow-purple-500/50 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
            data-aos="fade-right"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/10 group-hover:to-transparent transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="text-6xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-500">
                <FcComments />
              </div>
              <h2 className="text-2xl font-bold my-4 text-white">Expert communities.</h2>
              <p className="text-gray-300">
                Connect with industry experts and build meaningful relationships with peers.
              </p>
            </div>
          </div>

          <div
            className="md:w-1/3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md text-center p-10 rounded-2xl shadow-2xl hover:shadow-blue-500/50 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
            data-aos="fade-up"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-blue-500/0 group-hover:from-blue-500/10 group-hover:to-transparent transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="text-6xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-500">
                <FcDataProtection />
              </div>
              <h2 className="text-2xl font-bold my-4 text-white">
                The right answer. Right on top.
              </h2>
              <p className="text-gray-300">
                Quality answers are voted up and visible, ensuring you get the best solutions.
              </p>
            </div>
          </div>

          <div
            className="md:w-1/3 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md text-center p-10 rounded-2xl shadow-2xl hover:shadow-pink-500/50 border border-white/20 hover:border-white/40 transition-all duration-500 transform hover:-translate-y-2 group relative overflow-hidden"
            data-aos="fade-left"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 to-pink-500/0 group-hover:from-pink-500/10 group-hover:to-transparent transition-all duration-500"></div>
            <div className="relative z-10">
              <div className="text-6xl mx-auto w-fit mb-4 group-hover:scale-110 transition-transform duration-500">
                <FcApproval />
              </div>
              <h2 className="text-2xl font-bold my-4 text-white">
                Share knowledge. Earn trust.
              </h2>
              <p className="text-gray-300">
                Build your reputation by helping others and sharing your expertise.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
