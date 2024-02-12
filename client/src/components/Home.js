import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Login from "./Login";
import React from "react";
import { useNavigate } from "react-router-dom";
import baseURL from "../api/connection";
import { useEffect } from "react";

const LoggedInHome = () => {
  // const navigate = useNavigate();
  // const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  // const verifylogin = async () => {
  //   try {
  //     const response = await baseURL.get("/home", {
  //       headers: {
  //         Authorization: `Bearer ${JSON.parse(token)}`,
  //       },
  //     });
  //     if (response.data.status === "ok") {
  //       navigate("/home");
  //     }
  //   } catch (error) {
  //     navigate("/login");
  //     console.error("Errore nella richiesta Axios:", error.message);
  //   }
  // };
  // useEffect(() => {
  //   verifylogin();
  // });
  return (
    <div
      className="home"
      style={{
        paddingTop: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      <h1 className="">Benvenuto</h1>
      <h1 className="">Trasporti Srl</h1>
      <p>controllare login in python per ban</p>
    </div>
  );
};
const LoggedOutHome = () => {
  return <Login />;
};

const Home = () => {
  const [logged] = useAuth();

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");

  const fetchUpdate = async () => {
    if (logged) {
      console.log("logged");
      return LoggedInHome();
      // return <LoggedInHome />;
    } else {
      console.log("not logged");
      return LoggedOutHome();
      // return <LoggedOutHome />;
    }
  };

  useEffect(() => {
    // fetchUpdate();
    const intervalId = setInterval(fetchUpdate, 6000);
    return () => clearInterval(intervalId);
  }, [logged]);

  return <>{logged ? LoggedInHome() : LoggedOutHome()}</>;
  // return <>{logged ? <LoggedInHome />: <LoggedOutHome />}</>;
};

export default Home;
