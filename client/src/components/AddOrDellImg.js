import React from "react";
import { connect } from "react-redux";
import { addGameToList } from "../redux/action-creaters/game-data.actions";
function AddOrDellImg(props) {
  const { data, type, userId, setMess } = props.data;
  if (type === "add") {
    return (
      <img
        onClick={() => {
          props.addGameToList(data, type, userId, setMess);
        }}
        className="img-plus"
        src="../plus-black-symbol.svg"
        alt=""
      ></img>
    );
  } else {
    return (
      <img
        onClick={() => {
          props.addGameToList(data, type, userId, setMess);
        }}
        className="img-plus"
        src="../cross-remove-sign.svg"
        alt=""
      ></img>
    );
  }
}

const mapDispath = {
  addGameToList: addGameToList,
};

const connector = connect(null, mapDispath);
export default connector(AddOrDellImg);
