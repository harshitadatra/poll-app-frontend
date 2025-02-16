import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Poll App</h1>
      <p>Create polls, vote, and see real-time results.</p>
      <div className="home-buttons">
        <Link to="/polls">View Polls</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Home;
