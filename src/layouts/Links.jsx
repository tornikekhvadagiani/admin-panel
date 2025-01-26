import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
import { LinksAPI } from "../API/LinksAPI";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/Context";

const Links = () => {
  const { setIngredientsPopup } = useMyContext();
  const currentLocation = useLocation();
  const [activeLink, setActiveLink] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const matchingLink = LinksAPI.find((e) =>
      currentLocation.pathname.includes(e.linkTo)
    );
    if (currentLocation.pathname == "/") {
      navigate("/Products/coffe");
    }

    if (matchingLink) {
      setActiveLink(matchingLink.id);
    }
    setIngredientsPopup(false);
    window.scrollTo(0, 0);
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
          key={e.id}
        >
          <img src={e.icon} alt={e.title} />
          <h3>{e.title}</h3>
        </Link>
      ))}
    </div>
  );
};

export default Links;
