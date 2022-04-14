import React, { useEffect, useState } from "react";
import GameCard from "../components/GameCard";
import PrevNext from "../components/PrevNext";
import { connect } from "react-redux";
import { reqGameData } from "../redux/action-creaters/game-data.actions";
function StartPage({ reqGameData, userId }) {
  const [gameData, setData] = useState(null);
  const [countPages, setPages] = useState(1);
  const [genersValue, setGenersValue] = useState("");
  const [platforValue, setPlatforValue] = useState("");
  const changeGenersHandler = (event) => {
    setGenersValue(event.target.value);
  };
  const changePlatformHandler = (event) => {
    setPlatforValue(event.target.value);
  };
  const uppPagesCount = (count) => {
    setPages(count);
  };
  useEffect(() => {
    reqGameData(
      `${genersValue !== "" ? `genres=${genersValue}` : ""}&${
        platforValue !== "" ? `platforms=${platforValue}` : ""
      } `,
      countPages,
      setData,
      userId
    );
  }, [countPages, userId, reqGameData, genersValue, platforValue]);

  if (gameData !== null) {
    return (
      <div>
        <div className="d-flex option ">
          <select
            value={genersValue}
            className="form-select  text-white   bg-dark"
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
          <select
            value={platforValue}
            className="form-select  text-white  bg-dark"
            aria-label="Default select example"
            onChange={changePlatformHandler}
          >
            <option value="">Platform</option>
            <option value="4">PC</option>
            <option value="7">Nintendo Switch</option>
            <option value="187">PlayStation 5</option>
            <option value="18">PlayStation 4</option>
            <option value="16">PlayStation 3</option>
            <option value="186">Xbox Series S/X</option>
            <option value="1">Xbox One</option>
            <option value="14">Xbox 360</option>
          </select>
        </div>

        <h1 className="heading">Игры</h1>
        <PrevNext uppPagesCount={uppPagesCount} count={countPages}></PrevNext>
        <div className="game-wrapper">
          {gameData !== null &&
            gameData.map((game) => {
              return (
                <GameCard key={game.id} data={game} type={"add"}></GameCard>
              );
            })}
        </div>
        <div className="art-bg">
          <div className="art-wrapper">
            <div className="art bg-style-start bg-style-all"></div>
          </div>
        </div>
      </div>
    );
  } else {
    return <div className="lds-dual-ring"></div>;
  }
}
const mapDispath = {
  reqGameData: reqGameData,
};
const mapProps = (state) => {
  return {
    userId: state.authReduser.userId,
  };
};
const connector = connect(mapProps, mapDispath);
export default connector(StartPage);
