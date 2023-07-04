import { Link } from "react-router-dom";
import Scanner from "../components/Scanner";

const HomePage = () => {
  return (
    <div>
      <Link to="/dosar-transport">Navigheaza la dosar transport</Link>
      <Scanner />
    </div>
  );
};

export default HomePage;
