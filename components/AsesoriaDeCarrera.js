import Swal from "sweetalert2";
import { useMutation, gql } from "@apollo/client";
import jwt from "jsonwebtoken";
import HeaderWebinar from "./HeaderWebinar";
import SideBar from "./SideBar";

const REGISTRAR_ASESORIAS = gql`
  mutation newAsesoriaRegistry($input: AsesoriaRegistryInput) {
    newAsesoriaRegistry(input: $input)
  }
`;

const AsesoriaDeCarrera = () => {
  const [newAsesoriaRegistry] = useMutation(REGISTRAR_ASESORIAS);

  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  const registrarAsesoria = async () => {
    let token = decoded.token;
    try {
      const {} = await newAsesoriaRegistry({
        variables: {
          input: {
            token: token,
            codigo: "ASEC-1-2021",
            title: "Asesoría de Carrera",
            eventdate: "02/12/2021",
            description: "",
            information: "",
            name: decoded.name,
            lastname: decoded.lastname,
            personalemail: decoded.personalemail,
          },
        },
      });
      Swal.fire(`Registrado en Asesoría de Carrera`, "", "success");
    } catch (error) {
      Swal.fire(`Ya estás registrado en Asesoría de Carrera `, "", "error");
    }
  };

  return (
    <div>
      <title>UFG - Asesoría de Carrera</title>
      <HeaderWebinar />
      <div className="container-fluid nav-webinar p-0" id="ADC">
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
                          <h5 className="card-title">Asesoría de Carrera</h5>
                          <p className="card-text">
                            Inscríbete a Asesoría de Carrera
                          </p>
                          <button
                            className="btn btn-primary boton-webinar webinar-color"
                            onClick={registrarAsesoria}
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
export default AsesoriaDeCarrera;
