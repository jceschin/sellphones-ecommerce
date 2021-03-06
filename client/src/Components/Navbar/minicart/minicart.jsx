import React from "react";
import {  Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  editCount,
  removeFromCart,
} from "../../../store/Actions/cartActions";
import "./miniCart.css";

const MiniCart = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { TotalOrden } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  function minAcum(product) {
    var change = parseInt(product.count) - 1;
    if (change <= 0) {
      console.log("Valor erroneo");
    } else {
      dispatch(editCount(product, change));
    }
  }

  function maxAcum(product) {
    var change = parseInt(product.count) + 1;
    if (change > product.stock) {
      console.log("no hay unidades disponibles ");
    } else {
      dispatch(editCount(product, change));
    }
  }

  function removeCart(product) {
    dispatch(removeFromCart(product));
  }

  return (
    <div className='cart-div-glob'>
      <DropdownButton
        menuAlign="left"
        title={<i class="fas fa-cart-arrow-down"></i>}
        id="dropdown-menu-align-left"
      >
        {cartItems &&
          cartItems.map((product, index)=>{
            return (
              <div className="mini-show-cart-inv">
                <img src={product.img} alt="" />
                <div className="show-left-drop">
                  <h5>{product.name}</h5>
                  <h6>{product.price}</h6>
                </div>
                <div className="show-rigth-drop">
                  <div className="acum-minicart">
                    <div onClick={()=> minAcum(product)}>-</div>
                    <p>{product.count}</p>
                    <div onClick={()=> maxAcum(product)}>+</div>
                  </div>
                  <button
                    onClick={() => removeCart(product)}
                    type="button"
                    className="btn btn-danger"
                  >
                    <i className="far fa-trash-alt"></i>
                  </button>
                </div>
              </div>
            )})}
        <Dropdown.Item className="next-show-minicart" eventKey="4">
          Total price <p className="subtotal-minicart">${TotalOrden}</p>
        </Dropdown.Item>
        <Dropdown.Item className="next-show-minicart2" eventKey="4">
        <Link to="/cart"> Go to cart </Link>
        </Dropdown.Item>
      </DropdownButton>
      { cartItems.length > 0 ? 
        <div className='circle-mini-cart'>{cartItems.length}</div>
        : null
      }
    </div>
  );
};

export default MiniCart;
