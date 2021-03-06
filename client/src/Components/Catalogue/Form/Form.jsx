import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Form.css";
import { postsugestions } from "../../../store/Actions/Product_Actions.js";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "./Form.css";

const Form = () => {
  // Define selectedSugestions to be passed as props to Sugestions component
  const [selectedSugestions, setSelectedSugestions] = useState([]);
  let [cont, setCont] = useState(0);

  // Get sugestion options to be displayed in form
  const [sugestions, setSugestions] = useState();
  const [personal, setPersonal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  let [wishedProduct, setWishedProduct] = useState();

  useEffect(() => {
    axios.get("http://localhost:4000/sugestions/").then((res) => {
      setSugestions(res.data);
    });
  }, []);

  function finalproduct() {
    let result = [];
    selectedSugestions.forEach((x) => {
      result.push(x.id);
    });
    axios
      .post("http://localhost:4000/products/sugestions", {
        sugestion: result,
      })
      .then((response) => {
        let finalresult = [];
        if (response.data.length > 1) {
          response.data.map((x) => {
            finalresult.push(x.id);
          });
          setWishedProduct(
            finalresult[Math.floor(Math.random() * finalresult.length)]
          );
        } else if (response.data.length == 1) {
          setWishedProduct(response.data.id);
        } else {
          wishedProduct =
            "We dont have the perfect mobile for you, try it again!";
        }
        console.log(wishedProduct);
        setPersonal(true);
      });
    setSugestions(undefined);
  }

  // Handle change in category input

  function aprove(e) {
    if (e.target.name === "Yes") {
      setSelectedSugestions([...selectedSugestions, sugestions[cont]]);
      console.log("hola", selectedSugestions);
    }
    setCont(++cont);
    if (cont == sugestions.length) {
      finalproduct();
    }
  }

  useEffect(() => {
    dispatch(postsugestions(selectedSugestions));
  }, [selectedSugestions]);

  return (
    <div>
      {personal ? (
        <div className="choose-buttons">
          <button className="wrong-chooise">
            {typeof wishedProduct === "number" ? (
              <div>
                <h1>We choose this phone for you!</h1>
                <div>
                  <a href={`http://localhost:3000/products/${wishedProduct}`}>
                    Link
                  </a>
                </div>
              </div>
            ) : (
              <div>
                <a href={`http://localhost:3000/catalogue`}>
                  We dont have a phone like that!, do it again!
                </a>
              </div>
            )}
          </button>
        </div>
      ) : null}
      <div>
        {sugestions && (
          <div className="align-items-personalized">
            <h1 className="personalized-title">{sugestions[cont].desc} ?</h1>
            <div className="choose-buttons">
              <button
                onClick={(e) => {
                  aprove(e);
                }}
              >
                No
              </button>
              <button
                name="Yes"
                onClick={(e) => {
                  aprove(e);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Form;
