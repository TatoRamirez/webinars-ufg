import Flippy, {
  Vertical,
  FrontSide,
  FrontSideDos,
  BackSide,
} from "../components/Flippy/Flippy";

const Cards = () => {
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
                  src="/images/iconos/marketing.png"
                  className="iconoCard"
                  alt="La industria del Marketing"
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSideDos>
              <BackSide>
                Más de 800 millones de dólares ha generado la industria del
                Marketing Digital, Diseño Web y Comercio Electrónico en el
                2020.Conoce como ser parte de ella
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
                  alt="Herramientas y plataformas tecnologicas "
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

        <div data-test="col" className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
          <Flippy>
            <Vertical>
              <FrontSideDos>
                <img
                  src="/images/iconos/emprender.png"
                  className="iconoCard"
                  alt="Estudia para emprender"
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSideDos>
              <BackSide>
                El mundo laboral ha cambiado. Ahora es digital, estudia para
                aprender y además emprender en lo que te apasiona.
              </BackSide>
            </Vertical>
          </Flippy>
        </div>

        <div data-test="col" className="col-12 col-md-6 col-lg-3 mb-4 mt-4">
          <Flippy>
            <Vertical>
              <FrontSide>
                <img
                  src="/images/iconos/pais.png"
                  className="iconoCard"
                  alt="Estudia desde tu país "
                />
                <p className="mt-3">Lorem ipsum</p>
              </FrontSide>
              <BackSide>
                Las fronteras ya no existen, no hay límites para que logres lo
                que te propones.Estudia desde tu país con nosotros y alcanza tus
                metas
              </BackSide>
            </Vertical>
          </Flippy>
        </div>
      </div>
    </div>
  );
};

export default Cards;
