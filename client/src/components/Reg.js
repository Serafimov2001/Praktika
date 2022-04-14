import React from "react";
import { useState } from "react";
function Reg() {
  const [form, setForm] = useState({ email: "", password: "", login: "" });
  const [errorMassage, setError] = useState("");
  const changeHandler = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const registerHandler = async () => {
    try {
      const responce = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify(form),
        headers: { "Content-Type": "application/json" },
      });
      const data = await responce.json();

      setError(data);
    } catch (e) {
      console.log("Error");
    }
  };
  return (
    <div>
      <div className="from-container">
        <form
          onSubmit={() => {
            registerHandler();
          }}
        >
          <h1>Регистрация</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              E-Mail
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              onChange={changeHandler}
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputText" className="form-label">
              Логин
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputText"
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
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              onChange={changeHandler}
            ></input>
          </div>

          <button
            type="submit"
            className="btn btn-outline-success"
            onClick={registerHandler}
          >
            Подтвердить
          </button>
        </form>
        <p className="for-msg">{errorMassage.massage}</p>
        <div>
          {errorMassage.hasOwnProperty("errors")
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

export default Reg;
