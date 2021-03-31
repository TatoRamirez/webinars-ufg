const Menu = () => {
  return (
    <div className="container-fluid">
      <div data-test="row" className="row mt-3 mb-3 justify-content-between">
        <div
          data-test="col"
          className="col col-12 col-md-4 col-lg-2 d-flex align-items-center justify-content-center"
        >
          <div className="wrap-logo animate__animated animate__bounceInDown wow">
            <a href={process.env.NEXT_PUBLIC_PATH_DIR}>
              <img
                src="/images/Logo-UFG.png"
                alt="Logo UFG"
                className="img-fluid"
              />
            </a>
          </div>
        </div>

        <div
          data-test="col"
          className="col col-md-4 col-lg-4 col-xl-3 d-flex align-items-center justify-content-around animate__animated animate__fadeInRight wow"
        >
          <div className="social-icons">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/nuevo_ingresoufg"
              className=""
            >
              <img src="/images/Instagram.png" className="" alt="Instagram" />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.youtube.com/user/redsocialufg"
              className=""
            >
              <img src="/images/Youtube.png" className="" alt="Youtube" />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://es-la.facebook.com/ufgoficial"
              className=""
            >
              <img src="/images/Facebook.png" className="" alt="Facebook" />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/UFGoficial"
              className="letterLink"
            >
              <img src="/images/Twitter.png" className="" alt="Twitter" />
            </a>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.ufg.edu.sv/"
              className=""
            >
              <img src="/images/Website.png" className="" alt="Website" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
