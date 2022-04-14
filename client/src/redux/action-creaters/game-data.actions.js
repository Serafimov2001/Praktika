export const addToStoreGameName = (gameName) => {
  return {
    type: "ADD_GAME_NAME",
    payload: {
      gameName,
    },
  };
};
export const saveGameData = (data, screen, type, name) => {
  return {
    type: "SAVE_GAME_DATA",
    payload: {
      data,
      screen,
      type,
    },
  };
};
export const saveGameCount = (count) => {
  return {
    type: "SAVE_COUNT",
    payload: {
      count,
    },
  };
};
export const getMyListAction = (data) => {
  return {
    type: "GET_MY_LIST",
    payload: {
      data,
    },
  };
};
export const addGameToList = (data, type, userId, setFunc) => {
  return async (dispatch) => {
    const res = await fetch(`/api/app/add`, {
      method: "POST",
      body: JSON.stringify({
        data,
        type,
        userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    setFunc(resData.message);
    dispatch(saveGameCount(resData.count));
  };
};

export const reqGameData = (search, count, setFunc, userId) => {
  return async (dispatch) => {
    const res = await fetch(`/api/app/main`, {
      method: "POST",
      body: JSON.stringify({ params: search, count: count, userId }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();
    setFunc(resData.data);
    dispatch(saveGameCount(resData.count));
  };
};
export const getMyList = (userId, geners) => {
  return async (dispatch) => {
    const res = await fetch(`/api/app/get-list`, {
      method: "POST",
      body: JSON.stringify({ userId, geners }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();

    dispatch(getMyListAction(resData));
  };
};
export const seveDataFunc = (name, id, screen, type) => {
  return async (dispatch) => {
    const res = await fetch(`/api/app/game/${name}`, {
      method: "POST",
      body: JSON.stringify({ id }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const resData = await res.json();

    dispatch(saveGameData(resData, screen, type));
  };
};
