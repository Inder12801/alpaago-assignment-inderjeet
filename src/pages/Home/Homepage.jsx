import React, { useEffect, useLayoutEffect, useState } from "react";
import Weather from "../../components/Weather/Weather";
import { useMyContext } from "../../providers/ContextProvider";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const { user } = useMyContext();
  const [loggedInUser, setIsLoggedInUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
    }
  }, [loggedInUser]);
  return (
    <div className="home flex items-center justify-center">
      <Weather />
    </div>
  );
};

export default Homepage;
