import { useLoaderData } from "react-router-dom";
import QueryCard from "./Cards/QueryCard";
import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

const RecentQueries = () => {
  const queriesData = useLoaderData();

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: 'ease-in-out-quad',
      once: true,
    });
  }, []);

  return (
    <section className="w-full lg:w-5/6 px-4 mx-auto pt-12 mt-10 py-20">
      <div className="relative mb-16">
        <div className="absolute -top-8 -left-8 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -top-8 right-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <h2 className="text-5xl font-bold text-center w-full text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 relative z-10" data-aos="fade-up">
          Recent Posted Queries
        </h2>
        <p className="text-center text-gray-500 mt-4 text-lg" data-aos="fade-up" data-aos-delay="100">
          Explore the latest questions from our community
        </p>
      </div>

      <div className="mt-16 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {queriesData.map((query, index) => (
          <div key={query._id} data-aos="fade-up" data-aos-delay={index * 100}>
            <QueryCard query={query}></QueryCard>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentQueries;
