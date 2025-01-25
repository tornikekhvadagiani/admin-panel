import { useRef, useState } from "react";
import styles from "./CreateProducts.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AddIngredients from "../../components/AddIngredients";
import { useMyContext } from "../../context/Context";
import CreateForm from "./CreateForm";
import { useEffect } from "react";

const CreateProducts = () => {
  const [coffePrice, setCoffePrice] = useState(null);

  const [coffePriceInfo, setCoffePriceInfo] = useState([
    { type: "default", title: "Coffe Price", price: coffePrice },
    { type: "createFlavor", title: "Vanilla", price: 0.75 },
  ]);

  const typeRef = useRef(null);
  const sugarRef = useRef(null);
  const coffeineRef = useRef(null);
  const descriptionRef = useRef(null);
  const countryRef = useRef(null);
  const flavorRef = useRef(null);
  const navigate = useNavigate();
  const context = useMyContext();
  const { API_COFFE_KEY, API_URL } = useMyContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const { id } = useParams();
  const [currentData, setCurrentData] = useState();

  useEffect(() => {
    let totalPrice = 0;
    coffePriceInfo?.map((e) => (totalPrice += e.price));
    setTotalPrice((totalPrice + Number(coffePrice)).toFixed(2));
  }, [coffePrice, coffePriceInfo]);

  const addMoreIngredient = () => {};

  const addCoffe = (e) => {
    e.preventDefault();

    console.log(countryRef.current.value);

    if (
      !typeRef.current.value.trim() ||
      !coffePrice.length ||
      !sugarRef.current.value.trim() ||
      !coffeineRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !flavorRef.current.value.trim() ||
      !countryRef.current.value.trim()
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const newTask = {
      coffeType: typeRef.current.value,
      coffePrice: coffePrice, // დოლარი //
      coffeSugar: sugarRef.current.value, // გრამობითაა //
      coffeine: coffeineRef.current.value,
      coffeDescription: descriptionRef.current.value,
      coffeCountry: countryRef.current.value,
      coffeFlavor: flavorRef.current.value,
    };
    fetch(`${API_URL}/coffe`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_COFFE_KEY}`,
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
  const openIngredients = (e) => {
    e.preventDefault();
    context.setIngredientsPopup(true);
  };
  const changeFlavor = (newFlavor) => {
    const removeCurrentFlavor = coffePriceInfo.filter(
      (e) => e.type !== "createFlavor"
    );
    console.log([...removeCurrentFlavor, newFlavor]);

    setCoffePriceInfo([...removeCurrentFlavor, newFlavor]);
  };

  return (
    <div className={styles.create_main}>
      {context.ingredientsPopup && <AddIngredients />}
      <div className={styles.add_product_main}>
        <h1>Add Product</h1>
        <div className={styles.create_div_container}>
          <CreateForm
            addCoffe={addCoffe}
            openIngredients={openIngredients}
            typeRef={typeRef}
            coffePrice={coffePrice}
            setCoffePrice={setCoffePrice}
            coffeineRef={coffeineRef}
            sugarRef={sugarRef}
            countryRef={countryRef}
            flavorRef={flavorRef}
            descriptionRef={descriptionRef}
            total_price={totalPrice}
            addMoreIngredient={addMoreIngredient}
            changeFlavor={changeFlavor}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateProducts;
