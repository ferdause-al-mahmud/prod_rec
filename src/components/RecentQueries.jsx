import { useLoaderData } from "react-router-dom";
import QueryCard from "./Cards/QueryCard";

const RecentQueries = () => {
  const queriesData = useLoaderData();

  return (
    <section className="w-full lg:w-5/6 px-4 mx-auto pt-12 mt-10">
      <div className="flex flex-col md:flex-row justify-between">
        <h2 className="text-5xl font-bold text-center w-full  text-gray-800 ">
          Recent Posted Queries
        </h2>
      </div>

      <div className="mt-10 grid place-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {queriesData.map((query) => (
          <QueryCard key={query._id} query={query}></QueryCard>
        ))}
      </div>
    </section>
  );
};

export default RecentQueries;
