import Flippy, {
  Vertical,
  FrontSide,
  FrontSideDos,
  BackSide,
} from "../components/Flippy/Flippy";

const CardsHome = () => {
  return (
    <div className="container">
      <div className="spacer-50 mb-4 mt-5"></div>

      <div
        data-test="row"
        className="row wow fadeInRight justify-content-center animate__animated animate__fadeInRight"
      >
        <div data-test="col" className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
          <Flippy>
            <Vertical>
              <FrontSideDos>
                <img
                  src="/images/iconos/areas.png"
                  className="iconoCard"
                  alt="Áreas de especialidad"
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSideDos>
              <BackSide>
                Conoce las diferentes áreas de especialidad para tu formación
                profesional
              </BackSide>
            </Vertical>
          </Flippy>
        </div>

        <div data-test="col" className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
          <Flippy>
            <Vertical>
              <FrontSide>
                <img
                  src="/images/iconos/calidad.png"
                  className="iconoCard"
                  alt="Estandares de calidad"
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSide>
              <BackSide>
                A nivel mundial las acreditaciones te permiten una educación con
                estandares de calidad, en UFG contamos con 4 acreditaciones
              </BackSide>
            </Vertical>
          </Flippy>
        </div>

        <div data-test="col" className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
          <Flippy>
            <Vertical>
              <FrontSideDos>
                <img
                  src="/images/iconos/formacion.png"
                  className="iconoCard"
                  alt="Formación académica completa"
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSideDos>
              <BackSide>
                Accede a una formación académica completa, con arte, deporte,
                orientación laboral y asesoría para emprendedores
              </BackSide>
            </Vertical>
          </Flippy>
        </div>

        <div data-test="col" className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
          <Flippy>
            <Vertical>
              <FrontSide>
                <img
                  src="/images/iconos/herramientas.png"
                  className="iconoCard"
                  alt="Herramientas y plataformas tecnologicas"
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSide>
              <BackSide>
                El uso de herramientas y plataformas tecnologicas como Office
                365, Bibliotecas virtuales y más, te permitirán un desarrollo
                integral en tu formación profesional.
              </BackSide>
            </Vertical>
          </Flippy>
        </div>
      </div>
    </div>
  );
};

export default CardsHome;
