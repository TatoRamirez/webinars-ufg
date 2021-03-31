import Swal from "sweetalert2";
import React, { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import jwt from "jsonwebtoken";
import Rodal from "rodal";
import HeaderWebinar from "./HeaderWebinar";
import SideBar from "./SideBar";
import Loading from "./Loading";

const VER_WEBINARS = gql`
  query allWebinars {
    allWebinars {
      id
      image
      codeWebinar
      title
      description
      information
      modifieddate
      eventdate
      url
      active
    }
  }
`;

const REGISTRAR_USUARIO_WEBINARS = gql`
  mutation Insertar($input: WebinarRegistryInput) {
    newWebinarRegistry(input: $input)
  }
`;

const VER_WEBINARS_USUARIO = gql`
  query verUnoUser {
    allUserWebinarsRegistry {
      id
      token
      name
      lastname
      personalemail
      Webinars {
        codeWebinar
        title
        description
        information
        eventdate
        url
      }
    }
  }
`;

const Webinar = () => {
  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  const { loading, error, data } = useQuery(VER_WEBINARS);

  //Query y Mutation de GraphQL
  const [newWebinarRegistry] = useMutation(REGISTRAR_USUARIO_WEBINARS, {
    update(cache, { data: { newWebinarRegistry } }) {
      let micache = cache.readQuery({ query: VER_WEBINARS_USUARIO });
      //Reescribir cache
      if (micache) {
        const { allUserWebinarsRegistry } = micache;
        cache.writeQuery({
          query: VER_WEBINARS_USUARIO,
          data: {
            allUserWebinarsRegistry: [
              ...allUserWebinarsRegistry,
              newWebinarRegistry,
            ],
          },
        });
      }
    },
  });

  //Llamando para abrir y cerrar modal
  const [showmodal, handleshowmodal] = useState(false);
  const [mostrardata, handlemostrardata] = useState();
  const show = (data) => {
    handlemostrardata(data);
    handleshowmodal(true);
  };
  const hide = () => {
    handleshowmodal(false);
    handlemostrardata("");
  };

  //Función para Registrar al Usuario en el Webinar
  const RegistrarWebinar = async (data) => {
    try {
      const {} = await newWebinarRegistry({
        variables: {
          input: {
            token: decoded.token,
            codeWebinar: data.codeWebinar,
            title: data.title,
            eventdate: data.eventdate,
            description: data.description,
            information: data.information,
            url: data.url,
            name: decoded.name,
            lastname: decoded.lastname,
            personalemail: decoded.personalemail,
          },
        },
      });
      Swal.fire(`Registrado en "${data.title}"`, "", "success");
      hide();
    } catch (error) {
      hide();
      Swal.fire(`Ya estás registrado en \n "${data.title}"`, "", "error");
    }
  };

  //Formato de Fecha
  const formatoFecha = (fecha) => {
    const nameday = Intl.DateTimeFormat("es-ES", {
      weekday: "long",
    }).format(fecha);
    const fechaconvert = Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(fecha);
    return `${nameday} | ${fechaconvert}`;
  };

  //Verificar si la actualización fue hoy
  const actufecha = (fecha) => {
    const hoy = formatoFecha(new Date());
    if (fecha === hoy) {
      return "Hoy";
    }
    return fecha;
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
      <title>UFG - Webinars</title>
      <Rodal visible={showmodal} onClose={hide}>
        <div className="rodalcontainer">
          <div className="row no-gutters  rodalcontainer">
            <div className="col-md-4 p-0">
              {mostrardata && mostrardata.image !== undefined ? (
                <img
                  className="imagenmodal"
                  src={`data:image/png;base64,${
                    mostrardata && mostrardata.image
                  }`}
                  alt="IMG"
                />
              ) : (
                ""
              )}
            </div>
            <div className="col-md-8 p-0 d-flex align-items-center">
              <div className="pl-5 ">
                <h3 className="card-title">
                  {mostrardata && mostrardata.title}
                </h3>
                <p className="card-text">
                  Fecha: {mostrardata && formatoFecha(mostrardata.eventdate)}
                </p>
                <p className="card-text">
                  Descripción: {mostrardata && mostrardata.description}
                </p>
                <p className="card-text">
                  Información: {mostrardata && mostrardata.information}
                </p>
                <br />
                <center>
                  <button
                    className="boton-modal"
                    onClick={() => RegistrarWebinar(mostrardata)}
                  >
                    Inscribirme al Webinar
                    <img src="/images/flecha.svg" className="pl-2" />
                  </button>
                </center>
              </div>
            </div>
          </div>
        </div>
      </Rodal>
      <HeaderWebinar />
      <div className="container-fluid nav-webinar p-0" id="W">
        <div className="row p-0 ">
          <SideBar />
          <div className="col-12 col-lg-10 nuevo-Webinar">
            <div className="tab-content rounded">
              <div className="tab-pane px-3 pb-4 pt-0 fade show active p-0 p-md-5">
                <div className="row row-cols-1 row-cols-md-3 g-4 bg-white pb-4 pl-0 pr-0 pl-md-4 pr-md-4">
                  {data &&
                    data.allWebinars &&
                    data.allWebinars.map((item) => (
                      <button
                        className="btn col-md-3 mt-4 UW-Cards animate__animated animate__flipInX wow"
                        key={item.id}
                        href="#"
                        onClick={() => show(item)}
                      >
                        <div className="card text-center ">
                          <div className="card-body sombra-card p-0">
                            <div
                              className="img-item-card"
                              style={{
                                background: `url(data:image/png;base64,${item.image})`,
                              }}
                            ></div>
                            <div className="card-body">
                              <h5 className="card-title">{item.title}</h5>
                              <p className="card-text">{item.description}</p>
                              <p className="card-text">
                                <small className="text-muted">
                                  {actufecha(formatoFecha(item.eventdate))}
                                </small>
                              </p>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Webinar;
