import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./userLIST.css";

const UserLIST = () => {
  const [selectUser, setSelectUser] = useState({
    id: "",
    givenNamename: "",
    familyNamename: "",
    email: "",
  });

  const [allProducts, setAllProducts] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (allProducts.length === 0) {
      getProducts();
    }
    getProducts();
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setShow(true);
    setSelectUser(product);
  };

  function handleChange(e) {
    setSelectUser({
      ...selectUser,
      [e.target.name]: e.target.value,
    });
  }

  async function getProducts() {
    var funcGet = await axios.get("http://localhost:4000/user/", {
      headers: { authorization: localStorage.getItem("token") },
    });
    setAllProducts(funcGet.data);
  }

  function handlerEdit(e) {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/user/${selectUser.id}`, selectUser, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        var prod = allProducts.findIndex(
          (product) => product.id === res.data.data.id
        );
        allProducts[prod] = res.data.data;
        handleClose();
      });
  }

  function handlerDelete(id) {
    axios
      .delete(`http://localhost:4000/user/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        var news = allProducts.filter((elemt) => elemt.id !== res.data.data.id);
        setAllProducts(news);
      });
  }

  return (
    <div className=" container all-users-container">
      <div className="list-orders-all ">
          <div className=" my-4 extend-add-user">
            <Link to="/createuser">
              <button type="button" className="btn btn-secondary btn-sm p-2">
                <i class="fas fa-plus-circle me-2"></i>
                Add new user
              </button>
            </Link>
            <div></div>
            <div></div>
          </div>
          <table className="table table-Light table-striped table-orders">
            <thead className="input-box-check">
              <tr className="text-center">
                <th scope="col">User Id</th>
                <th scope="col">Name</th>
                <th scope="col">Lastname</th>
                <th scope="col">Mail</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((producto, index) => {
                const { id, givenName, familyName, email } = producto;
                return (
                  <tr className="text-center all-users-content" key={index}>
                    <td>{id}</td>
                    <td>{givenName}</td>
                    <td>{familyName}</td>
                    <td>{email}</td>
                    <td className=" form-td-btn-edit">
                      <button
                        onClick={() => handleShow(producto)}
                        type="button"
                        className="btn btn-primary"
                      >
                        <i className="far fa-edit"></i>
                      </button>
                    </td>
                    <td className=" form-td-btn-edit">  
                      <button
                        onClick={() => handlerDelete(id)}
                        type="button"
                        className="btn btn-danger"
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlerEdit}>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Id</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  placeholder={selectUser.id}
                  type="text"
                  readOnly
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Name</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectUser.givenName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="givenName"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Description</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectUser.familyName}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="familyName"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Price</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectUser.email}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="email"
                  type="mail"
                  required
                />
              </div>
            </div>
            <div class="form-check form-switch row">
              <label class="form-check-label" for="flexSwitchCheckDefault">
                Admin
              </label>
              {selectUser.isAdmin ? (
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="isAdmin"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  checked
                />
              ) : (
                <input
                  class="form-check-input"
                  type="checkbox"
                  name="isAdmin"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                />
              )}
            </div>
            <div className='modal-btn-actions'>
              <button button type="submit" className="btn btn-primary mb-2">
                Edit
              </button>
              <button onClick={handleClose} className="btn btn-secondary mb-2">
                Cancel
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserLIST;
