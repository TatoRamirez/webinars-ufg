import React, { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import FormToken from "./FormToken";

const RegistroToken = () => {
  const [validarCheck, handleValidarCheck] = useState();
  return (
    <div className="bg-gray">
      <div className="container-fluid">
        <div className="row wrap-form justify-content-end">
          <img src="/images/orange-circle.png" className="orange-circle" />
          <div className="bar-blue">
            <img src="/images/bg-form.png" className="bg-form" />
          </div>
          <div className="col-12 col-lg-8 mt-5 bg-white min-hform">
            <div className="tabs mt-3">
              <input type="radio" id="tab1" name="tab-control" defaultChecked />
              <input
                type="radio"
                id="login"
                name="tab-control"
                checked={validarCheck}
              />
              <ul>
                <li title="Login">
                  <label htmlFor="tab1" role="button">
                    Login
                  </label>
                </li>
                <li title="Registro">
                  <label htmlFor={"login"} role="button">
                    Registro
                  </label>
                </li>
              </ul>
              <div className="slider">
                <div className="indicator"></div>
              </div>
              <div className="content">
                <section>
                  <div className="row justify-content-center">
                    <div className="col-lg-6">
                      <p className="text txt-c1 ff-1 text-center">
                        Si ya posees tu número de Token, puedes ingresar aquí
                      </p>
                      <FormToken />
                    </div>
                  </div>
                </section>
                <section>
                  <FormularioRegistro handleValidarCheck={handleValidarCheck} />
                </section>
              </div>
            </div>
          </div>
        </div>
        <div className="spacer-50 mt-5 mb-5"></div>
      </div>
    </div>
  );
};
export default RegistroToken;
