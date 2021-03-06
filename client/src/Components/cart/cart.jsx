import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ItemCart from "../itemCart/ItemCart";
import axios from "axios";

import "./cart.css";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cart, setCart] = useState({});

  //  const [usercart , setusercart] = useState({});
  const [allTotal, setAllTotal] = useState(cart && cart.price);
  //const { products, id } = cart; //se trae los productos y el id de la orden */

  useEffect(() => {
    getOrders();
  }, [user, allTotal]);

  async function getOrders() {
    //trae los productos de la orden carrito
    if (user) {
      let response = await axios.get(
        `http://localhost:4000/orders/cart/${user.id}`
      );
      if (
        response.data.data === null ||
        response.data.data.products.length < 1
      ) {
        var storageCart = JSON.parse(localStorage.getItem("cartItems"));
        localStorage.removeItem("cartItems");
        if (storageCart) {
          axios
            .post(`http://localhost:4000/orders/cart`, { id: user.id })
            .then((res) => {
              storageCart.map((product) => {
                axios.post(
                  `http://localhost:4000/users/${user.id}/cart/${res.data}`,
                  { id: product.id, acum: product.count }
                );
              });
            })
            .then((res) => {
              axios
                .get(`http://localhost:4000/orders/cart/${user.id}`)
                .then((localResponse) => {
                  console.log(localResponse);
                  setCart(localResponse.data.data);
                  setAllTotal(
                    localResponse.data.data && localResponse.data.data.price
                  );
                });
            });
        }
      } else {
        console.log("aqui entro");
        setCart(response.data.data);
        setAllTotal(response.data.data && response.data.data.price);
      }
    }
  }

  return (
    <div className="cart-invnt container d-flex">
      {cart ? (
        <>
          <div className="col-12">
            <h3>Shopping Cart</h3>
            <hr />
            <table className="table">
              <thead >
                <tr className="text-center">
                  <th scope="col">Product</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Stock</th>
                  <th scope="col">Total</th>
                  <th scope="col"> Delete </th>
                </tr>
              </thead>
              <tbody className="text-center">
                {cart.products &&
                  cart.products.map((product, index) => {
                    return (
                      <ItemCart
                        key={index}
                        setCart={setCart}
                        setAllTotal={setAllTotal}
                        allTotal={allTotal}
                        product={product}
                        idorder={cart.id}
                        getOrders={getOrders}
                      />
                    );
                  })}
              </tbody>
            </table>
          </div>
          <div className="col-2 content-pay-inv">
            <h3> Subtotal: <span>{allTotal}</span></h3>
            <div className="bot-button-inv">
              <Link to={`/checkout/${cart.id}`}>
                <button>Next</button>
              </Link>
              <button > Cancel </button>
            </div>
          </div>
        </>
      ) : (
        <div>There is nothing in the car</div>
      )}
    </div>
  );
};

export default Cart;
