import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import firebase from 'firebase';

import "./CreateProduct.css";

export default function CreateProduct() {
  const [products, setProducts] = useState({
    name: "",
    description: "",
    processor: "",
    storage: "",
    screen: "",
    ram: "",
    camara: "",
    frontcamara: "",
    battery: "",
    dimensions: "",
    others: "",
    price: "",
    stock: "",
    img: "",
    colors: [],
  });

  const [categories, setcategory] = useState([]);
  const [sugestions, setSugestions] = useState([]);
  const [selectedcategories, setcateselect] = useState([]);
  const [selectedsugestions, setsugeselect] = useState([]);
  const [acum, setAcum] = useState(0);
  const [uploadValue, setUploadValue] = useState(0);
  const [imgProd, setImgProd] = useState(null);

  const history = useHistory();

  function rendercategories(cat) {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name={cat.id}
          onChange={(e) => {
            loadcategory(e);
          }}
        />
        <label className="form-check-label" htmlFor="gridCheck1">
          {cat.name}
        </label>
      </div>
    );
  }

  function rendersugestions(cat) {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          name={cat.id}
          onChange={(e) => {
            loadsugestion(e);
          }}
        />
        <label className="form-check-label" htmlFor="gridCheck1">
          {cat.name}
        </label>
      </div>
    );
  }

  function loadcategory(e) {
    //esta funcion agrega a un arreglo de las categorias seleccionadas
    console.log(e.target.checked); //detecta en que estado el checkbox , si esta true agregamos la categorias
    //si esta false quitamos la categoria

    if (e.target.checked === true) {
      setcateselect([...selectedcategories, e.target.name]);
    }

    if (e.target.checked === false) {
      setcateselect(selectedcategories.filter((c) => c !== e.target.name));
    }
  }

  function loadsugestion(e) {
    //esta funcion agrega a un arreglo de las categorias seleccionadas
    console.log(e.target.checked); //detecta en que estado el checkbox , si esta true agregamos la categorias
    //si esta false quitamos la categoria

    if (e.target.checked === true) {
      setsugeselect([...selectedsugestions, e.target.name]);
    }

    if (e.target.checked === false) {
      setsugeselect(selectedsugestions.filter((c) => c !== e.target.name));
    }
  }

  function handleChange(e) {
      setProducts({
        ...products,
        [e.target.name]: e.target.value,
      });
  }

  function handlerSubmnit(e) {
    e.preventDefault();
    console.log(products.colors);
    axios
      .post("/products/", products ,{ headers: { authorization:localStorage.getItem('token') } })//http://localhost:4000
      .then(function (response) {
        selectedcategories.map((cat) => {
          // response trae la respuesta de la peticion, q devuelve la respuesta del back
          // entonces pudimos traer el id del producto que acabamos de crear y asi cargarle las categorias
          axios
            .post(
              `/products/${response.data.id}/category/${cat}`,{ headers: { authorization:localStorage.getItem('token') } }//http://localhost:4000
            )
            .then(function (response) { }); //esto se asegura que se postee todo antes de recargar la pagina
        });
        selectedsugestions.map((sug) => {
          //por cada sugestion cargado lo asocia al producto
          axios
            .post(
              `/products/${response.data.id}/sugestion/${sug}`,{ headers: { authorization:localStorage.getItem('token') } }//http://localhost:4000
            )
            .then(function (response) { }); //esto se asegura que se postee todo antes de recargar la pagina
        });
        history.push("/showProducts");
      });
  }

  //funcion subir img a firebase

  function handleUpload (e){
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref(`/E-com-product-fotos/${file.name}`);
    const task = storageRef.put(file);

    task.on('state_changed', snapshot =>{
      let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
      setUploadValue(percentage)
    }, err => {
      console.log(err);
    }, async ()=>{
      const urlImg = await storageRef.getDownloadURL()
      setImgProd( urlImg )
      setProducts({
        ...products,
        img:urlImg
      })
    })
  }

  function handleUploadMor (e, i){
    let name = e.target.name
    if (name === `color${i}`) {
      const file = e.target.files[0];
      const storageRef = firebase.storage().ref(`/E-com-product-fotos/${file.name}`);
      const task = storageRef.put(file);

      task.on('state_changed', snapshot =>{
        let percentage = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
        setUploadValue(percentage)
      }, err => {
        console.log(err);
      }, async ()=>{
        const urlImg = await storageRef.getDownloadURL()
        setImgProd( urlImg );
        resolvColors(name, urlImg)
      })
    }
  }

  function resolvColors (target, urlImg){
    var newArr = [...products.colors];

    for (var i = 0; i < newArr.length; i++) {
      if (newArr[i].color === target) {
        newArr[i].text = urlImg;
      }
    }

    setProducts({
      ...products,
      colors: newArr,
    });

  }

  useEffect(() => {
    //trae las categorias apenas entra a la pagina
    axios.get("/category/").then((response) => {//http://localhost:4000
      setcategory(response.data);
    });
    axios.get("/sugestions/").then((response) => {//http://localhost:4000
      setSugestions(response.data);
    });
  }, []);

  // el prevent default sirve para q no recargue la pagina con el primer post
  return (
    <div className="add-product-container">
      {/* <h3>Add new product</h3> */}
      <form onSubmit={handlerSubmnit} className='cont-prin'>
        <h2>Create Product</h2>
        <div className="row100">
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="name"
                type="text"
                required
              />
              <span className="text">Product name</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="screen"
                type="text"
                required
              />
              <span className="text">Product screen</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="processor"
                type="text"
                required
              />
              <span className="text">Product processor</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="ram"
                type="text"
                required
              />
              <span className="text">Product ram</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="storage"
                type="text"
                required
              />
              <span className="text">Product storage</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="camara"
                type="text"
                required
              />
              <span className="text">Product camara</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="frontcamara"
                type="text"
                required
              />
              <span className="text">Product frontcamara</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="battery"
                type="text"
                required
              />
              <span className="text">Product battery</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="dimensions"
                type="text"
                required
              />
              <span className="text">Product dimensions</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="others"
                type="text"
                required
              />
              <span className="text">others</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="description"
                type="text"
                required
              />
              <span className="text">Product description</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="price"
                type="number"
                required
              />
              <span className="text">Product price</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <input
                onChange={(e) => {
                  handleChange(e);
                }}
                name="stock"
                type="number"
                required
              />
              <span className="text">Product stock</span>
              <span className="line"></span>
            </div>
          </div>
          <div className="column">
            <div className="inputBox">
              <progress value={uploadValue} max='100' ></progress>
              <input
                onChange={(e) => {
                  handleUpload(e);
                }}
                name="img"
                type="file"
                required
              />
              <span className="text">Product img</span>
              <span className="line"></span>
            </div>
          </div><div className="column">
            {products.colors.map((n, i) => (
              <div className="inputBox spa">
                <input
                  key={i}
                  type="file"
                  name={`color${i + 1}`}
                  id={i + 1}
                  onChange={(e) => {
                    handleUploadMor(e, i + 1)
                  }}
                />
                <span className="text">{`imagen ${i + 1}`}</span>
                <span className="line"></span>
              </div>
            ))}
            <div className="column btn"
              onClick={() => {
                var num = acum + 1
                setAcum(num)
                setProducts({
                  ...products,
                  colors: products.colors.concat({ color: `color${num}`, text: "h" }),
                });
              }}
            >
              Add empty input
            </div>
          </div>
        </div>
        <div className="form-group row">
          <hr />
          <label className="col-sm-2 col-form-label">Product categories</label>
          <div className="col-sm-10">
            <div className="m-1">
              {categories.map((cat) => rendercategories(cat))}
            </div>
          </div>
          <hr />
          <label className="col-sm-2 col-form-label">
            Sugestions Categories
          </label>
          <div className="col-sm-10">
            <div className="m-1">
              {sugestions.map((cat) => rendersugestions(cat))}
            </div>
          </div>
        </div>
        <div className="row100">
          <div className="column">
            <input type="submit" value='Add product' className="" />
          </div>
        </div>
      </form>
    </div>
  );
}
