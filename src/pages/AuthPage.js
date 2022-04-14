import React, { useState } from "react";
import Log from "../components/Log";
import Reg from "../components/Reg";
function AuthPage() {
  const [flag, setFlag] = useState(false);
  return (
    <div>
      <button
        className="btn in-out-btn btn-outline-success "
        onClick={() => {
          setFlag(!flag);
        }}
      >
        {flag === false ? "Вход" : "Регистрация"}
      </button>
      {flag === false ? <Reg></Reg> : <Log></Log>}
    </div>
  );
}

export default AuthPage;
