import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import { connect } from "react-redux";
import { getMyList } from "../redux/action-creaters/game-data.actions";
function MyList({ userId, count, getMyList, myListData }) {
  const [genersValue, setGenersValue] = useState("");
  const changeGenersHandler = (event) => {
    setGenersValue(event.target.value);
  };
  useEffect(() => {
    getMyList(userId, genersValue);
  }, [count, genersValue, userId, getMyList]);

  if (myListData === null) {
    return <div className="lds-dual-ring"></div>;
  } else {
    return (
      <div>
        <select
          value={genersValue}
          className="form-select  text-white filter  bg-dark"
          aria-label="Default select example"
          onChange={changeGenersHandler}
        >
          <option value="">Geners</option>
          <option value="action">Action</option>
          <option value="indie">Indie</option>
          <option value="role-playing-games-rpg">RPG</option>
          <option value="strategy">Strategy</option>
          <option value="shooter">Shooter</option>
          <option value="racing">Racing</option>
          <option value="fighting">Fighting</option>
          <option value="arcade">Arcade</option>
          <option value="massively-multiplayer">Massively Multiplayer</option>
        </select>
        <h1 className="heading">Мой список</h1>
        <div className="game-wrapper">
          {myListData.map((game) => {
            return (
              <GameCard key={game.name} data={game} type={"del"}></GameCard>
            );
          })}
        </div>
        <div className="art-bg">
          <div className="art-wrapper">
            <div className="art bg-style-all "></div>
          </div>
        </div>
      </div>
    );
  }
}

const mapProps = (store) => {
  return {
    userId: store.authReduser.userId,
    count: store.gameReduser.count,
    myListData: store.gameReduser.myListData,
  };
};
const mapDispath = {
  getMyList: getMyList,
};
const connector = connect(mapProps, mapDispath);
export default connector(MyList);
