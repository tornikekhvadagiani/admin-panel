import { useEffect, useRef, useState } from "react";
import styles from "../CreateProducts/CreateProducts.module.css";
import CountrySelect from "../../components/CountrySelect";
import CreamSelect from "../../components/CreamSelect";
import BlueButton from "../../components/BlueButton";
import FlavorSelectIngredient from "../../components/FlavorSelectIngredient";
import { FlavorAPI } from "../../API/FlavorAPI";
import { CreamsAPI } from "../../API/CreamsAPI";
import { useMyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
const CreateIngredient = () => {
  const priceRef = useRef(null);
  const nameRef = useRef(null);
  const coffeineRef = useRef(null);
  const strengthRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryRef = useRef(null);
  const flavorRef = useRef(null);
  const creamRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ingredientPrice, setIngredientPrice] = useState(totalPrice);
  const { API_INGREDIENTS_KEY, API_URL } = useMyContext();
  const navigate = useNavigate();
  const [ingredientPriceInfo, setIngredientPriceInfo] = useState([
    { type: "default", title: "Ingredient Price", price: ingredientPrice },
    { type: "Flavor", title: FlavorAPI[0].title, price: FlavorAPI[0].price },
    { type: "Cream", title: CreamsAPI[0].title, price: CreamsAPI[0].price },
  ]);
  const changeFlavor = (e) => {
    const removeOldFlavor = ingredientPriceInfo.filter(
      (e) => e.type !== "Flavor"
    );
    setIngredientPriceInfo([...removeOldFlavor, e]);

    console.log(e);
  };
  const changeCream = (e) => {
    const removeOldCream = ingredientPriceInfo.filter(
      (e) => e.type !== "Cream"
    );
    setIngredientPriceInfo([...removeOldCream, e]);

    console.log(e);
  };
  useEffect(() => {
    let totalPrice = 0;
    ingredientPriceInfo?.map((e) => (totalPrice += e.price));
    setTotalPrice((totalPrice + Number(ingredientPrice)).toFixed(2));
  }, [ingredientPrice, ingredientPriceInfo]);

  const addIngredient = (e) => {
    e.preventDefault();

    if (
      !ingredientPrice.length ||
      !strengthRef.current.value.trim() ||
      !nameRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !flavorRef.current.value.trim() ||
      !creamRef.current.value.trim() ||
      !countryRef.current.value.trim()
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const newTask = {
      ingredientName: nameRef.current.value,
      ingredientCream: creamRef.current.value,
      ingredientPrice: totalPrice, // დოლარი //
      ingredientDescription: descriptionRef.current.value,
      ingredientCountry: countryRef.current.value,
      ingredientFlavor: flavorRef.current.value,
      ingredientStrength: strengthRef.current.value,
    };
    fetch(`${API_URL}/ingredients`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_INGREDIENTS_KEY}`,
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
      .then(() => {
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <div className={styles.create_main}>
      <div className={styles.add_product_main}>
        <h1>Create Ingredient</h1>
        <div className={styles.create_div_container}>
          <form className={styles.create_form}>
            <div className={styles.inputs_flex}>
              <div className={styles.flex_div}>
                <label>
                  <h2>Ingredient Name</h2>
                  <input type="text" ref={nameRef} />
                </label>
                <label>
                  <h2>Flvor Type</h2>
                  <FlavorSelectIngredient
                    ref={flavorRef}
                    changeFlavor={changeFlavor}
                  />
                </label>

                <label>
                  <h2>Strength</h2>
                  <input type="text" ref={strengthRef} />
                </label>
              </div>
              <div className={styles.flex_div}>
                <label>
                  <h2>Ingredient Price </h2>
                  <input
                    type="number"
                    value={ingredientPrice || ""}
                    onChange={(e) => setIngredientPrice(e.target.value)}
                    min={0}
                  />
                </label>
                <label className={styles.textarea_label}>
                  <h2>Description </h2>
                  <textarea ref={descriptionRef} />
                </label>
              </div>
            </div>
            <div className={styles.info_bottom_flex}>
              <label>
                <h2>Select Country</h2>
                <CountrySelect ref={countryRef} />
              </label>
              <label>
                <h2>Select Creams & Toppings </h2>
                <CreamSelect changeCream={changeCream} ref={creamRef} />
              </label>
            </div>

            <div className={styles.total_price}>
              <p>Total Price :</p>
              <p className={styles.price}>{totalPrice}$</p>
            </div>

            <div className={styles.add_button}>
              <BlueButton title={"Add Ingredient"} func={addIngredient} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateIngredient;
