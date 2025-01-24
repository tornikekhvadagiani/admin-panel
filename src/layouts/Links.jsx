import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { LinksAPI } from "../API/LinksAPI";
import { Link, useLocation } from "react-router-dom";
import { useMyContext } from "../context/Context";

const Links = () => {
  const { setIngredientsPopup } = useMyContext();
  const currentLocation = useLocation();
  const [activeLink, setActiveLink] = useState(null);

  // Set the active link based on the current route
  useEffect(() => {
    const matchingLink = LinksAPI.find(
      (e) => e.linkTo === currentLocation.pathname
    );
    if (matchingLink) {
      setActiveLink(matchingLink.id);
    }
    setIngredientsPopup(false);
  }, [currentLocation.pathname]);

  return (
    <div className={styles.links}>
      {LinksAPI.map((e) => (
        <Link
          className={`${styles.link} ${
            activeLink === e.id ? styles.activeLink : ""
          }`}
          to={e.linkTo}
          onClick={() => setActiveLink(e.id)}
          key={e.id} // Use a stable key
        >
          <img src={e.icon} alt={e.title} />
          <h3>{e.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Links;
