import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../redux/action-creaters/auth.actions";
import { addToStoreGameName } from "../redux/action-creaters/game-data.actions";
const Navbar = ({ logoutUser, addGameName }) => {
  const [value, setValue] = useState("");
  const history = useHistory();
  const logoutHandler = () => {
    logoutUser();
    history.push("/");
  };

  return (
    <nav className="navbar main-navbar navbar-expand-lg navbar-dark p-3">
      <div className="d-flex w-100 justify-content-between align-items-center">
        <NavLink className="btn btn-outline-success p-2 m-2" to="/main">
          Главная
        </NavLink>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            addGameName(value);

            history.push("/search");
          }}
          className="w-100 d-flex  align-items-center "
        >
          <input
            value={value}
            placeholder="Поиск"
            onChange={(e) => {
              setValue(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addGameName(value);

                history.push("/search");
              }
            }}
            className="input-search form-control"
            type="text"
          ></input>

          <NavLink to="/search">
            <button
              onClick={() => {
                addGameName(value);
              }}
              className="btn btn-outline-success mx-3"
              type="button"
            >
              Поиск
            </button>
          </NavLink>
        </form>

        <button
          className="btn btn-outline-danger mx-3"
          onClick={() => {
            logoutHandler();
          }}
          type="button"
        >
          Выйти
        </button>
      </div>
    </nav>
  );
};

const mapDispath = {
  logoutUser: logout,
  addGameName: addToStoreGameName,
};
const connector = connect(null, mapDispath);
export default connector(Navbar);
