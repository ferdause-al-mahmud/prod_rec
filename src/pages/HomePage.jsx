import Banner from "../components/Banner";
import Community from "../components/Community";
import Faq from "../components/Faq";
import Find from "../components/Find";
import RecentQueries from "../components/RecentQueries";

const HomePage = () => {
  return (
    <div className="">
      <Banner></Banner>
      <Find></Find>
      <RecentQueries></RecentQueries>
      <Community></Community>
      <Faq></Faq>
    </div>
  );
};

export default HomePage;
