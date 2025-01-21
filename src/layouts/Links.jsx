import React, { useState } from "react";
import styles from "./Navbar.module.css";
import coffe from "../images/icons/coffee.png";
import { LinksAPI } from "../API/LinksAPI";
import { Link } from "react-router-dom";
const Links = () => {
  const [activeLink, setActiveLink] = useState(0);
  return (
    <div className={styles.links}>
      {LinksAPI.map((e, index) => (
        <Link to={e.linkTo} onClick={() => setActiveLink(index)}>
          <div
            className={`${styles.link} ${
              activeLink === index ? styles.activeLink : ""
            }`}
          >
            <img src={e.icon} alt={e.title} />
            <h3>{e.title}</h3>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Links;
