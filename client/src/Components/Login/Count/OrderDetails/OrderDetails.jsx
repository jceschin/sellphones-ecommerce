import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./OrderDetails.css";

const OrderDetails = () => {
  const [orderProducts, setOrderProducts] = useState();
  let { id } = useParams();
  useEffect(() => {
    getOrderProducts();
  }, []);

  async function getOrderProducts() {
    let products = await axios.get(
      `http://localhost:4000/orders/orderproductsdetail/${id}`
    );
    setOrderProducts(products.data.data.products);
  }

  console.log(orderProducts);
  return (
    <div className="conten-order-details">
      <h1>Order Details</h1>
      <div>
        {orderProducts &&
          orderProducts.map((product) => {
            let date = product.order_line.updatedAt.slice(0, -15);
            return (
              <div className="last-product-details">
                <img src={product.img} />
                <h4>{product.name}</h4>
                <p>Cuantity: {product.order_line.count}</p>
                <p>Purshased at: {date}</p>
                <a href={`http://localhost:3000/products/${id}`}>Link</a>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default OrderDetails;
