import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import "./Shopping.css";
import { useHistory, useRouteMatch } from "react-router-dom";

const CountShoppings = () => {
  const user = useSelector((state) => state.auth.user);
  const [Orders, setOrders] = useState();
  const [active, setActive] = useState();

  const getUserOrders = async () => {
    let response = await axios.get(
      `http://localhost:4000/orders/user/${user.id}`
    );
    setOrders(response.data.data);
  };

  useEffect(() => {
    getUserOrders();
  }, []);
  let history = useHistory();
  let { url } = useRouteMatch();

  return (
    <div className="conten-order">
      <h1>My Orders</h1>
      <div className="all-orders-us">
        {Orders &&
          Orders.map((order) => {
            let date = order.createdAt.slice(0, -15);
            return (
              <div key={order.id} className="individual-order">
                <div className="order-top">
                  <h5>Created on {date}</h5>
                  <button> Repurchase </button>
                </div>
                <div className="order-bot">
                  {order.products.length > 0 ? (
                    <div className="last-product">
                      <img src={order.products[0].img} alt="Img not found" />
                      <div>
                        <h5>{order.products[0].name}</h5>
                        <p>
                          {order.products[0].price} *{" "}
                          {order.products[0].order_line.count} Unit{" "}
                        </p>
                      </div>
                      <button onClick={setActive} className="mx-5">Add review</button>
                    </div>
                  ) : null}
                  <div>
                    <button
                      onClick={() => {
                        history.push(`/me/orderdetails/${order.id}`);
                      }}
                    >
                      See purchase details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CountShoppings;
