import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Producto.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faChartPie,
  faExpandArrowsAlt,
  faBatteryFull,
  faMicrochip,
  faExpandAlt,
  faInfo,
} from "@fortawesome/free-solid-svg-icons";
import CreateReview from "../CRUDreview/CreateReview.jsx";
import Reviews from "../Reviews/Reviews.jsx";
import AddToCart from "../AddToCart/AddToCart.jsx";
import AddToCartInvite from "../AddToCart/AddToCartInvite.jsx";
import { useSelector } from "react-redux";
import { faStar } from "@fortawesome/free-solid-svg-icons";
// import Review from "../Review/Review";
import Background from "../../Components/LandingPage/Twirl__2.mp4";

toast.configure();

const Producto = ({ match, review }) => {
  // We get => id = :1
  let { id, stock } = match.params;
  const [product, setProduct] = useState({
    name: "",
    description: "",
    processor: "",
    screen: "",
    ram: "",
    storage: "",
    camara: "",
    frontcamara: "",
    battery: "",
    dimensions: "",
    others: "",
    price: "",
    stock: "",
    img: "",
    colors: [],
  });
  const { user } = useSelector((state) => state.auth);
  let btnDisabled = false;

  const [active, setActive] = useState();

  if (stock === 0) btnDisabled = true;

  useEffect(() => {
    getSpecificProduct(id);
  }, []);

  async function getSpecificProduct(id) {
    let response = await axios.get(`http://localhost:4000/products/${id}`);

    setProduct(response.data.data);
  }

  const [averageRating, setAverageRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews();
  }, []);

  async function getReviews() {
    await axios
      .get(`http://localhost:4000/products/${id}/reviews`)
      .then((products) => {
        let reviews = products.data.data.reviews;

        calculateAverageRating(reviews);
        setReviews(reviews);
      });
  }

  function calculateAverageRating(reviews) {
    if (reviews.length > 0) {
      let reviewsSum = 0;
      reviews.forEach((review) => {
        reviewsSum += review.rating;
      });
      setAverageRating(parseInt((reviewsSum / reviews.length).toFixed()));
    }

    return;
  }

  //notifiacion de add to cart

  const notify = () => {
    toast.dark(" 🦄 This product was added to the cart", {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
    });
  };

  function renderaddtocartinvite() {
    return (
      <div onClick={notify}>
        <AddToCartInvite product={product} id={id} btnDisabled={btnDisabled} />
      </div>
    );
  }

  function renderaddtocartuser() {
    return (
      <div onClick={notify}>
        <AddToCart id={id} btnDisabled={btnDisabled} />
      </div>
    );
  }

  return (
    <div className="producto">
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
      <div className="product-content d-flex">
        <div className="info-top">
          <img src={product.img} alt="Img not found" />
          <div className="rating-sector">
            <div className="rating-product">
              {Array(averageRating)
                .fill(0)
                .map((n) => {
                  return (
                    <FontAwesomeIcon
                      icon={faStar}
                      className="color-estrellita fa-2x"
                    />
                  );
                })}
            </div>
            <button onClick={setActive} className="button-rating-detail">
              Click for watch reviews
            </button>
          </div>
        </div>
        {!active ? (
          <div className="product-info-stat">
            <div className="product-description">
              <h3 className="product-name pb-2">{product.name}</h3>
              <div className="product-specific">
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faCamera} />
                  <div>
                    <p>{product.frontcamara}</p>
                    <p className="product-info-details">Camera</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faChartPie} />
                  <div>
                    <p>{product.storage}</p>
                    <p className="product-info-details">Storage</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faExpandAlt} />
                  <div>
                    <p>{product.screen}</p>
                    <p className="product-info-details">Screen</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faCamera} />
                  <div>
                    <p>{product.camara}</p>
                    <p className="product-info-details">Back camera</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faBatteryFull} />
                  <div>
                    <p>{product.battery}</p>
                    <p className="product-info-details">Battery</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faMicrochip} />
                  <div>
                    <p>{product.processor}</p>
                    <p className="product-info-details">Proccesor</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faMicrochip} />
                  <div>
                    <p>{product.ram}</p>
                    <p className="product-info-details">Ram</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faExpandArrowsAlt} />
                  <div>
                    <p>{product.dimensions}</p>
                    <p className="product-info-details">Dimensions</p>
                  </div>
                </div>
                <div className="product-specific-ind d-flex">
                  <FontAwesomeIcon icon={faInfo} />
                  <div>
                    <p>{product.others}</p>
                    <p className="product-info-details">Others</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-info-bot d-flex">
              <div className="cont">
                <h5>Others colors availables:</h5>
                <div className="product-colors">
                  {product.colors &&
                    product.colors.map((color) => {
                      return (
                        <div className="color">
                          <div className="d1">
                            <img
                              src={JSON.parse(color).text}
                              alt="img not found"
                              className="detail-product-colors"
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="product-price d-flex">
                <div className="price">
                  <p>Final Price:</p>
                  <p>${product.price}</p>
                </div>
                {user === undefined
                  ? renderaddtocartinvite()
                  : renderaddtocartuser()}
              </div>
            </div>
          </div>
        ) : (
          <div className="reviews-box">
            {/* {user ? <CreateReview productId={match.params.id} /> : null} */}
            <Reviews productId={match.params.id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Producto;
