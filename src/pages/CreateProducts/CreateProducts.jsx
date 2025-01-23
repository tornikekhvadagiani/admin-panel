import React, { useRef } from "react";
import styles from "./CreateProducts.module.css";
import BlueButton from "../../components/BlueButton";
import { useNavigate } from "react-router-dom";
const CreateProducts = () => {
  const typeRef = useRef(null);
  const priceRef = useRef(null);
  const sugarRef = useRef(null);
  const coffeineRef = useRef(null);
  const descriptionRef = useRef(null);
  const API_KEY = "ZPuxX_W7Yqznq29IU1rmTJ97DDvxJUKEBDYPdEy8gPAGp6A4Ag";
  const navigate = useNavigate();

  const addCoffe = (e) => {
    e.preventDefault();

    if (
      !typeRef.current.value.trim() ||
      !priceRef.current.value.trim() ||
      !sugarRef.current.value.trim() ||
      !coffeineRef.current.value.trim() ||
      !descriptionRef.current.value.trim()
    ) {
      alert("Please fill in all the fields.");
    }

    const newTask = {
      coffeType: typeRef.current.value,
      coffePrice: priceRef.current.value, // დოლარი //
      coffeSugar: sugarRef.current.value, // გრამობითაა //
      coffeine: coffeineRef.current.value,
      coffeDescription: descriptionRef.current.value,
    };
    fetch("https://crudapi.co.uk/api/v1/coffe", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([newTask]), // Ensure correct JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Return JSON data
      })
      .then((data) => {
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  

return (
  <div className={styles.create_main}>
    <h1>Add Product</h1>
    <div className={styles.create_div_container}>
      <form className={styles.create_form}>
        <div className={styles.inputs_flex}>
          <div className={styles.flex_div}>
            <label>
              <h2>Coffe Type</h2>
              <select name="coffee" ref={typeRef}>
                <option value="Espresso">Espresso</option>
                <option value="Americano">Americano</option>
                <option value="Latte">Latte</option>
                <option value="Cappuccino">Cappuccino</option>
                <option value="Mocha">Mocha</option>
                <option value="Macchiato">Macchiato</option>
                <option value="Flat_White">Flat White</option>
                <option value="Irish">Irish Coffee</option>
                <option value="Affogato">Affogato</option>
                <option value="Turkish">Turkish Coffee</option>
              </select>
            </label>
            <label>
              <h2>Coffe Price</h2>
              <input type="number" ref={priceRef} />
            </label>
            <label>
              <h2>Coffeine</h2>
              <input type="text" ref={coffeineRef} />
            </label>
          </div>
          <div className={styles.flex_div}>
            <label>
              <h2>Sugar (gr) </h2>
              <input type="number" ref={sugarRef} />
            </label>
            <label className={styles.textarea_label}>
              <h2>Description </h2>
              <textarea ref={descriptionRef} />
            </label>
          </div>
        </div>
        <div className={styles.add_button}>
          <BlueButton title={"Add Coffe"} func={addCoffe} />
        </div>
      </form>
    </div>
  </div>
);
};

export default CreateProducts;
