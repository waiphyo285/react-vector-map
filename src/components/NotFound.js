import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";


const NotFound = () => {
  return (
    <div>
      <h1>404 - Not Found!</h1>
      <div className="flex">
        <Link to="/simple-map">go home</Link>
      </div>
    </div>
  );
};

export default NotFound;
