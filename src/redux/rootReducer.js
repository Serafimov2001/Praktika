import { combineReducers } from "redux";
import authReduser from "./redusers/auth.reducer";
import gameReduser from "./redusers/game-data.reduser";
const rootReducer = combineReducers({
  authReduser,
  gameReduser,
});
export default rootReducer;
