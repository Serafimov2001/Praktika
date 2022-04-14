const initialState = {
  gameName: null,
  gameData: null,
  count: 0,
  myListData: null,
};
const gameReduser = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_GAME_NAME":
      return {
        ...state,
        gameName: action.payload.gameName,
      };
    case "SAVE_GAME_DATA":
      return {
        ...state,

        gameData: {
          data: action.payload.data,
          screen: action.payload.screen,
          type: action.payload.type,
        },
      };
    case "SAVE_COUNT":
      return {
        ...state,
        count: action.payload.count,
      };
    case "GET_MY_LIST":
      return {
        ...state,
        myListData: action.payload.data,
      };

    default:
      return state;
  }
};
export default gameReduser;
