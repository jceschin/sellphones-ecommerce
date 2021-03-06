import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import firebase from 'firebase';
import axios from "axios";
import "./Productos.css";

const Productos = () => {
  const [selectProduct, setSelectProduct] = useState({});

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
    setSelectProduct(product);
  };

  function handleChange(e) {
    setSelectProduct({
      ...selectProduct,
      [e.target.name]: e.target.value,
    });
  }

  async function getProducts() {
    var funcGet = await axios.get("http://localhost:4000/products/");
    setAllProducts(funcGet.data);
  }

  function handlerEdit(e) {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/products/${selectProduct.id}`,
        selectProduct,
        { headers: { authorization: localStorage.getItem("token") } }
      )
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
      .delete(`http://localhost:4000/products/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        var news = allProducts.filter((elemt) => elemt.id !== res.data.data.id);
        setAllProducts(news);
      });
  }

  function handleUpload (e){
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`/E-com-product-fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot =>{
      let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
    }, err => {
      console.log(err);
    }, async ()=>{
      const urlImg = await storageRef.getDownloadURL();
      setSelectProduct({
        ...selectProduct,
        img:urlImg
      });
    })
  }

  return (
    <div className=" container productos-bg ">
      <div className="list-prod-all">
        <div className="col-8 cont-list-products">
          <div className=" d-flex pt-4">
            <Link to="/createproduct">
              <button type="button" className="btn btn-success btn-m  add-product-btn">
                <i class="fas fa-plus-circle me-2"></i>
                New product
              </button>
            </Link>
          </div>
          <table className="table table-Light table-striped">
            <thead className="input-box-check">
              <tr className="text-center color-table-product">
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Stock</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allProducts.map((producto, index) => {
                const { id, name, description, price, stock } = producto;
                console.log(producto)
                return (
                  <tr className="text-center products-container" key={index}>
                    <td>{id}</td>
                    <td className="td-width">{name}</td>
                    <td>{price}</td>
                    <td>{stock}</td>
                    <td className=" form-td-btn-edit">
                      <button 
                        onClick={() => handleShow(producto)}
                        type="button"
                        className="btn btn-primary"
                      > 
                        <i className="far fa-edit"></i>
                      </button>
                    </td>
                    <td>  
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
      </div>

      <Modal className="modal-s" show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlerEdit} className='modal-form-CRUDs'>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Id</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  placeholder={selectProduct.id}
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
                  value={selectProduct.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="name"
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
                  value={selectProduct.processor}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="processor"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">screen</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.screen}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="screen"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">ram</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.ram}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="ram"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Image</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.storage}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="storage"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Camara</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.camara}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="camara"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Frontcamara</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.frontcamara}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="frontcamara"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Battery</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.battery}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="battery"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Others</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.others}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="others"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Dimensions</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.dimensions}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="dimensions"
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
                  value={selectProduct.price}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="price"
                  type="number"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Stock</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  value={selectProduct.stock}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="stock"
                  type="number"
                  required
                />
              </div>
            </div>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Img</label>
              <div className="col-sm-10">
                <input
                  onChange={(e) => {
                    handleUpload(e);
                  }}
                  name="img"
                  type="file"
                />
              </div>
            </div>  
            <div className='modal-btn-actions'>
              <button type="submit" className="btn btn-primary mb-2">
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

export default Productos;
