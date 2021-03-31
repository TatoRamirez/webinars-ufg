const Header = () => {
  return (
    <div className="container-fluid">
      <div data-test="row" className="row banner">
        <div className="col-12 col-md-7 d-flex align-items-center justify-content-center order-2 order-md-1">
          <img
            src="/images/estudianteUFG.png"
            className="student"
            alt="Estudiante UFG"
          />
        </div>
        <div className="col-12 col-md-5 d-flex align-items-center justify-content-center flex-column order-1 order-md-2">
          <img
            src="/images/tusmetas.png"
            alt="Tus metas no tienen Límites"
            className="text-banner mt-5 mt-md-0"
          />
          <a
            className="btn-skies font-weight-bold mb-5 mb-md-0"
            href={`${process.env.NEXT_PUBLIC_PATH_DIR}registro?modalidad=presencial`}
          >
            QUIERO SABER MÁS
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
