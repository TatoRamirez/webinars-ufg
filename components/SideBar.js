import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import jwt from "jsonwebtoken";

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

const SideBar = () => {
  //Decodificar Token
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //routing
  const router = useRouter();

  //Query de GraphQL
  const { data } = useQuery(VER_WEBINARS_USUARIO);

  return (
    <div className="col-12 col-lg-2 align-items-start">
      <div
        className="list-group webinar-left rounded pl-4 pr-4 pt-4 sombra"
        id="list-tab"
        role="tablist"
      >
        <button
          className={`list-group-item list-group-item-action menu-pestaña ${
            router.pathname === "/webinars/users/webinar"
              ? "active text-center animate__animated animate__fadeInRight wow"
              : ""
          }`}
          onClick={() =>
            router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}users/webinar#W`)
          }
        >
          Webinars
        </button>

        {data && data.allUserWebinarsRegistry.length === 0 ? null : (
          <button
            className={`list-group-item list-group-item-action menu-pestaña ${
              router.pathname === "/webinars/users/webinarregistrados"
                ? "active text-center animate__animated animate__fadeInRight wow"
                : ""
            }`}
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_PATH_DIR}users/webinarregistrados#MW`
              )
            }
          >
            Mis Webinars
          </button>
        )}

        <button
          className={`list-group-item list-group-item-action menu-pestaña ${
            router.pathname === "/webinars/users/orientacionvocacional"
              ? "active text-center animate__animated animate__fadeInRight wow"
              : ""
          }`}
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_PATH_DIR}users/orientacionvocacional#OV`
            )
          }
        >
          Orientación Vocacional
        </button>
        <button
          className={`list-group-item list-group-item-action menu-pestaña ${
            router.pathname === "/webinars/users/asesoriadecarrera"
              ? "active text-center animate__animated animate__fadeInRight wow"
              : ""
          }`}
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_PATH_DIR}users/asesoriadecarrera#ADC`
            )
          }
        >
          Asesoría de Carrera
        </button>
        <button
          className={`list-group-item list-group-item-action menu-pestaña ${
            router.pathname === "/webinars/users/preincripcion"
              ? "active text-center animate__animated animate__fadeInRight wow"
              : ""
          }`}
          onClick={() =>
            router.push(
              `${process.env.NEXT_PUBLIC_PATH_DIR}users/preincripcion#PI`
            )
          }
        >
          PreInscripción
        </button>
        {decoded.interested === true ? null : (
          <button
            className={`list-group-item list-group-item-action menu-pestaña ${
              router.pathname === "/webinars/users/completarregistro"
                ? "active text-center animate__animated animate__fadeInRight wow"
                : ""
            }`}
            onClick={() =>
              router.push(
                `${process.env.NEXT_PUBLIC_PATH_DIR}users/completarregistro#CR`
              )
            }
          >
            Completar Registro
          </button>
        )}
      </div>
    </div>
  );
};

export default SideBar;
