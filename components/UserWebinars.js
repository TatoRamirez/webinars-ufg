import { useQuery, gql } from "@apollo/client";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import HeaderWebinar from "./HeaderWebinar";
import SideBar from "./SideBar";
import Loading from "./Loading";

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

const UserWebinars = () => {
  /* Decodificar Token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //routing
  const router = useRouter();
  
  //Query de GraphQL
  const { loading, error, data } = useQuery(VER_WEBINARS_USUARIO);

  //Formato de Fecha
  const formatoFecha = (fecha) => {
    const fechaconvert = Intl.DateTimeFormat("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(fecha);
    return fechaconvert;
  };

  if (loading) {
    return (
      <Loading/>
    );
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
      <title>UFG - Mis Webinars</title>
      <HeaderWebinar />
      <div className="container-fluid nav-webinar p-0" id="MW">
        <div className="row p-0 ">
          <SideBar />
          <div className="col-12 col-lg-10 nuevo-Webinar">
            <div className="tab-content rounded">
              <div className="tab-pane px-3 pb-4 pt-0 fade show active p-0 p-md-5">
                {data && data.allUserWebinarsRegistry.length === 0 ? (
                  <div className="row row-cols-1 row-cols-md-3 g-4 bg-white pb-4 pl-0 pr-0 pl-md-4 pt-4 pr-md-4">
                    <div className="col-12">
                      No estás registrado a ningún webinar
                    </div>
                  </div>
                ) : (
                  <div className="row row-cols-1 row-cols-md-3 g-4 bg-white pb-4 pl-0 pr-0 pl-md-4 pt-4 pr-md-4">
                    {data &&
                      data.allUserWebinarsRegistry[0] &&
                      data.allUserWebinarsRegistry[0].Webinars.map((item) => (
                        <div
                          className="col pt-2 animate__animated animate__flipInX wow"
                          key={item.codeWebinar}
                        >
                          <div className="card text-center ">
                            <div className="card-body sombra-card p-0">
                              <div className="card-body">
                                <h5 className="card-title">{item.title}</h5>
                                <p className="card-text">
                                  Fecha: {formatoFecha(data.eventdate)}
                                </p>
                                <p className="card-text">
                                  Descripción: {item.description}
                                </p>
                                <p className="card-text">
                                  Información: {item.information}
                                </p>
                                <a
                                  href={item.url}
                                  className="btn btn-primary boton-webinar webinar-color"
                                >
                                  Ir a Webinar
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserWebinars;
