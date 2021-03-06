import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Checkout.css";

const Checkout = ({ id }) => {
  const user = useSelector((state) => state.auth.user);
  const [checkOrder, setCheckOrder] = useState({});

  useEffect(() => {
    orderCart();
  }, []);

  const orderCart = async () => {
    let response = await axios.get(
      `http://localhost:4000/orders/cart/${user.id}`
    );
    console.log(response);
    setCheckOrder(response.data.data);
  };

  const handelChange = (e) => {
    setCheckOrder({
      ...checkOrder,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = async (e) => {
    //console.log(checkOrder);
    let response = await axios.put(
      `http://localhost:4000/orders/${id}`,
      checkOrder
    );
    console.log(response);
  };

  const deleteOrder = async () => {
    // aqui se borra la orden
    console.log("Aqui mandar a cancelar la orden");
  };

  return (
    <div className="fond-check">
      {checkOrder ? (
        <div className="formulario-check-out">
          <h2>Shipment information</h2>
          <p>Indicate the city and address where you will receive the products</p>

          <div className="input-check-out">
            <div className="input-box-check">
              <label htmlFor="city">Ciudad</label>
              <input
                onChange={handelChange}
                value={checkOrder.city}
                id="city"
                type="text"
                placeholder="Ingrese la ciudad"
                name="city"
              />
            </div>

            <div className="input-box-check">
              <label htmlFor="Dir">Address</label>
              <input
                onChange={handelChange}
                value={checkOrder.adress}
                id="Dir"
                type="text"
                placeholder="Enter the address"
                name="adress"
              />
            </div>

            <div className="input-box-check">
              <label htmlFor="phone">Phone number</label>
              <input
                onChange={handelChange}
                value={checkOrder.phone}
                id="phone"
                type="text"
                placeholder="Enter the phone"
                name="phone"
              />
            </div>

            <div className="input-box-check">
              <label htmlFor="codeP">Postal Code</label>
              <input
                onChange={handelChange}
                value={checkOrder.postal}
                id="codeP"
                type="text"
                placeholder="Enter your postal code"
                name="postal"
              />
            </div>

            <div className="input-box-check boton-check">
              <Link to={`/pay/${id}`}>
                <button onClick={handelSubmit}> Continue </button>
              </Link>
              <Link to={`/pay/${id}`}>
                <button onClick={deleteOrder}> Reject </button>
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Checkout;
