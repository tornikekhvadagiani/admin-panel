import styles from "./CreateProducts.module.css";
import CountrySelect from "../../components/CountrySelect";
import FlavorSelect from "../../components/FlavorSelect";
import BlueButton from "../../components/BlueButton";
import TypeSelect from "../../components/TypeSelect";
import { useMyContext } from "../../context/Context";
import { useNavigate } from "react-router-dom";
const CreateForm = ({
  addCoffe,
  openIngredients,
  typeRef,
  coffePrice,
  setCoffePrice,
  coffeineRef,
  sugarRef,
  countryRef,
  flavorRef,
  descriptionRef,
  total_price,
  changeFlavor,
  currentData,
  id,
}) => {
  const { API_URL, API_COFFE_KEY } = useMyContext();
  const navigate = useNavigate();
  const deleteCoffe = (e) => {
    e.preventDefault();

    fetch(`${API_URL}/coffe/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${API_COFFE_KEY}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <form className={styles.create_form}>
      <div className={styles.inputs_flex}>
        <div className={styles.flex_div}>
          <label>
            <h2>Coffe Type</h2>
            <TypeSelect
              ref={typeRef}
              isEditing={currentData}
              editTypeValue={currentData?.type}
            />
          </label>
          <label>
            <h2>Coffe Price</h2>
            <input
              type="number"
              value={coffePrice || ""}
              onChange={(e) => setCoffePrice(e.target.value)}
              min={0}
            />
          </label>
          <label>
            <h2>Coffeine</h2>
            <input
              type="text"
              ref={coffeineRef}
              defaultValue={currentData ? currentData?.coffeine : ""}
            />
          </label>
        </div>
        <div className={styles.flex_div}>
          <label>
            <h2>Sugar (gr) </h2>
            <input
              type="number"
              min={0}
              ref={sugarRef}
              defaultValue={currentData ? currentData?.sugar : ""}
            />
          </label>
          <label className={styles.textarea_label}>
            <h2>Description </h2>
            <textarea
              ref={descriptionRef}
              defaultValue={currentData ? currentData?.description : ""}
            />
          </label>
        </div>
      </div>

      <div className={styles.info_bottom_flex}>
        <label>
          <h2>Select Country</h2>
          <CountrySelect
            ref={countryRef}
            isEditing={currentData}
            editCountryValue={currentData?.country}
          />
        </label>
        <label>
          <h2>Select Flavor</h2>
          <FlavorSelect
            ref={flavorRef}
            changeFlavor={changeFlavor}
            isEditing={currentData}
            editFlavorValue={currentData?.flavor}
          />
        </label>
      </div>
      <div className={styles.total_price}>
        <p>Total Price :</p>
        <p className={styles.price}>{total_price}$</p>
      </div>

      <div className={styles.add_button}>
        <BlueButton
          title={currentData ? "Finish Coffe" : "Add Coffe"}
          func={addCoffe}
        />
        <BlueButton
          title={currentData ? "Edit More Ingredients" : "Add Ingredients"}
          func={openIngredients}
        />

        {currentData && (
          <BlueButton title={"Delete Coffe"} func={deleteCoffe} />
        )}
      </div>
    </form>
  );
};

export default CreateForm;
