import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Categorys.css";

const Categorys = () => {
  const [selectCategory, setSelectCategory] = useState({
    id: "",
    name: "",
  });

  const [allCategories, setAllCategories] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:4000/category/").then((categories) => {
      setAllCategories(allCategories.concat(categories.data));
    });
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = (category) => {
    setShow(true);
    setSelectCategory(category);
  };

  function handleChange(e) {
    setSelectCategory({
      ...selectCategory,
      [e.target.name]: e.target.value,
    });
  }

  function handlerEdit(e) {
    e.preventDefault();
    axios
      .put(
        `http://localhost:4000/category/${selectCategory.id}`,
        selectCategory,
        { headers: { authorization: localStorage.getItem("token") } }
      )
      .then((res) => {
        var cat = allCategories.findIndex((cat) => cat.id === res.data.data.id);
        allCategories[cat] = res.data.data;
        handleClose();
      });
  }

  function handlerDelete(id) {
    axios
      .delete(`http://localhost:4000/category/${id}`, {
        headers: { authorization: localStorage.getItem("token") },
      })
      .then((res) => {
        var news = allCategories.filter(
          (elemt) => elemt.id !== res.data.data.id
        );
        setAllCategories(news);
      });
  }

  return (
    <div className=" container category-container ">
      <div className="list-catg-all">
        <div className="col-8 cont-list-catg">
          <div className=" d-flex bg-dark p-4">
            <Link to="/createcategory">
              <button type="button" className="btn btn-secondary btn-sm p-2">
                <i class="fas fa-plus-circle me-2"></i>
                Add new category
              </button>
            </Link>
            <div></div>
            <div></div>
          </div>
          <table className="table table-Light table-striped">
            <thead className="input-box-check">
              <tr className="text-center color-table-product">
                <th scope="col">Category Id</th>
                <th scope="col">Name</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {allCategories.map((categoria, index) => {
                const { id, name } = categoria;
                return (
                  <tr className="text-center category-content" key={index}>
                    <td>{id}</td>
                    <td>{name}</td>
                    <td className="form-td-btn-edit">
                      <button
                        onClick={() => handleShow(categoria)}
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

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Edit category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handlerEdit}>
            <div className=" row">
              <label className="col-sm-2 col-form-label">Id</label>
              <div className="col-sm-10">
                <input
                  className="form-control"
                  placeholder={selectCategory.id}
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
                  value={selectCategory.name}
                  onChange={(e) => {
                    handleChange(e);
                  }}
                  name="name"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className='modal-btn-actions'>
              <button type="submit" className="btn btn-primary mb-2">
                Edit category
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

export default Categorys;
