/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routesObject } from "../Config/Privateroute.config";
import { hasRole } from "../Utils/role.utils";

function Routemiddleware({ Component, name, ...rest }) {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   let routes = routesObject[name] || [];
  //   console.log(routes,"---------------")
  //   let isRole = hasRole(routes);
  //   console.log(isRole,"--")
    // if (!isRole) {
    //   navigate("/");
    // }
  // }, [name, navigate]);

  return <Component name={name} {...rest} />;
}

export default Routemiddleware;
