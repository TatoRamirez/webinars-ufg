import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import jwt from "jsonwebtoken";
import HeaderWebinar from "./HeaderWebinar";
import SideBar from "./SideBar";

const REGISTRAR_ORIENTACION = gql`
  mutation newOrientacionRegistry($input: OrientacionRegistryInput) {
    newOrientacionRegistry(input: $input)
  }
`;

const OrientacionVocacional = () => {
  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  const [newOrientacionRegistry] = useMutation(REGISTRAR_ORIENTACION);

  const registarOrientacion = async () => {
    let tokenUsuario = decoded.token;
    try {
      const {} = await newOrientacionRegistry({
        variables: {
          input: {
            token: tokenUsuario,
            codigo: "ORT-1-2021",
            title: "Orientación Vocacional",
            eventdate: "01/12/2021",
            description: "",
            information: "",
            name: decoded.name,
            lastname: decoded.lastname,
            personalemail: decoded.personalemail,
          },
        },
      });
      Swal.fire(`Registrado en Orientación Vocacional`, "", "success");
    } catch (error) {
      Swal.fire(`Ya estás registrado en Orientación Vocacional`, "", "error");
    }
  };

  return (
    <div>
      <title>UFG - Orientación Vocacional</title>
      <HeaderWebinar />
      <div className="container-fluid nav-webinar p-0" id="OV">
        <div className="row p-0 ">
          <SideBar />
          <div className="col-12 col-lg-10 nuevo-Webinar">
            <div className="tab-content rounded">
              <div className="tab-pane px-3 pb-4 pt-0 fade show active p-0 p-md-5">
                <div className="row justify-content-center g-4 bg-white pb-4 pl-0 pr-0 pl-md-4 pr-md-4">
                  <div className="btn col-md-3 mt-4 UW-Cards animate__animated animate__flipInX wow">
                    <div className="card text-center ">
                      <div className="card-body sombra-card p-0">
                        <div className="card-body">
                          <h5 className="card-title">Orientación Vocacional</h5>
                          <p className="card-text">
                            Inscríbete a Orientación Vocacional
                          </p>
                          <button
                            className="btn btn-primary boton-webinar webinar-color"
                            onClick={registarOrientacion}
                          >
                            Inscribir
                          </button>
                        </div>
                      </div>
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
export default OrientacionVocacional;
