import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../shared/navbar/Navbar";
import Footer from "../shared/footer/Footer";
import Loading from "../components/Loading";

const Root = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <div className="bg-white dark:bg-black dark:text-white font-open-sans">
      <div className="lg:px-28 lg:pt-6 ">
        <Navbar></Navbar>
        {loading && <Loading></Loading>}
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Root;
