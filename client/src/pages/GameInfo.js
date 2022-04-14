import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AddOrDellImg from "../components/AddOrDellImg";
function GameInfo({ gameData, userId }) {
  const [message, setMess] = useState("");
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    setInterval(() => setFlag(true), 800);
  }, []);

  if (gameData === null || flag === false) {
    return <div className="lds-dual-ring"></div>;
  } else {
    const { data, screen, type } = gameData;
    return (
      <>
        <main>
          <div className="game-content-wrap d-flex  ">
            <div className="game-data-wrap">
              <div className="game-head">
                <span className="game-data">{data.released}</span>
                {data.platforms.map((el) => {
                  return (
                    <span key={el.platform.name} className="p-2">
                      {el.platform.name}
                    </span>
                  );
                })}
                <h1>{data.name}</h1>
              </div>
              <AddOrDellImg
                data={{ data, type, userId, setMess }}
              ></AddOrDellImg>
              <span className="m-3">{message}</span>
              <div className="game-about">
                <h2>About</h2>
                <div className="about-text">{data.description_raw}</div>
              </div>
              <div className="game-meta-data">
                <div className="meta-block">
                  <div className="game-meta-title">Geners</div>
                  <div className="game-meta-text">
                    {data.genres.map((el) => {
                      return <span key={el.name}>{el.name}</span>;
                    })}
                  </div>
                </div>
                <div className="meta-block">
                  <div className="game-meta-title">Metascore</div>
                  <span className="game-meta-text meta-score ">
                    {data.metacritic}
                  </span>
                </div>
                <div className="meta-block">
                  <div className="game-meta-title">Publishers</div>
                  <div className="game-meta-text">
                    {data.publishers.map((el) => {
                      return <span key={el.name}>{el.name}</span>;
                    })}
                  </div>
                </div>
                <div className="meta-block">
                  <div className="game-meta-title">Developer</div>
                  <div className="game-meta-text">
                    {data.developers.map((el) => {
                      return <span key={el.name}>{el.name}</span>;
                    })}
                  </div>
                </div>

                <div className="meta-block w-100">
                  <div className="game-meta-title">Tags</div>
                  <span className="game-meta-text  ">
                    {data.tags.map((el) => {
                      return <span key={el.name}>{el.name}</span>;
                    })}
                  </span>
                </div>
              </div>
            </div>
            <div className="left-info">
              <div className="game-screenshots">
                {screen.map((el, i) => {
                  if (i > 1) {
                    return (
                      <img
                        key={el.id}
                        className="screen-img"
                        alt="asd"
                        src={`${el.image}`}
                      ></img>
                    );
                  } else {
                    return null;
                  }
                })}
              </div>
              <div className="game-store">
                <div className="game-meta-title">Where to buy</div>
                <div className="game-meta-data">
                  {data.stores.map((el) => {
                    return (
                      <span key={el.store.name} className="stores">
                        {el.store.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div className="art-bg">
            <div className="art-wrapper">
              <div
                style={{
                  backgroundImage: ` linear-gradient(rgba(15, 15, 15, 0), rgb(21, 21, 21)), linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),url(${data.background_image})`,
                }}
                className="art bg-style-all"
              ></div>
            </div>
          </div>
        </main>
      </>
    );
  }
}

const mapProps = (state) => {
  return {
    gameData: state.gameReduser.gameData,
    userId: state.authReduser.userId,
  };
};
const connector = connect(mapProps, null);
export default connector(GameInfo);
