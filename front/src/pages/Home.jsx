import AboutUs from "../components/AboutUs";
import Bannerphrase from "../components/Bannerphrase";
import Services from "../components/Bannerservices";
import Location from "../components/Location";
import BannerReserve from "../components/BannerReserve";
import { useEffect } from "react";
import useReservationStore from "../store/store";

const Home = () => {
  const { setUser } = useReservationStore();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
  }, [setUser]);
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
