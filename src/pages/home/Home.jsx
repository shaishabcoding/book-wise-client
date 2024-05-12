import Banner from "./components/Banner";
import Books from "./components/Books";
import Categories from "./components/Categories";
import Faq from "./components/Faq";
import NewsLetter from "./components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Books></Books>
      <Categories></Categories>
      <Faq></Faq>
      <NewsLetter></NewsLetter>
    </div>
  );
};

export default Home;
