const initializationState = () => {
  let initialState = {};
  const data = JSON.parse(localStorage.getItem("userData"));
  if (data && data.token) {
    initialState = {
      token: data.token,
      userId: data.userId,
      userName: data.login,
      isAuthenticated: true,
    };
  }
  return initialState;
};
const authReduser = (state = initializationState(), action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: action.payload.userId,
          token: action.payload.token,
          login: action.payload.userName,
        })
      );
      return {
        ...state,
        token: action.payload.token,
        userId: action.payload.userId,
        userName: action.payload.userName,
        isAuthenticated: true,
      };
    case "LOGOUT":
      localStorage.removeItem("userData");
      return {
        ...state,
        token: null,
        userId: null,
        userName: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};
export default authReduser;
