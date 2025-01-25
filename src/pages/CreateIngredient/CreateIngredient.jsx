import { useEffect, useRef, useState } from "react";
import styles from "../CreateCoffe/CreateProducts.module.css";

import { FlavorAPI } from "../../API/FlavorAPI";
import { CreamsAPI } from "../../API/CreamsAPI";
import { useMyContext } from "../../context/Context";
import { useNavigate, useParams } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";
import IngredientForm from "./IngredientForm";
import { convertToGel } from "../../components/convertToGel";

const CreateIngredient = () => {
  const nameRef = useRef(null);
  const strengthRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryRef = useRef(null);
  const flavorRef = useRef(null);
  const creamRef = useRef(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ingredientPrice, setIngredientPrice] = useState(totalPrice);
  const { API_INGREDIENTS_KEY, API_URL } = useMyContext();
  const { id } = useParams();
  const [currentData, setCurrentData] = useState();
  const [isLoaded, setIsLoaded] = useState(id ? false : true);

  const getCorrectInfo = () => {
    fetch(`${API_URL}/ingredients`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_INGREDIENTS_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        const ingredientInfo = data.items.map(
          ({
            _uuid,
            ingredientName,
            ingredientCountry,
            ingredientCream,
            ingredientDescription,
            ingredientFlavor,
            ingredientPrice,
            ingredientStrength,
          }) => ({
            uuid: _uuid,
            name: ingredientName,
            country: ingredientCountry,
            cream: ingredientCream,
            description: ingredientDescription,
            flavor: ingredientFlavor,
            price: ingredientPrice,
            strength: ingredientStrength,
          })
        );
        let correctObj = ingredientInfo.find((e) => e.uuid === id);
        setCurrentData(correctObj);
        setIngredientPrice(correctObj?.price);
      })
      .finally(() => setIsLoaded(true));
  };
  useEffect(() => {
    getCorrectInfo();
  }, []);

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
  };
  const changeCream = (e) => {
    const removeOldCream = ingredientPriceInfo.filter(
      (e) => e.type !== "Cream"
    );
    setIngredientPriceInfo([...removeOldCream, e]);
  };

  useEffect(() => {
    let totalPrice = 0;
    ingredientPriceInfo.forEach((e) => (totalPrice += e.price));
    const validIngredientPrice = Number(ingredientPrice) || 0;
    setTotalPrice((totalPrice + validIngredientPrice).toFixed(2));
  }, [ingredientPrice, ingredientPriceInfo]);

  const addIngredient = async (e) => {
    e.preventDefault();

    if (
      !ingredientPrice?.length ||
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
    const gelAmount = await convertToGel(Number(totalPrice));
    if (gelAmount !== 0 && !gelAmount) {
      console.error("Failed to convert currency.");
      return;
    }
    const newTask = {
      ingredientName: nameRef.current.value,
      ingredientCream: creamRef.current.value,
      ingredientGelPrice: gelAmount, // დოლარი //
      ingredientPrice: totalPrice, // დოლარი //
      ingredientDescription: descriptionRef.current.value,
      ingredientCountry: countryRef.current.value,
      ingredientFlavor: flavorRef.current.value,
      ingredientStrength: strengthRef.current.value,
    };

    fetch(`${API_URL}/${id ? `ingredients/${id}` : "ingredients"}`, {
      method: id ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${API_INGREDIENTS_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id ? newTask : [newTask]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Return JSON data
      })
      .then(() => {
        navigate("/Products/ingredients");
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className={styles.create_main}>
      <div className={styles.add_product_main}>
        <h1>{id ? "Edit" : "Create"} Ingredient</h1>
        <div className={styles.create_div_container}>
          {isLoaded ? (
            <IngredientForm
              nameRef={nameRef}
              countryRef={countryRef}
              currentData={currentData}
              flavorRef={flavorRef}
              changeFlavor={changeFlavor}
              id={id}
              strengthRef={strengthRef}
              ingredientPrice={ingredientPrice}
              descriptionRef={descriptionRef}
              changeCream={changeCream}
              creamRef={creamRef}
              totalPrice={totalPrice}
              addIngredient={addIngredient}
              setIngredientPrice={setIngredientPrice}
            />
          ) : (
            <div className={styles.loader}>
              <InfinitySpin color="royalblue" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateIngredient;
