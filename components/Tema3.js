const Tema3 = () => {
  return (
    <div className="container">
      <div className="spacer-50 mb-4 mt-5"></div>

      <div data-test="row" className="row">
        <div data-test="col" className="col">
          <div className="lih-1">
            <h1 className="title-recomendaciones fz-r text-center animate__animated animate__zoomInDown wow">
              Lorem ipsum dolor sit amet
            </h1>
            <p className="title-section font-weight-bold text-uppercase animated text-center animate__animated animate__zoomInDown animate__delay-1s wow">
              Lorem ipsum dolor
            </p>
          </div>
        </div>
      </div>

      <div className="spacer-50 mb-4"></div>

      <div data-test="col" className="col">
        <div className="p-5 p-md-3 text-center animate__animated animate__fadeInLeft wow">
          <p className="tam-info">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>

      <div className="spacer-50 mb-4">
        <div className="animate__animated animate__fadeInUp wow text-center">
          <img
            className="img-fluid img2"
            src="images/RegistroBannerInferior.png"
          />
        </div>
      </div>
    </div>
  );
};

export default Tema3;
