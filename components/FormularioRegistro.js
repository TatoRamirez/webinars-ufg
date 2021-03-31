import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import Loading from "./Loading";

const REGISTRO_USUARIO = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
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

const ForumularioRegistro = ({ handleValidarCheck }) => {
  //Mutation de GraphQL
  const [newUser] = useMutation(REGISTRO_USUARIO);

  //Query de GraphQL
  const { loading, error, data } = useQuery(CARRERAS);

  //routing
  const router = useRouter();
  const {
    query: { modalidad },
  } = router;
  const mod = router.query.modalidad;

  const [showForm, setShow] = useState(false);

  //States
  const [message, handleMessage] = useState({ msg: "", type: "" });

  let clasesform = showForm
    ? "col-lg-6 form-group pb-2 animate__animated animate__fadeInDown wow"
    : "col-lg-6 form-group d-none ";
  useEffect(() => {
    if (!showForm) {
      formik.setFieldValue("Proceso", false);
    } else {
      formik.setFieldValue("Proceso", true);
    }
  }, [showForm]);

  const formik = useFormik({
    initialValues: {
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
      acceptTerms: false,
      Proceso: false,
    },
    validationSchema: Yup.object({
      nombres: Yup.string().required("* Los nombres son obligatorios"),
      apellidos: Yup.string().required("* Los apellidos son obligatorios"),
      fechaNacimiento: Yup.date().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.date().required("* La fecha es obligatoria"),
        otherwise: Yup.date().notRequired(),
      }),

      nacionalidad: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* La nacionalidad es obligatoria"),
        otherwise: Yup.string()
          .notRequired()
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
      }),
      institucion: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* La institucion es obligatoria"),
        otherwise: Yup.string().notRequired(),
      }),
      nivel: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* El nivel académico es obligatorio"),
        otherwise: Yup.string().notRequired(),
      }),
      numero: Yup.number()
        .typeError("* Solo se admiten números")
        .required("* El número es obligatorio"),
      email: Yup.string()
        .email("* El correo no es válido")
        .required("* El correo es obligatorio"),
      carrera: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* La carrera es obligatoria"),
        otherwise: Yup.string().notRequired(),
      }),
      password: Yup.string().when("Proceso", {
        is: (val) => {
          return val === true;
        },
        then: Yup.string().required("* La contraseña es obligatoria"),
        otherwise: Yup.string().notRequired(),
      }),
      acceptTerms: Yup.bool().oneOf(
        [true],
        "* Debes aceptar los términos y condiciones para continuar"
      ),
    }),
    onSubmit: async (values, { setErrors }) => {
      handleMessage({
        msg: `Comprobando...`,
        type: "success",
      });
      const {
        nombres,
        apellidos,
        fechaNacimiento,
        institucion,
        nivel,
        email,
        numero,
        nacionalidad,
        carrera,
        password,
        acceptTerms,
        Proceso,
      } = values;
      try {
        const { data } = await newUser({
          variables: {
            input: {
              name: nombres,
              lastname: apellidos,
              birthdate: fechaNacimiento,
              nationality: nacionalidad,
              institutionorigin: institucion,
              academiclevel: nivel,
              phone: numero,
              personalemail: email,
              universitycareerinterest: carrera,
              password: password,
              terms: acceptTerms,
              interested: Proceso,
            },
          },
        });
        handleMessage({
          msg: `Se creo correctamente el usuario: ${data.newUser.name} ${data.newUser.lastname}`,
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
          formik.values.acceptTerms = false;
          handleMessage(null);
          handleValidarCheck(true);
          setErrors({});
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
    },
  });

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
    <div className="pl-4 pr-4 pt-2 pb-5">
      {message && message.msg && mostrarMensaje()}
      <p className="text txt-c1 ff-1">
        Laborum excepteur dolore ut sunt elit veniam esse culpa ex. Laborum
        excepteur dolore ut sunt elit veniam esse culpa ex. Laborum excepteur
        dolore ut sunt elit veniam esse culpa ex.
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
        ¿Desea estudiar en la UFG?
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
          <div className="col-lg-6 form-group pb-2">
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
          <div className="col-lg-6 form-group pb-2">
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
            {formik.touched.apellidos && formik.errors.apellidos ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.apellidos}
              </div>
            ) : null}
          </div>
          <div className="col-lg-6 form-group pb-2">
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
          <div className="col-lg-6 form-group pb-2">
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
          <div className={clasesform}>
            <label htmlFor="Fecha de Nacimiento">Fecha de Nacimiento:</label>
            <input
              className="form-control borde"
              type="date"
              id="fechaNacimiento"
              autoComplete="true"
              value={formik.values.fechaNacimiento}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.fechaNacimiento && formik.errors.fechaNacimiento ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.fechaNacimiento}
              </div>
            ) : null}
          </div>
          <div className={clasesform}>
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
            {formik.touched.nacionalidad && formik.errors.nacionalidad ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.nacionalidad}
              </div>
            ) : null}
          </div>
          <div className={clasesform}>
            <label htmlFor="institucion">Institución Educativa:</label>
            <input
              className="form-control borde"
              type="text"
              placeholder="Institucion Educativa"
              id="institucion"
              value={formik.values.institucion}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.institucion && formik.errors.institucion ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.institucion}
              </div>
            ) : null}
          </div>
          <div className={clasesform}>
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
          <div className={clasesform}>
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
            {formik.touched.password && formik.errors.password ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.password}
              </div>
            ) : null}
          </div>
          <div className={clasesform}>
            <label htmlFor="Carrera">Carrera Universitaria de interés:</label>
            <select
              className="form-control borde"
              id="carrera"
              value={formik.values.carrera}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option>-- Selecciona --</option>
              {mod === "presencial" ? (
                data &&
                data.allCarreras[0] &&
                data.allCarreras[0].Sedes[0].TipoIngresos[0].Modalidades[0].Carreras.map(
                  (item) => <option key={item.IdCarrera}>{item.Nombre}</option>
                )
              ) : mod === "virtual" ? (
                data &&
                data.allCarreras[0] &&
                data.allCarreras[0].Sedes[0].TipoIngresos[0].Modalidades[1].Carreras.map(
                  (item) => <option key={item.IdCarrera}>{item.Nombre}</option>
                )
              ) : (
                <>
                  <optgroup label="Carreras Presenciales">
                    {data &&
                      data.allCarreras[0] &&
                      data.allCarreras[0].Sedes[0].TipoIngresos[0].Modalidades[0].Carreras.map(
                        (item) => (
                          <option key={item.IdCarrera}>{item.Nombre}</option>
                        )
                      )}
                  </optgroup>
                  <optgroup label="Carreras Virtuales">
                    {data &&
                      data.allCarreras[0] &&
                      data.allCarreras[0].Sedes[0].TipoIngresos[0].Modalidades[1].Carreras.map(
                        (item) => (
                          <option key={item.IdCarrera}>{item.Nombre}</option>
                        )
                      )}
                  </optgroup>
                </>
              )}
            </select>
            {formik.touched.carrera && formik.errors.carrera ? (
              <div className="label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.carrera}
              </div>
            ) : null}
          </div>
          <div className="col-12 mt-1 pt2 text-center">
            <label className="mb-0">
              <input
                type="checkbox"
                id="acceptTerms"
                className="mr-1"
                value={formik.values.acceptTerms}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.acceptTerms}
              />
              Acepto los{" "}
              <a href="#" className="text-info">
                términos y condiciones
              </a>
            </label>
            {formik.touched.acceptTerms && formik.errors.acceptTerms ? (
              <div className="col mb-2 label-error error-color animate__animated animate__bounceIn alertaformulario">
                {formik.errors.acceptTerms}
              </div>
            ) : null}

            <div className="row">
              <div className="col text-center mt-5 mb-4">
                <input
                  type="submit"
                  value="Registrarse ahora"
                  className="btn btn-warning btn-inline-block btn-xs button"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ForumularioRegistro;
