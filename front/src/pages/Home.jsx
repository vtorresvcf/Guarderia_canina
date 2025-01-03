import AboutUs from "../components/AboutUs";
import Bannerphrase from "../components/Bannerphrase";
import Services from "../components/Bannerservices";
import Location from "../components/Location";
import BannerReserve from "../components/BannerReserve";

const Home = () => {
  return (
    <div className="min-h-screen relative">
      <AboutUs />
      <Bannerphrase />
      <Services />
      <Location />
      <BannerReserve />
    </div>
  );
};

export default Home;
