import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_TOKEN = gql`
  mutation authUserToken($input: AuthUserTokenInput) {
    authUserToken(input: $input) {
      token
    }
  }
`;

const FormToken = () => {
  //routing
  const router = useRouter();

  //State
  const [message, handleMessage] = useState({ msg: "", type: "" });

  //Mutation Token
  const [authUserToken] = useMutation(AUTENTICAR_TOKEN);

  const formikToken = useFormik({
    initialValues: {
      TokenUsuario: "",
    },
    validationSchema: Yup.object({
      TokenUsuario: Yup.string().required("* El Token es obligatorio"),
    }),
    onSubmit: async (values) => {
      const { TokenUsuario } = values;
      try {
        const { data } = await authUserToken({
          variables: {
            input: {
              token: TokenUsuario,
            },
          },
        });

        handleMessage({
          msg: `Autenticado ...`,
          type: "success",
        });

        //Guardar token local
        const { token } = data.authUserToken;
        localStorage.setItem("token", token);

        //Redirigir
        setTimeout(() => {
          handleMessage(null);
          router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}users/webinar`);
        }, 1000);
      } catch (error) {
        handleMessage({
          msg: error.message,
          type: "error",
        });

        setTimeout(() => {
          handleMessage(null);
        }, 3000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="noti-contenedor animate__animated animate__headShake">
        <div className={`noti-${message.type} noti-popup`}>
          <p className="noti-titulo">{message.msg}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container-login">
      {message && message.msg && mostrarMensaje()}
      <form onSubmit={formikToken.handleSubmit}>
        <div className="row">
          <div className="col-12 form-group">
            <label htmlFor="TokenUsuario">Token:</label>
            <input
              className="form-control"
              type="text"
              placeholder="Ingrese su Token"
              id="TokenUsuario"
              value={formikToken.values.token}
              onChange={formikToken.handleChange}
              onBlur={formikToken.handleBlur}
              autoComplete="TokenUsuario"
            />
            {formikToken.touched.TokenUsuario && formikToken.errors.TokenUsuario ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formikToken.errors.TokenUsuario}
              </div>
            ) : null}
          </div>
          <div className="col-12 mt-4 pt-2 text-center">
            <input
              type="submit"
              value="Ingresar"
              className="btn btn-warning btn-inline-block btn-xs button"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormToken;
