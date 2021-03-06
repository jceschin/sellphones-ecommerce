import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import "./pay.css";

const Pay = ({ id }) => {
  let history = useHistory();
  const user = useSelector((state) => state.auth.user);
  const [checkOrder, setCheckOrder] = useState({});
  const [checkIva, setCheckIva] = useState(0);
  const [checkTotalOrder, setCheckTotalOrder] = useState(0);
  const { products } = checkOrder;


  useEffect(() => {
    orderCart();
  }, []);

  const orderCart = async () => {
    let response = await axios.get(`http://localhost:4000/orders/cart/${user.id}`);
    let constIva = Math.round(response.data.data.price * 0.19);
    let constTotal = response.data.data.price + constIva;
    setCheckIva(constIva);
    setCheckTotalOrder(constTotal);
    setCheckOrder(response.data.data);
  }


  const upOrderBack = async () => {
    if (checkOrder.state === 'inProgress') {
      console.log(checkOrder)
      let response = await axios.put(`http://localhost:4000/orders/${id}`, checkOrder);
      console.log(response.data.data)
      history.push("/");
    }
  }

  const deleteOrder = () => {
    axios.delete(`http://localhost:4000/orders/cart/${id}`)
      .then()
  }

  upOrderBack();

  return (
    <>
      <div className='conten-resumen-order'>
        <div className="resumen-order">
          <h2>Purchase summary</h2>
          <table className="table table-dark table-hover">
            <thead>
              <tr className="text-center">
                <th scope="col">Product</th>
                <th scope="col">Quantity</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {products !== undefined && products.map(product => {
                return (
                  <tr key={product.id}>
                    <td> {product.name} </td>
                    <td> {product.order_line.count} </td>
                    <td> $ {product.price} </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="metodo-pay">
            The payment method is pending
          </div>
          <div className="res-total-pay">
            <div className="res-total">
              <h4> Subtotal: <span>{checkOrder.price}</span> </h4>
            </div>
            <div className="res-ive-total">
              <h2> IVA 19% </h2>  {/* IVA en colombia de 19% */}
              <h3> {checkIva} </h3>
            </div>
            <div className="res-all-total-pay">
              <h2> Total </h2>  {/* IVA en colombia de 19% */}
              <h3> {checkTotalOrder} </h3>
            </div>
          </div>

          <form action="http://localhost:4000/mercadopago" method="GET">
            <input type="hidden" name="id" value={id} />
            <input type="submit" value="TO BUY MERCADOPAGO" class="btn btn-primary btn-block" />
          </form>
          <Link to={"/"}>
            <button onClick={deleteOrder}> Reject </button>
          </Link>

        </div>
      </div>
    </>
  );
}

export default Pay;