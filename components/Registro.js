import React, { useState } from "react";
import FormularioRegistro from "./FormularioRegistro";
import Login from "./Login";

const Registro = () => {
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
                <li title="Registro">
                  <label htmlFor="tab1" role="button">
                    Registro
                  </label>
                </li>
                <li title="Login">
                  <label htmlFor={"login"} role="button">
                    Login
                  </label>
                </li>
              </ul>
              <div className="slider">
                <div className="indicator"></div>
              </div>
              <div className="content">
                <section>
                  <FormularioRegistro handleValidarCheck={handleValidarCheck} />
                </section>
                <section>
                  <div className="pl-4 pr-4 pt-2 pb-5">
                    <div className="row justify-content-center">
                      <div className="col-12 pl-4 pr-4 pb-4">
                        <p className="text txt-c1 ff-1">
                          Laborum excepteur dolore ut sunt elit veniam esse
                          culpa ex. Laborum excepteur dolore ut sunt elit veniam
                          esse culpa ex. Laborum excepteur dolore ut sunt elit
                          veniam esse culpa ex.
                        </p>
                      </div>
                      <div className="col-lg-6">
                        <div className="pl-4 pr-4 pb-4">
                          <Login />
                        </div>
                      </div>
                    </div>
                  </div>
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
export default Registro;
