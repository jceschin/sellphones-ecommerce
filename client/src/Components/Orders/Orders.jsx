import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Orders.css";
import { Modal } from "react-bootstrap";

const Orders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState({
    id: "",
    price: "",
    state: ""
  });
  const [show, setShow] = useState(false);

  // Get all orders from DB and asign it to local state
  async function getOrders() {
    let response = await axios.get("http://localhost:4000/orders/");
    setAllOrders(response.data);
  }

  // Call getOrders to get all orders
  useEffect(() => {
    getOrders();
  }, []);

  const handleSelectedState = (event) => {
    if (event.target.value === 'allorders') {
      getOrders();
    }
    else {
      getOrderByState(event);
    }
  }

  async function getOrderByState(event) {
    let response = await axios.get(`http://localhost:4000/orders/state/${event.target.value}`);
    setAllOrders(response.data);
  }

  const handleClose = () => setShow(false);

  const handleShow = (order) => {
    setShow(true);
    setSelectedOrder(order);
  };

  function handleChangedState(e) {
    setSelectedOrder({
      ...selectedOrder,
      state: e.target.value
    });
  }

  function handleEdit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/orders/${selectedOrder.id}`, selectedOrder)
      .then((res) => {
        var orderEditedIndex = allOrders.findIndex((order) => order.id === res.data.data.id);
        allOrders[orderEditedIndex] = res.data.data;
        handleClose();
        getOrders();
      });
  }

  return (
    <div className="container all-orders-container">    
      <div className='list-orders-all '>
        <div className="my-4 extend-filter-order">
        <select className="dropdown-select" onChange={handleSelectedState}>
          <option value="allorders">All orders</option>
          <option value="cart">Cart</option>
          <option value="inProcess">In process</option>
          <option value="completed">Completed</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>
        <table className="table table-Light table-striped table-orders">
        <thead className="input-box-check">
          <tr className="text-center">
            <th>Order Id</th>
            <th></th>
            <th>Total Price</th>
            <th>Status</th>
            <th></th>
            <th>User Email</th>
          </tr>
        </thead>
        <tbody>
          {allOrders.map((order) => {
            if (order.user) {
              return (
                <tr className="text-center orders-content">
                  <td>
                    {order.id}
                    {/* <Link to={`/orders/${order.id}`}>{order.id}</Link> */}
                  </td>
                  <td>
                  <button
                      type="button"
                      className="btn btn-primary edit-btn"
                    >
                      <Link to={`/orders/${order.id}`}>Details</Link>
                  </button>                    
                  </td>
                  <td>${order.price}</td>
                  <td>
                    {order.state}
                  </td>
                  <td>  
                    <button
                      onClick={() => handleShow(order)}
                      type="button"
                      className="btn btn-primary edit-btn"
                    >
                      <i className="far fa-edit"></i>
                    </button>
                  </td>
                  <td>{order.user.email}</td>
                </tr>
              );              
            }
          })}
        </tbody>
      </table>
      </div> 
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit order state</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={ (e) => { handleEdit(e) } }>
            <div className="form-group row">
              <label className="col-sm-2 col-form-label">State</label>
              <div className="col-sm-10">
                <select className="dropdown-select" name="state" onChange={ (e) => handleChangedState(e) }>
                  <option select value="seleccionar">Seleccionar</option>
                  {selectedOrder.state === 'cart' ? (
                    <option value="canceled">Canceled</option>
                  ) : null}
                  {selectedOrder.state === 'inProcess' ? (
                    <>
                    <option value="canceled">Canceled</option>
                    <option value="completed">Completed</option>
                    </>
                  ) : null}
                  {selectedOrder.state === 'completed' || selectedOrder.state === 'canceled' ? (
                    null
                  ) : null}
                </select>
              </div>
            </div>

            <button onClick={handleClose} className="btn btn-secondary mb-2">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary mb-2">
              Edit order
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Orders;
