import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editCount, removeFromCart } from "../../store/Actions/cartActions";
import "./ItemCartInvite.css";

const ItemCartInvite = ({ product }) => {
  const { stock, count, price } = product;
  const [acum, setAcum] = useState(count);
  const [totalItem, setTotalItem] = useState(price * acum);
  const dispatch = useDispatch();

  async function minAcum() {
    var change = parseInt(acum) - 1;
    if (change <= 0) {
      console.log("Valor erroneo");
    } else {
      var total = product.price * change;
      setAcum(change);
      setTotalItem(total);
      dispatch(editCount(product, change));
    }
  }
  // aceptame
  function maxAcum() {
    var change = parseInt(acum) + 1;
    if (change > stock) {
      console.log("no hay unidades disponibles ");
    } else {
      var total = product.price * change;
      setAcum(change);
      setTotalItem(total);
      dispatch(editCount(product, change));
    }
  }

  function removeCart(product) {
    dispatch(removeFromCart(product));
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
      <td className=" product">
        <div className="d-flex text-gen name-product">
          <img src={product.img} alt="" />
          <p>{product.name}</p>
        </div>
      </td>
      <td className="text-gen">
        <p>$ {product.price}</p>
      </td>
      <td className=" div-acum-inv">
        <div className="less-cart-inv" onClick={minAcum}>
          -
        </div>
        <input
          className="acum-inv"
          onChange={onChange}
          type="number"
          value={acum}
        />
        <div className="more-cart-inv" onClick={maxAcum}>
          +
        </div>
      </td>
      <td className="text-gen">{stock}</td>
      <td className="text-gen"> ${isNaN(totalItem) ? 0 : totalItem}</td>
      <td className="text-gen">
        <div
          onClick={() => removeCart(product)}
          type="button"
        >
          <i className="far fa-trash-alt"></i>
        </div>
      </td>
    </tr>
  );
};

export default ItemCartInvite;
