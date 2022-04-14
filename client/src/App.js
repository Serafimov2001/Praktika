import "./App.css";
import { userRoutes } from "./routes/routs";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";

import { connect } from "react-redux";
function App({ isAuthenticated }) {
  const routes = userRoutes(isAuthenticated);
  return (
    <BrowserRouter>
      {isAuthenticated && (
        <>
          <Navbar></Navbar>
        </>
      )}
      <div className="container">{routes}</div>
    </BrowserRouter>
  );
}
const mapProps = (state) => {
  return { isAuthenticated: state.authReduser.isAuthenticated };
};
const connector = connect(mapProps, null);
export default connector(App);
