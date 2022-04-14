import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { CSSTransition } from "react-transition-group";
import { seveDataFunc } from "../redux/action-creaters/game-data.actions";
import AddOrDellImg from "./AddOrDellImg";
function GameCard({ data, seveDataFunc, type, userId }) {
  const [message, setMess] = useState("");
  const [flag, setFlag] = useState(false);

  return (
    <div className="game-card-wrapper ">
      <NavLink
        onClick={() => {
          seveDataFunc(data.name, data.id, data.short_screenshots, type);
          setFlag(!flag);
        }}
        to={`/game/${data.name}`}
      >
        <div className="card-medi">
          <img src={data.background_image} alt="/"></img>
        </div>
      </NavLink>
      <div className="card-info">
        <h4>{data.name}</h4>
        <div className="d-flex justify-content-between">
          <AddOrDellImg data={{ data, type, userId, setMess }}></AddOrDellImg>
          <CSSTransition in={flag} timeout={1000} className="my-node">
            <div className="my-node ">{message}</div>
          </CSSTransition>
          <span className="game-meta-text meta-score ">{data.metacritic}</span>
        </div>
      </div>
    </div>
  );
}

const mapDispath = {
  seveDataFunc: seveDataFunc,
};
const mapProps = (state) => {
  return {
    state,
    userId: state.authReduser.userId,
  };
};
const connector = connect(mapProps, mapDispath);
export default connector(GameCard);
