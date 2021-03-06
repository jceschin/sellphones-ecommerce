import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import "./ItemCart.css";

const ItemCart = ({ product, idorder, setCart, setAllTotal, getOrders }) => {
  const { id, order_line, stock } = product;
  const [acum, setAcum] = useState(order_line.count);
  const [totalItem, setTotalItem] = useState(order_line.price);
  const user = useSelector((state) => state.auth.user);
  
  useEffect(()=>{
    if(!isNaN(acum)){
      axios.put(`http://localhost:4000/users/${user.id}/cart`, { id: id, acum: acum })
      .then(orden => {
      });
    }
  },[acum])

  async function deleteProduct() {
    await axios.delete(`http://localhost:4000/orders/cart/${idorder}/${id}`)
      .then((res) => {
        setCart(res.data.order);
        setAllTotal(res.data.order.price);
      });
    await getOrders();
  }

  function decAcum() {
    var change = acum - 1;
    if (change <= 0) {
      console.log("Valor erroneo");
    } else {
      var total = product.price * change; 
      setAcum(change);
      setTotalItem(total);
      setAllTotal(total);
    };
  }

  function incAcum() {
    var change = acum + 1;
    if (change > product.stock) {
      console.log("no hay unidades disponibles ");
    } else {
      var total = product.price * change; 
      setAcum(change);
      setTotalItem(total);
      setAllTotal(total);
    }
  }

  function onChange(e) {
    var change = parseInt(e.target.value);
    if (change > product.stock || change < 1) {
      console.log("no hay unidades disponibles ");
    } else {
      var total = product.price * change;
      setAcum(change);
      setTotalItem(total);
    }
  }

  return (
    <tr className="product">
      <td className="product">
        <div className="d-flex text-gen name-product">
          <img src={product.img} alt="" />
          <p>{product.name}</p>
        </div>
      </td>
      <td className="text-gen">
        <p>$ {product.price}</p>
      </td>
      <td className="div-acum-inv ">
        <div className="less-cart-inv" onClick={decAcum}>
          -
        </div>
        <input
          className="acum-inv"
          onChange={onChange}
          type="number"
          value={acum}
        />
        <div className="less-cart-inv" onClick={incAcum}>
          +
        </div>
      </td>
      <td className="text-gen">{stock}</td>
      <td className="text-gen">$ {isNaN(totalItem) ? 0 : totalItem}</td>
      <td className="text-gen">
        <div
          onClick={deleteProduct}
          type="button"
        >
          <i className="far fa-trash-alt"></i>
        </div>
      </td>
    </tr>
  );
};

export default ItemCart;
