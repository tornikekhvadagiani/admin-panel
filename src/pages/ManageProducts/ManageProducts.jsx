import styles from "./ManageProducts.module.css";
import BlueButton from "../../components/BlueButton";
import { useEffect, useState } from "react";
import { useMyContext } from "../../context/Context";
import { InfinitySpin } from "react-loader-spinner";

import randn from "randn";
import InfoType from "./infoType";
import { Link, useNavigate, useParams } from "react-router-dom";
const ManageProducts = () => {
  const [data, setData] = useState(null);
  const { API_URL, API_INGREDIENTS_KEY, API_COFFE_KEY } = useMyContext();
  const [isLoaded, setIsLoaded] = useState(true);
  const { pathFetchType } = useParams();
  const [valuteSwitchIds, setValueSwitchIds] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    setIsLoaded(false);
    fetch(`${API_URL}/${pathFetchType}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${
          pathFetchType === "ingredients" ? API_INGREDIENTS_KEY : API_COFFE_KEY
        }`,
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
            ingredientGelPrice,
            ingredientStrength,
          }) => ({
            uuid: _uuid,
            name: ingredientName,
            country: ingredientCountry,
            cream: ingredientCream,
            description: ingredientDescription,
            flavor: ingredientFlavor,
            price: ingredientPrice,
            gelPrice: ingredientGelPrice,
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
            coffeGelPrice,
          }) => ({
            uuid: _uuid,
            type: coffeType,
            country: coffeCountry,
            description: coffeDescription,
            flavor: coffeFlavor,
            price: coffePrice,
            gelPrice: coffeGelPrice,
            sugar: coffeSugar,
            coffeine: coffeine,
          })
        );
        setData(pathFetchType === "ingredients" ? ingredientInfo : coffeInfo);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setIsLoaded(true));
  };
  useEffect(() => {
    console.log(pathFetchType);

    if (pathFetchType !== "coffe" && pathFetchType !== "ingredients") {
      navigate("/Type-Not-Found");
    }
    fetchData();
  }, [pathFetchType]);

  const switchValute = (e) => {
    console.log(valuteSwitchIds);

    if (valuteSwitchIds.includes(e.uuid)) {
      const filtered = valuteSwitchIds.filter((f) => f !== e.uuid);
      setValueSwitchIds(filtered);
      return;
    }
    setValueSwitchIds([...valuteSwitchIds, e.uuid]);
  };

  return (
    <div className={styles.manage_main}>
      <div className={styles.manage_box}>
        <div className={styles.manage_header_flex}>
          <h1>Manage {pathFetchType}</h1>
          <div>
            <BlueButton
              title={"Show Coffes"}
              func={() => navigate("/Products/coffe")}
            />
            <BlueButton
              title={"Show Ingredients"}
              func={() => navigate("/Products/ingredients")}
            />
          </div>
        </div>

        <div className={styles.create_div_container}>
          {isLoaded ? (
            data?.length ? (
              <div className={styles.manage_list_main}>
                <div className={`${styles.list} ${styles.list_top}`}>
                  <div className={styles.option}>
                    <InfoType
                      fetchType={pathFetchType}
                      ingredientValue={"Ingredient Name"}
                      coffeValue={"Coffe Type"}
                    />
                  </div>
                  <div className={styles.option}>
                    <InfoType
                      fetchType={pathFetchType}
                      ingredientValue={"Ingredient Country"}
                      coffeValue={"Coffe Country"}
                    />
                  </div>
                  <div className={styles.option}>
                    <InfoType
                      fetchType={pathFetchType}
                      ingredientValue={"Ingredient Flavor"}
                      coffeValue={"Coffe Flavor"}
                    />
                  </div>
                  <div className={styles.option}>
                    <InfoType
                      fetchType={pathFetchType}
                      ingredientValue={"Ingredient Cream"}
                      coffeValue={"Coffeine"}
                    />
                  </div>
                  <div className={styles.option}>
                    <InfoType
                      fetchType={pathFetchType}
                      ingredientValue={"Ingredient Price"}
                      coffeValue={"Coffe Price"}
                    />
                  </div>
                </div>

                {data?.map((e, i) => (
                  <div className={`${styles.list} `} key={randn()}>
                    <div className={styles.option}>
                      <InfoType
                        fetchType={pathFetchType}
                        ingredientValue={data[i].name}
                        coffeValue={data[i].type}
                      />
                    </div>
                    <div className={styles.option}>{data[i].country}</div>
                    <div className={styles.option}>{data[i].flavor}</div>
                    <div className={styles.option}>
                      <InfoType
                        fetchType={pathFetchType}
                        ingredientValue={data[i].cream}
                        coffeValue={data[i].coffeine}
                      />
                    </div>
                    <div
                      className={`${styles.option} ${styles.price}`}
                      style={{ color: "limegreen" }}
                      onClick={() => switchValute(e)}
                    >
                      <p>
                        {valuteSwitchIds.includes(e.uuid)
                          ? `${e.gelPrice}₾`
                          : `${e.price}$`}
                      </p>
                    </div>
                    <div className={styles.edit}>
                      <Link
                        to={`/${
                          pathFetchType == "ingredients"
                            ? "CreateIngredient"
                            : "CreateCoffe"
                        }/${e.uuid}`}
                      >
                        Edit
                      </Link>
                    </div>
                    <div className={styles.index}>{i + 1}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.data_not_found}>
                <p>{pathFetchType} not created </p>
                <Link
                  to={
                    pathFetchType === "coffe"
                      ? "/CreateCoffe"
                      : "/CreateIngredient"
                  }
                >
                  Create {pathFetchType}
                </Link>
              </div>
            )
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
