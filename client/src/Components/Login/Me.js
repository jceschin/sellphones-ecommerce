import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Switch, useHistory, Route, useRouteMatch } from "react-router-dom";
import { Avatar } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingBasket,
  faChevronRight,
  faStreetView,
  faHistory,
  faSlidersH,
  faInfo,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

import CountReviews from "./Count/Reviews/CountReviews";
import CountSettings from "./Count/Settings/Settings";
import CountSupport from "./Count/Support/Support";
import CountShoppings from "./Count/Shopping/Shoppings";
import actions from "../../store/Actions/authactions.js";
import "./Css/me.css";
import OrderDetails from "./Count/OrderDetails/OrderDetails";

function App() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { replace } = useHistory();
  let history = useHistory();
  let { url } = useRouteMatch();

  function logout() {
    dispatch(actions.setUser(null));
    window.localStorage.removeItem("token");
    replace("/");
  }

  return (
    <div className="info-user">
      <div className="bar-left">
        <Avatar
          circle
          size="lg"
          src={user.photoURL || "https://hajiri.co/uploads/no_image.jpg"}
          className="avatar-img"
        />
        <span className="name">{`${user.givenName} ${user.familyName}`}</span>
        <div
          className="count-option"
          onClick={() => history.push(url + "/shopping")}
        >
          <span className="option-hover"></span>
          <div className="icon">
            <FontAwesomeIcon icon={faShoppingBasket} />
          </div>
          <span className="option-text">My orders</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className="count-option"
          onClick={() => history.push(url + "/yourOrder")}
        >
          <span className="option-hover"></span>
          <div className="icon">
            <FontAwesomeIcon icon={faStreetView} />
          </div>
          <span className="option-text">Track your order</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className="count-option"
          onClick={() => history.push(url + "/reviews")}
        >
          <span className="option-hover"></span>
          <div className="icon">
            <FontAwesomeIcon icon={faHistory} />
          </div>
          <span className="option-text">My Reviews</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className="count-option"
          onClick={() => history.push(url + "/settings")}
        >
          <span className="option-hover"></span>
          <div className="icon">
            <FontAwesomeIcon icon={faSlidersH} />
          </div>
          <span className="option-text">Settings</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div
          className="count-option option-support"
          onClick={() => history.push(url + "/support")}
        >
          <span className="option-hover"></span>
          <div className="icon">
            <FontAwesomeIcon icon={faInfo} />
          </div>
          <span className="option-text">Support</span>
          <FontAwesomeIcon icon={faChevronRight} />
        </div>
        <div className="count-option" onClick={logout}>
          <span className="option-hover"></span>
          <div className="icon">
            <FontAwesomeIcon icon={faSignOutAlt} />
          </div>
          <span className="option-text">Log Out</span>
        </div>
      </div>
      <div className="user-me">
        <Switch>
          <Route path={url + "/shopping"}>
            <CountShoppings />
          </Route>
          <Route path={url + "/yourOrder"}>
            <div>yourOrder</div>
          </Route>
          <Route path={url + "/reviews"}>
            <CountReviews />
          </Route>
          <Route path={url + "/settings"}>
            <CountSettings />
          </Route>
          <Route path={url + "/support"}>
            <CountSupport />
          </Route>
          <Route path={url + "/orderdetails/:id"}>
            <OrderDetails />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
