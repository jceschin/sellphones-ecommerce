import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
//import "./MiniCartInv.css";

const ItemCart = ({ product, idorder, setCart, setAllTotal, getOrders }) => {
  const { id, order_line, stock } = product;
  const [acum, setAcum] = useState(order_line.count);
  const user = useSelector((state) => state.auth.user);
  
  useEffect(()=>{
    if(!isNaN(acum)){
      axios.put(`http://localhost:4000/users/${user.id}/cart`, { id: id, acum: acum })
      .then(orden => {
      });
    }
  },[acum])

  async function deleteProduct() {
    await axios.delete(`http://localhost:4000/orders/miniCart/${idorder}/${id}`)
      .then((res) => {
        console.log(res.data)
        setCart(res.data.order);
        setAllTotal(res.data.orderMin.price);
      });
    //await getOrders();
  }

  function decAcum() {
    var change = acum - 1;
    if (change <= 0) {
      console.log("Valor erroneo");
    } else {
      var total = product.price * change; 
      setAcum(change);
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
      setAllTotal(total);
    }
  }

  return (

    <div className="mini-show-cart">
      <img src={product.img} alt="" />
      <div className="show-left-drop">
        <h5>{product.name}</h5>
        <h6>{product.price}</h6>
      </div>
      <div className="show-rigth-drop">
        <button
          onClick={deleteProduct}
          type="button"
          className="btn btn-danger"
        >
          <i className="far fa-trash-alt"></i>
        </button>
        <div className="acum-minicart-inv">
          <div onClick={decAcum}>-</div>
          <p>{acum}</p>
          <div onClick={incAcum}>+</div>
        </div>
      </div>
    </div>
  );
};

export default ItemCart;
