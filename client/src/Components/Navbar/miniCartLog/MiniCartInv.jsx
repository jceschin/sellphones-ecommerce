import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {  Dropdown, DropdownButton } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import ItemMiniCart from "./ItemMiniCart";
import "./MiniCartInv.css";

const MiniCart = () => {
  const user = useSelector((state) => state.auth.user);
  const [cart, setCart] = useState({
    products: []
   });
  const [allTotal, setAllTotal] = useState(cart && cart.price);
  const [iconcart, setIconcart] = useState(0);

  useEffect(() => {
    getOrders();
  }, [user, allTotal]);

  async function getOrders() {
    //trae los productos de la orden carrito
    if(user){
      let response = await axios.get(`http://localhost:4000/orders/cart/${user.id}` );
      if(response.data.data === null || response.data.data.products.length < 1){
        var storageCart =JSON.parse( localStorage.getItem('cartItems'));
        localStorage.removeItem('cartItems');
        if(storageCart){
          axios.post(`http://localhost:4000/orders/cart`, { id: user.id })
                .then( res => {
                  storageCart.map(product =>{
                    axios.post(`http://localhost:4000/users/${user.id}/cart/${res.data}`, { id: product.id, acum: product.count });
                  })
                })
                .then(res => {
                  axios.get(`http://localhost:4000/orders/cart/${user.id}` )
                        .then( localResponse =>{
                          console.log(localResponse)
                          setCart(localResponse.data.data);
                          setAllTotal(localResponse.data.data && localResponse.data.data.price);
                        })
                })
        }
      }else{
        setCart(response.data.data);
        setAllTotal(response.data.data && response.data.data.price);
        setIconcart(response.data.data && response.data.data.products.length)
      }
    }
  }

  return (
    <div className='cart-div-glob'>
    <DropdownButton
      menuAlign="left"
      title={<i class="fas fa-cart-arrow-down"></i>}
      id="dropdown-menu-align-left"
    >
      {cart &&
        cart.products.map((product, index)=>{
          return (
            <ItemMiniCart
                    key={index}
                    setCart={setCart}
                    setAllTotal={setAllTotal}
                    allTotal={allTotal}
                    product={product}
                    idorder={cart.id}
                    getOrders={getOrders}
                  />
            
          )})}
      <Dropdown.Item className="next-show-minicart" eventKey="4">
        Total price <p className="subtotal-minicart">${allTotal === undefined ? 0 : allTotal}</p>
      </Dropdown.Item>
      <Dropdown.Item className="next-show-minicart2" eventKey="4">
        <Link to="/cart"> Go to cart </Link>
      </Dropdown.Item>
    </DropdownButton>
    { iconcart !== 0 ? 
      <div className='circle-mini-cart'>{iconcart}</div>
      : null
    }
    </div>
  );
};

export default MiniCart;
