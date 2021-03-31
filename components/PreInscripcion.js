import HeaderWebinar from "./HeaderWebinar";
import SideBar from "./SideBar";

const PreInscripcion = () => {
  return (
    <div>
      <title>UFG - PreInscripcion</title>
      <HeaderWebinar />
      <div className="container-fluid nav-webinar p-0" id="PI">
        <div className="row p-0 ">
          <SideBar />
          <div className="col-12 col-lg-10 nuevo-Webinar">
            <div className="tab-content rounded">
              <div className="tab-pane px-3 pb-4 pt-0 fade show active p-0 p-md-5">
                <div className="row g-4 bg-white pb-4 pl-0 pr-0 pl-md-4 pr-md-4">
                  <div className="col-12 text-center">
                    <p className="mt-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      In fermentum nibh eu tortor tincidunt, vitae fringilla
                      turpis molestie. Sed dapibus hendrerit faucibus. Etiam
                      euismod ex in enim convallis pellentesque.
                    </p>
                    <a className="btn-orange font-weight-bold mb-5 mb-md-0 botoninterno" href="https://admisiones.ufg.edu.sv/solicitud/" target="_blank">Solicitud de Admisión</a>
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
export default PreInscripcion;
