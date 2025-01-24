import styles from "./ManageProducts.module.css";
import BlueButton from "../../components/BlueButton";
import { useEffect, useState } from "react";
import { useMyContext } from "../../context/Context";
import { InfinitySpin } from "react-loader-spinner";

import randn from "randn";
import InfoType from "./infoType";
const ManageProducts = () => {
  const [data, setData] = useState(null);
  const { API_URL, API_INGREDIENTS_KEY, API_COFFE_KEY } = useMyContext();
  const [fetchType, setFetchType] = useState("ingredients");
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
    fetch(`${API_URL}/${fetchType}`, {
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
        console.log(data.items);

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
        const coffeInfo = data.items.map(
          ({
            _uuid,
            coffeType,
            coffeCountry,
            coffeDescription,
            coffeFlavor,
            coffePrice,
            coffeSugar,
            coffeine,
          }) => ({
            uuid: _uuid,
            type: coffeType,
            country: coffeCountry,
            description: coffeDescription,
            flavor: coffeFlavor,
            price: coffePrice,
            sugar: coffeSugar,
            coffeine: coffeine,
          })
        );
        setData(fetchType === "ingredients" ? ingredientInfo : coffeInfo);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoaded(true));
  }, [fetchType]);
  return (
    <div className={styles.manage_main}>
      <div className={styles.manage_box}>
        <div className={styles.manage_header_flex}>
          <h1>Manage Products</h1>
          <div>
            <BlueButton
              title={"Show Coffes"}
              func={() => setFetchType("coffe")}
            />
            <BlueButton
              title={"Show Ingredients"}
              func={() => setFetchType("ingredients")}
            />
          </div>
        </div>

        <div className={styles.create_div_container}>
          {isLoaded ? (
            <div className={styles.manage_list_main}>
              <div className={`${styles.list} ${styles.list_top}`}>
                <div className={styles.option}>
                  <InfoType
                    fetchType={fetchType}
                    ingredientValue={"Ingredient Name"}
                    coffeValue={"Coffe Type"}
                  />
                </div>
                <div className={styles.option}>Ingredient Country</div>
                <div className={styles.option}>Ingredient Flavor</div>
                <div className={styles.option}>
                  {" "}
                  <InfoType
                    fetchType={fetchType}
                    ingredientValue={"Ingredient Cream"}
                    coffeValue={"Coffeine"}
                  />
                </div>
                <div className={styles.option}>Ingredient Price</div>
              </div>

              {data?.map((e, i) => (
                <div className={`${styles.list} `} key={randn()}>
                  <div className={styles.option}>
                    <InfoType
                      fetchType={fetchType}
                      ingredientValue={data[i].name}
                      coffeValue={data[i].type}
                    />
                  </div>
                  <div className={styles.option}>{data[i].country}</div>
                  <div className={styles.option}>{data[i].flavor}</div>
                  <div className={styles.option}>
                    {" "}
                    <InfoType
                      fetchType={fetchType}
                      ingredientValue={data[i].cream}
                      coffeValue={data[i].coffeine}
                    />
                  </div>
                  <div className={styles.option} style={{ color: "limegreen" }}>
                    {data[i].price}$
                  </div>
                  <div className={styles.edit}>Edit</div>
                  <div className={styles.index}>{i}</div>
                </div>
              ))}
            </div>
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

export default ManageProducts;
