import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Home = () => {
  const { user, logout } = useContext(AuthContext);
  return (
    <div>
      <h1>
        Welcome, {user.first_name} {user.last_name}
        <button onClick={logout}>Logout</button>
      </h1>
    </div>
  );
};

export default Home;
