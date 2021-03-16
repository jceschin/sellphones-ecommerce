import React from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router-dom";
import actions from "../../store/Actions/authactions.js";
import {
  faShoppingBag,
  faCartArrowDown,
  faAtlas,
  faTruck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Searchbar from "../Searchbar/Searchbar.js";
import { useSelector, useDispatch } from "react-redux";
import "./Navbar.css";
import MiniCart from "./minicart/minicart";
import MiniCartInv from "./miniCartLog/MiniCartInv";
import Logo from "./logo.png";

function BootstrapNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { replace } = useHistory();
  function logout() {
    dispatch(actions.setUser(null));
    window.localStorage.removeItem("token");
    replace("/");
  }

  if (user === undefined || user === null) {
    return (
      <Container className="" fluid>
        <Row>
          <Navbar collapseOnSelect expand="lg" className="p-2 nav fixed-top">
            <Col xs={5} className="logo-div">
              <Navbar.Brand href="/">
                <i className="fas fa-home home-logo"></i>
                <img src={Logo} alt="img not found" />
              </Navbar.Brand>
            </Col>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              className="nav-drop-down"
              id="responsive-navbar-nav"
            >
              <Nav className="mr-auto infonav align">
                <Col xs={1.5} className="text-center">
                  <Nav.Link href="/catalogue">
                    <FontAwesomeIcon icon={faShoppingBag} /> Catalogue
                  </Nav.Link>
                </Col>
                <Col xs={1.5} className="text-center">
                  <Searchbar />
                </Col>
              </Nav>
              <MiniCart />
            </Navbar.Collapse>
          </Navbar>
        </Row>
      </Container>
    );
  } else {
    if (user && user.isAdmin) {
      return (
        <Container fluid>
          <Row>
            <Navbar collapseOnSelect expand="lg" className="p-2 nav fixed-top">
              <Col xs={5} className="logo-div">
                <Navbar.Brand href="/">
                  <i class="fas fa-home home-logo"></i>
                </Navbar.Brand>
              </Col>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto infonav">
                  <Col xs={2}>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Welcome {user.givenName}!</a>
                        <ul>
                          <li>
                            <a href="/me">My profile</a>
                          </li>
                          <li>
                            <a onClick={logout}>Log out</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={1.5} className="text-center">
                    <Nav.Link href="/catalogue">
                      <FontAwesomeIcon icon={faShoppingBag} /> Catalogue
                    </Nav.Link>
                  </Col>
                  <Col xs={1.5} className="text-center">
                    <Nav.Link href="/cart">
                      <FontAwesomeIcon icon={faCartArrowDown} /> My Cart
                    </Nav.Link>
                  </Col>

                  <Col xs={1.5} className="text-center">
                    <Nav.Link href="/orders">
                      <FontAwesomeIcon icon={faTruck} /> All Orders
                    </Nav.Link>
                  </Col>

                  <Col xs={3}>
                    <Searchbar />
                  </Col>
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container fluid>
          <Row>
            <Navbar collapseOnSelect expand="lg" className="p-2 nav fixed-top">
              <Col xs={5}>
                <Navbar.Brand href="/" className="logo-div ">
                  <i className="fas fa-home home-logo"></i>
                </Navbar.Brand>
              </Col>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse
                id="responsive-navbar-nav"
                className="nav-collapse-reg-2"
              >
                <Nav className="mr-auto infonav align">
                  <Col xs={2}>
                    <ul className="dropdown">
                      <li>
                        <a href="#">Welcome {user.givenName}!</a>
                        <ul>
                          <li>
                            <a href="/me">My profile</a>
                          </li>
                          <li>
                            <a onClick={logout}>Log out</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </Col>
                  <Col xs={1.5} className="text-center">
                    <Nav.Link href="/catalogue">
                      <FontAwesomeIcon icon={faShoppingBag} /> Catalogue
                    </Nav.Link>
                  </Col>
                  <Col xs={3}>
                    <Searchbar />
                  </Col>
                </Nav>
                <MiniCartInv />
              </Navbar.Collapse>
            </Navbar>
          </Row>
        </Container>
      );
    }
  }
}

export default BootstrapNavbar;
