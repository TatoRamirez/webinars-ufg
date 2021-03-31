import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import HeaderWebinar from "./HeaderWebinar";
import SideBar from "./SideBar";
import Loading from "./Loading";

const UPDATE_USUARIO = gql`
  mutation updateUser($id: ID!, $input: UserInput) {
    updateUser(id: $id, input: $input) {
      id
      name
      lastname
      birthdate
      personalemail
      phone
      institutionorigin
      nationality
      password
      createdate
      modifieddate
      active
    }
  }
`;

const REGISTRO_USUARIO = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      tokenparent
      name
      lastname
      birthdate
      nationality
      institutionorigin
      academiclevel
      phone
      personalemail
      universitycareerinterest
      password
      terms
    }
  }
`;

const CARRERAS = gql`
  query allCarreras {
    allCarreras {
      Sedes {
        IdSede
        NombreSede
        TipoIngresos {
          TipoIngreso
          Modalidades {
            Modalidad
            Carreras {
              IdCarrera
              Nombre
              Facultad
            }
          }
        }
      }
    }
  }
`;

const CompletarRegistro = () => {
  const [showForm, setShow] = useState(false);

  //States
  const [message, handleMessage] = useState({ msg: "", type: "" });

  //Mutation de GraphQL
  const [updateUser] = useMutation(UPDATE_USUARIO);
  const [newUser] = useMutation(REGISTRO_USUARIO);

  //Query de GraphQL
  const { loading, error, data } = useQuery(CARRERAS);

  //Decodificar Token
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //routing
  const router = useRouter();

  //Logout
  const logOut = () => {
    localStorage.removeItem("token");
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}registro`);
  };

  let clasesform = showForm
    ? "col-lg-6 form-group pb-2 animate__animated animate__fadeInUp wow"
    : "col-lg-6 form-group d-none";

  let clasesform2 = showForm
    ? "col-lg-6 form-group d-none"
    : "col-lg-6 form-group pb-2 animate__animated animate__fadeInUp wow";

  useEffect(() => {
    if (!showForm) {
      formik.setFieldValue("Proceso", false);
    } else {
      formik.setFieldValue("Proceso", true);
    }
  }, [showForm]);

  //validacion del formulario
  const today = Date();

  const formik = useFormik({
    initialValues: {
      tokenpadre: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      nacionalidad: "",
      institucion: "",
      nivel: "",
      numero: "",
      email: "",
      carrera: "",
      password: "",
      acceptTerms: true,
      Proceso: false,
    },
    validationSchema: Yup.object({
      nombres: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* El nombre es obligatorio"),
        otherwise: Yup.string().notRequired(),
      }),
      apellidos: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* El apellido es obligatorio"),
        otherwise: Yup.string().notRequired(),
      }),
      fechaNacimiento: Yup.date()
        .required("* La fecha es obligatoria")
        .max(today, "* La fecha es mayor al día actual"),

      nacionalidad: Yup.string()
        .required("* La nacionalidad es obligatoria")
        .oneOf(
          [
            "Guatemala",
            "Honduras",
            "El Salvador",
            "Nicaragua",
            "Costa Rica",
            "Panamá",
            "República Dominicana",
          ],
          "* La nacionalidad es inválida"
        ),
      institucion: Yup.string().required("* La institucion es obligatoria"),

      nivel: Yup.string().required("* El nivel académico es obligatorio"),

      numero: Yup.number().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.number().required("* El numero es obligatorio"),
        otherwise: Yup.number().notRequired(),
      }),

      email: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* El email es obligatorio"),
        otherwise: Yup.string().notRequired(),
      }),

      carrera: Yup.string()
        .required("* La carrera es obligatoria")
        .oneOf(["Ingenieria en Sistemas"], "* La carrera es inválida"),
    }),
    onSubmit: async (values) => {
      handleMessage({
        msg: `Comprobando...`,
        type: "success",
      });
      const {
        nombres,
        apellidos,
        fechaNacimiento,
        nacionalidad,
        institucion,
        nivel,
        numero,
        email,
        carrera,
        password,
        acceptTerms,
        Proceso,
      } = values;
      if (Proceso) {
        try {
          const { data } = await newUser({
            variables: {
              input: {
                tokenparent: decoded.token,
                name: nombres,
                lastname: apellidos,
                birthdate: fechaNacimiento,
                nationality: nacionalidad,
                institutionorigin: institucion,
                academiclevel: nivel,
                phone: numero,
                personalemail: email,
                universitycareerinterest: carrera,
                terms: acceptTerms,
              },
            },
          });
          handleMessage({
            msg: `Has registrado al usuario: ${data.newUser.name} ${data.newUser.lastname}`,
            type: "success",
          });
          setTimeout(() => {
            formik.values.nombres = "";
            formik.values.apellidos = "";
            formik.values.fechaNacimiento = "";
            formik.values.nacionalidad = "";
            formik.values.institucion = "";
            formik.values.nivel = "";
            formik.values.numero = "";
            formik.values.email = "";
            formik.values.carrera = "";
            formik.values.password = "";
            handleMessage(null);
          }, 2000);
        } catch (error) {
          handleMessage({
            msg: error.message,
            type: "error",
          });
          setTimeout(() => {
            handleMessage(null);
          }, 2000);
        }
      } else {
        try {
          const { data } = await updateUser({
            variables: {
              id: decoded.id,
              input: {
                birthdate: fechaNacimiento,
                nationality: nacionalidad,
                institutionorigin: institucion,
                academiclevel: nivel,
                universitycareerinterest: carrera,
                password: password,
                interested: true,
              },
            },
          });
          handleMessage({
            msg: `Has completado el registro`,
            type: "success",
          });
          setTimeout(() => {
            formik.values.nombres = "";
            formik.values.apellidos = "";
            formik.values.fechaNacimiento = "";
            formik.values.nacionalidad = "";
            formik.values.institucion = "";
            formik.values.nivel = "";
            formik.values.numero = "";
            formik.values.email = "";
            formik.values.carrera = "";
            formik.values.password = "";
            handleMessage(null);
            logOut();
          }, 2000);
        } catch (error) {
          handleMessage({
            msg: error.message,
            type: "error",
          });
          setTimeout(() => {
            handleMessage(null);
          }, 2000);
        }
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

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="noti-contenedor animate__animated animate__headShake mt-5">
        <div className={`noti-error noti-popup`}>
          <h2 className="noti-titulo">Error!</h2>
        </div>
      </div>
    );
  }

  return (
    <div>
      <title>UFG - Completar Registro</title>
      <HeaderWebinar />
      <div className="container-fluid nav-webinar p-0" id="CR">
        <div className="row p-0 ">
          <SideBar />
          <div className="col-12 col-lg-10 nuevo-Webinar">
            <div className="tab-content rounded">
              <div className="tab-pane px-3 pb-4 pt-0 fade show active p-0 p-md-5">
                <div className="row g-4 bg-white pb-4 pl-0 pr-0 pl-md-4 pr-md-4">
                  <div className="col-12 ">
                    <div className="pl-4 pr-4 pt-2 pb-5">
                      {message && message.msg && mostrarMensaje()}
                      <p className="text txt-c1 ff-1 text-center">
                        ¿Te está interesando estudiar en UFG? ¡Completa tu
                        registro!
                      </p>
                      <label>
                        <input
                          type="checkbox"
                          className="mr-1"
                          onClick={() => {
                            setShow(!showForm);
                          }}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        ¿Deseas inscribir a alguien más?
                      </label>
                      <form onSubmit={formik.handleSubmit}>
                        <input
                          type="hidden"
                          name="Proceso"
                          value={formik.values.Proceso}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        ></input>
                        <div className="row">
                          <div className={clasesform}>
                            <label htmlFor="quien">¿Quién lo registra?</label>
                            <input
                              className="form-control borde input"
                              type="text"
                              id="quien"
                              value={`${decoded.name} ${decoded.lastname}`}
                              readOnly
                              disabled
                            />
                          </div>
                          <div className={clasesform}>
                            <label htmlFor="nombres">Nombres:</label>
                            <input
                              className="form-control borde input"
                              type="text"
                              placeholder="Nombres"
                              id="nombres"
                              value={formik.values.nombres}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.nombres && formik.errors.nombres ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.nombres}
                              </div>
                            ) : null}
                          </div>
                          <div className={clasesform}>
                            <label htmlFor="apellidos">Apellidos:</label>
                            <input
                              className="form-control borde"
                              type="text"
                              placeholder="Apellidos"
                              id="apellidos"
                              value={formik.values.apellidos}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.apellidos &&
                            formik.errors.apellidos ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.apellidos}
                              </div>
                            ) : null}
                          </div>
                          <div className={clasesform}>
                            <label htmlFor="phone">Número de teléfono:</label>
                            <input
                              className="form-control borde"
                              type="text"
                              placeholder="Teléfono"
                              id="numero"
                              value={formik.values.numero}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.numero && formik.errors.numero ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.numero}
                              </div>
                            ) : null}
                          </div>
                          <div className={clasesform}>
                            <label htmlFor="email">Correo:</label>
                            <input
                              className="form-control borde"
                              type="email"
                              placeholder="Correo"
                              id="email"
                              value={formik.values.email}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.email && formik.errors.email ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.email}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 form-group pb-2">
                            <label htmlFor="Fecha de Nacimiento">
                              Fecha de Nacimiento:
                            </label>
                            <input
                              className="form-control borde"
                              type="date"
                              id="fechaNacimiento"
                              autoComplete="true"
                              value={formik.values.fechaNacimiento}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.fechaNacimiento &&
                            formik.errors.fechaNacimiento ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.fechaNacimiento}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 form-group pb-2">
                            <label htmlFor="nacionalidad">Nacionalidad:</label>
                            <select
                              className="form-control"
                              id="nacionalidad"
                              value={formik.values.nacionalidad}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option>-- Selecciona --</option>
                              <option>Guatemala</option>
                              <option>Honduras</option>
                              <option>El Salvador</option>
                              <option>Nicaragua</option>
                              <option>Costa Rica</option>
                              <option>Panamá</option>
                              <option>República Dominicana</option>
                            </select>
                            {formik.touched.nacionalidad &&
                            formik.errors.nacionalidad ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.nacionalidad}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 form-group pb-2">
                            <label htmlFor="institucion">
                              Institución Educativa:
                            </label>
                            <input
                              className="form-control borde"
                              type="text"
                              placeholder="Institucion Educativa"
                              id="institucion"
                              value={formik.values.institucion}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.institucion &&
                            formik.errors.institucion ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.institucion}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 form-group pb-2">
                            <label htmlFor="nivel">Nivel Académico</label>
                            <input
                              className="form-control borde"
                              type="text"
                              placeholder="Nivel Académico"
                              id="nivel"
                              value={formik.values.nivel}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.nivel && formik.errors.nivel ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.nivel}
                              </div>
                            ) : null}
                          </div>
                          <div className={clasesform2}>
                            <label htmlFor="password">Contraseña:</label>
                            <input
                              className="form-control borde"
                              type="password"
                              placeholder="Contraseña"
                              id="password"
                              value={formik.values.password}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            />
                            {formik.touched.password &&
                            formik.errors.password ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.password}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-lg-6 form-group pb-2">
                            <label htmlFor="Carrera">
                              Carrera Universitaria de interés:
                            </label>
                            <select
                              className="form-control borde"
                              id="carrera"
                              value={formik.values.carrera}
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                            >
                              <option>-- Selecciona --</option>
                              <optgroup label="Carreras Presenciales">
                                {data &&
                                  data.allCarreras[0] &&
                                  data.allCarreras[0].Sedes[0].TipoIngresos[0].Modalidades[0].Carreras.map(
                                    (item) => (
                                      <option key={item.IdCarrera}>
                                        {item.Nombre}
                                      </option>
                                    )
                                  )}
                              </optgroup>
                              <optgroup label="Carreras Virtuales">
                                {data &&
                                  data.allCarreras[0] &&
                                  data.allCarreras[0].Sedes[0].TipoIngresos[0].Modalidades[1].Carreras.map(
                                    (item) => (
                                      <option key={item.IdCarrera}>
                                        {item.Nombre}
                                      </option>
                                    )
                                  )}
                              </optgroup>
                            </select>
                            {formik.touched.carrera && formik.errors.carrera ? (
                              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                                {formik.errors.carrera}
                              </div>
                            ) : null}
                          </div>
                          <div className="col-12 mt-1 pt2 text-center">
                            <input
                              type="submit"
                              value="Completar Regístro"
                              className="btn btn-warning btn-inline-block btn-xs button"
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CompletarRegistro;
