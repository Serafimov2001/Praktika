import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
function Aside({ userName, count }) {
  return (
    <div className="fixed-aside">
      <aside className="sidebar">
        <nav className="aside-flex">
          <li className="user-name">{userName}</li>
          <li className="li-m">
            <NavLink className="user-name " to="/list">
              Список
            </NavLink>
            <span className="count">{count}</span>
          </li>
        </nav>
      </aside>
    </div>
  );
}
const mapProps = (state) => {
  return {
    userName: state.authReduser.userName,
    count: state.gameReduser.count,
  };
};
const connector = connect(mapProps, null);
export default connector(Aside);
