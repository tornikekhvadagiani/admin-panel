import { useRef, useState } from "react";
import styles from "./CreateProducts.module.css";
import { useNavigate, useParams } from "react-router-dom";
import AddIngredients from "../../components/AddIngredients";
import { useMyContext } from "../../context/Context";
import CreateForm from "./CreateForm";
import { useEffect } from "react";
import { InfinitySpin } from "react-loader-spinner";
import { convertToGel } from "../../components/convertToGel";

const CreateCoffe = () => {
  const [coffePrice, setCoffePrice] = useState(0);
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
  const [isLoaded, setIsLoaded] = useState(id ? false : true);
  const [addedIngredients, setAddedIngredients] = useState([]);

  useEffect(() => {
    let totalPrice = 0;
    coffePriceInfo?.forEach((e) => (totalPrice += Number(e.price)));
    addedIngredients?.forEach((e) => (totalPrice += Number(e.price)));
    const validCoffePrice = Number(coffePrice) || 0;
    setTotalPrice((totalPrice + validCoffePrice).toFixed(2));
  }, [coffePrice, coffePriceInfo, addedIngredients]);

  const addMoreIngredient = () => {};

  const addCoffe = async (e) => {
    e.preventDefault();

    if (
      !typeRef.current.value.trim() ||
      !coffePrice ||
      !sugarRef.current.value.trim() ||
      !coffeineRef.current.value.trim() ||
      !descriptionRef.current.value.trim() ||
      !flavorRef.current.value.trim() ||
      !countryRef.current.value.trim()
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const gelAmount = await convertToGel(Number(coffePrice));

    if (gelAmount !== 0 && !gelAmount) {
      console.error("Failed to convert currency.");
      return;
    }

    const newTask = {
      coffeType: typeRef.current.value,
      coffePrice: totalPrice, // Dollar price
      coffeGelPrice: gelAmount, // GEL price
      coffeSugar: sugarRef.current.value,
      coffeine: coffeineRef.current.value,
      coffeDescription: descriptionRef.current.value,
      coffeCountry: countryRef.current.value,
      coffeFlavor: flavorRef.current.value,
      coffeIngredients: addedIngredients,
    };
    fetch(`${API_URL}/${currentData ? `coffe/${id}` : "coffe"}`, {
      method: currentData ? "PUT" : "POST",
      headers: {
        Authorization: `Bearer ${API_COFFE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id ? newTask : [newTask]),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json(); // Process response
      })
      .then(() => {
        navigate("/Products/coffe");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const openIngredients = (e) => {
    e.preventDefault();
    context.setIngredientsPopup(true);
  };
  const getCorrectInfo = () => {
    fetch(`${API_URL}/coffe`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${API_COFFE_KEY}`,
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
        const coffeInfo = data.items.map(
          ({
            _uuid,
            coffeType,
            coffeCountry,
            coffeine,
            coffeDescription,
            coffeFlavor,
            coffePrice,
            coffeSugar,
            coffeIngredients,
          }) => ({
            uuid: _uuid,
            type: coffeType,
            country: coffeCountry,
            coffeine: coffeine,
            description: coffeDescription,
            flavor: coffeFlavor,
            price: coffePrice,
            sugar: coffeSugar,
            ingredients: coffeIngredients,
          })
        );
        let correctObj = coffeInfo.find((e) => e.uuid === id);
        setCurrentData(correctObj);
        setCoffePrice(correctObj?.price);
        setAddedIngredients(correctObj?.ingredients);
        console.log(correctObj);
      })
      .finally(() => setIsLoaded(true));
  };
  useEffect(() => {
    getCorrectInfo();
  }, []);
  const changeFlavor = (newFlavor) => {
    if (!coffePriceInfo) return;
    const removeCurrentFlavor = coffePriceInfo.filter(
      (e) => e.type !== "createFlavor"
    );

    setCoffePriceInfo([...removeCurrentFlavor, newFlavor]);
  };

  return (
    <div className={styles.create_main}>
      <AddIngredients
        addedIngredients={addedIngredients}
        setAddedIngredients={setAddedIngredients}
        isEditing={id}
        currentData={currentData}
      />
      <div className={styles.add_product_main}>
        <h1>{id ? "Edit Coffe" : "Add Coffe"}</h1>
        <div className={styles.create_div_container}>
          {isLoaded ? (
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
              currentData={currentData}
              id={id}
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

export default CreateCoffe;
