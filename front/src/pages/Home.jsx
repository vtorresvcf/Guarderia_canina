import useStore from "../store/store";
import Services from "../components/Bannerservices";

const Home = () => {
  const { count, increment, decrement } = useStore();
  return (
    <div>
      <Services />
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
};

export default Home;
