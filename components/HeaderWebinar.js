import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import { NavDropdown } from "react-bootstrap";
import InternalBanner from "./InternalBanner";

const HeaderWebinar = () => {
  //routing
  const router = useRouter();

  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //Logout
  const logOut = () => {
    localStorage.removeItem("token");
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
  };

  return (
    <div>
      <InternalBanner height="70vh" img="/images/bg-webinar.jpg">
        <div className="text-banner-webinar">
          <div className="pl-lg-5 pl-0 ml-5 display-5 display-lg-1 ff-2 text-white">
            Webinar UFG
          </div>
          <div className="pl-lg-5 pl-0 ml-5 h4 text-white ff-1">
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy
          </div>
        </div>
      </InternalBanner>
      <div className="bg-3">
        <div className="d-flex flex-row-reverse">
          <NavDropdown
            title={`${decoded.name} ${decoded.lastname}`}
            id="basic-nav-dropdown"
            className="d-flex justify-content-end"
          >
            <NavDropdown.Item onClick={() => logOut()}>
              Cerrar Sesión
            </NavDropdown.Item>
          </NavDropdown>
          <img
            className="image--cover justify-content-end"
            src="/images/user.png"
          ></img>
        </div>
      </div>
    </div>
  );
};

export default HeaderWebinar;
