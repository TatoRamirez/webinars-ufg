const Footer = () => {
  return (
    <footer className="footer mt-5">
      <div className="container">
        <div
          data-test="col"
          className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 lineaOrange"
        ></div>

        <br />
        <h2 className="futuraBold text-center">CONTACT CENTER UFG</h2>
        <br />

        <div data-test="row" className="row text-center">
          <div
            data-test="col"
            className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 lineaBorde itemFooter text-center"
          >
            <img src="/images/FMail.png" className="iconoFooter" alt="Email" />
            contactcenter@ufg.edu.sv
          </div>

          <div
            data-test="col"
            className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 lineaBorde itemFooter text-center"
          >
            <img
              src="/images/FInsta.png"
              className="iconoFooter"
              alt="Instagram"
            />
            ufg.oficial
          </div>

          <div
            data-test="col"
            className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 lineaBorde itemFooter text-center"
          >
            <img
              src="/images/FTel.png"
              className="iconoFooter"
              alt="Teléfono"
            />
            2209-2834
          </div>

          <div
            data-test="col"
            className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 itemFooter text-center"
          >
            <img
              src="/images/FWhat.png"
              className="iconoFooter"
              alt="Whatsapp"
            />
            7554-1471
          </div>
        </div>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
