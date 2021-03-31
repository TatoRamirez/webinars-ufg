const HeaderHome = () => {
  return (
    <div className="container-fluid">
      <div
        data-test="row"
        className="row banner"
        style={{ background: "url(/images/fondoBannerAzul.png)" }}
      >
        <div className="col-12 col-md-7 d-flex align-items-center justify-content-center flex-column">
          <img
            src="/images/innovacion.png"
            alt="Tus metas no tienen Límites"
            className="text-banner-blue mt-5 mt-md-0"
          />
          <a
            className="btn-orange font-weight-bold mb-5 mb-md-0"
            href={`${process.env.NEXT_PUBLIC_PATH_DIR}registro?modalidad=virtual`}
          >
            QUIERO SABER MÁS
          </a>
        </div>
        <div className="col-12 col-md-5 d-flex align-items-center justify-content-start">
          <img
            src="/images/chicaestudianteUFG.png"
            className="student"
            alt="Estudiante UFG"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
