import React from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { login } from "../redux/action-creaters/auth.actions";
function Log({ loginUser }) {
  const [form, setForm] = useState({ email: "", password: "", login: "" });
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };
  const [errorMassage, setError] = useState("");
  const loginHandler = async () => {
    const responce = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ password: form.password, login: form.login }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await responce.json();
    if (responce.status === 200) {
      loginUser(data.token, data.userId, data.login);
    } else {
      setError(data);
    }
  };
  return (
    <div>
      <div className="from-container">
        <form
          onSubmit={(e) => {
            loginHandler();
            e.preventDefault();
          }}
        >
          <h1>Вход</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Логин
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="login"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Пароль
            </label>
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={changeHandler}
            ></input>
          </div>

          <button
            type="submit"
            onClick={loginHandler}
            className="btn btn-outline-success"
          >
            Подтвердить
          </button>
        </form>
        <p className="for-msg">{errorMassage.massage}</p>
        <div>
          {errorMassage.hasOwnProperty("errors") === true
            ? errorMassage.errors.map((e) => {
                return (
                  <p key={e.msg} className="for-msg">
                    {e.msg}
                  </p>
                );
              })
            : ""}
        </div>
      </div>
    </div>
  );
}
const mapDispath = {
  loginUser: login,
};
const connector = connect(null, mapDispath);
export default connector(Log);
