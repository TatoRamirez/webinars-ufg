import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
  mutation authUser($input: AuthUserInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  //routing
  const router = useRouter();

  //State
  const [message, handleMessage] = useState({ msg: "", type: "" });

  //Mutation
  const [authUser] = useMutation(AUTENTICAR_USUARIO);

  const formik = useFormik({
    initialValues: {
      mail: "",
      pass: "",
    },
    validationSchema: Yup.object({
      mail: Yup.string()
        .email("* El correo no es válido")
        .required("* El correo es obligatorio"),
      pass: Yup.string().required("* La contraseña es obligatoria"),
    }),
    onSubmit: async (values) => {
      handleMessage({
        msg: `...`,
        type: "info",
      });
      const { mail, pass } = values;

      try {
        const { data, error } = await authUser({
          variables: {
            input: {
              personalemail: mail,
              password: pass,
            },
          },
        });

        handleMessage({
          msg: `Autenticado ...`,
          type: "success",
        });

        //Guardar token local
        const { token } = data.authUser;
        localStorage.setItem("token", token);

        setTimeout(() => {
          handleMessage(null);
          router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}users/webinar`);
        }, 1000);

        //Redirigir
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
    <div>
      {message && message.msg && mostrarMensaje()}
      <div className="container-login">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-12 form-group pb-2">
              <label htmlFor="mail">Correo:</label>
              <input
                className="form-control"
                type="email"
                placeholder="Correo"
                id="mail"
                value={formik.values.mail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="mail"
              />
              {formik.touched.mail && formik.errors.mail ? (
                <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                  {formik.errors.mail}
                </div>
              ) : null}
            </div>
            <div className="col-12 form-group">
              <label htmlFor="pass">Contraseña:</label>
              <input
                className="form-control"
                type="password"
                id="pass"
                placeholder="Contraseña"
                value={formik.values.pass}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="current-password"
              />
              {formik.touched.pass && formik.errors.pass ? (
                <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                  {formik.errors.pass}
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
    </div>
  );
};

export default Login;
