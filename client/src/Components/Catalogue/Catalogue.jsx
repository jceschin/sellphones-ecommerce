import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Background from "../../Components/LandingPage/Twirl__2.mp4";
import ProductCard from "../ProductCard/ProductCard.jsx";
import CategoryCard from "../CategoryCard/CategoryCard.jsx";
import "./Catalogue.css";
import { getProduct } from "../../store/Actions/Product_Actions.js";
import Form from "../Catalogue/Form/Form";

const Catalogue = (props) => {
  // Get list of products and categories from DB
  const [allProducts, setAllProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [active, setActive] = useState(true);
  const [selectForm, setSelectForm] = useState(false);
  const [selectCatalogue, setSelectCatalogue] = useState(false);

  useEffect(() => {
    if (props.match.params.search) {
      axios
        .get(
          "http://localhost:4000/products/search/" + props.match.params.search
        )
        .then((res) => {
          setAllProducts(res.data);
        });
    } else {
      getProduct(selectedCategories).then((products) => {
        setAllProducts(products.data);
      });
    }
  }, [selectedCategories]);

  useEffect(() => {
    axios.get("http://localhost:4000/category/").then((categories) => {
      setAllCategories(categories.data);
    });
  }, []);

  const categoryHandler = (name) => {
    if (selectedCategories.includes(name)) {
      setSelectedCategories(
        selectedCategories.filter((element) => element !== name)
      );
    } else {
      setSelectedCategories([...selectedCategories, name]);
    }
  };

  function handleChoose(choose) {
    if (choose === "selectForm") {
      setActive(false);
      setSelectForm(true);
    }
    if (choose === "selectCatalogue") {
      setActive(false);
      setSelectCatalogue(true);
    }
  }

  return (
    <div className=" d-flex catalog">
      <video
        autoPlay
        muted
        loop
        style={{
          position: "absolute",
          width: "100%",
          left: "50%",
          top: "50%",
          height: "100%",
          objectFit: "cover",
          transform: "translate(-50%, -50%)",
          zIndex: "-1",
        }}
      >
        <source src={Background} type="video/mp4" />
      </video>

      {active ? (
        <div className="choose-buttons">
          <button
            onClick={() => {
              handleChoose("selectForm");
            }}
          >
            <h1>Let me choose</h1>
            You can see al the phones<br></br> in our catalogue
          </button>
          <button
            onClick={() => {
              handleChoose("selectCatalogue");
            }}
          >
            <h1>Help me choose</h1>
            We help you to choose the<br></br> better phone for you
          </button>
        </div>
      ) : null}
      {selectForm ? (
        <div className=" d-flex catalog ">
          <div className="m-5 catg ">
            <CategoryCard
              onCategoryToggle={categoryHandler}
              categories={allCategories}
            />
          </div>
          <div className="products-grid m-5">
            {allProducts.map((product, index) => {
              return (
                <div key={index}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      {selectCatalogue ? (
        <div>
          <Form />
        </div>
      ) : null}
    </div>
  );
};

export default Catalogue;
