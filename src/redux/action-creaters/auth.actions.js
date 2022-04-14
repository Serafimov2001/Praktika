export const login = (token, userId, userName) => {
  return {
    type: "LOGIN",
    payload: {
      userId,
      token,
      userName,
    },
  };
};
export const logout = () => {
  return {
    type: "LOGOUT",
  };
};

