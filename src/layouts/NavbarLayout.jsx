import { Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import Links from "./Links";

const NavbarLayout = () => {
 

  return (
    <div className={styles.dashboard_flex}>
      <nav className={styles.nav}>
        <h1>Admin Console</h1>
        <Links />
      </nav>
      <Outlet />
    </div>
  );
};

export default NavbarLayout;
