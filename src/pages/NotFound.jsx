import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.notfound_main}>
      <h1>Page Not Found !</h1>
      <div className={styles.notfound_container}>
        <div className={styles.notfound_box}>
          <h1>Back to</h1>
          <Link to={"/Products/coffe"}>Coffe List</Link>
          <Link to={"/Products/ingredients"}>Ingredient List</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
