import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Menu from "../../components/Menu";
import RegistroToken from "../../components/RegistroToken";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";

const token = () => {
  const [loading, handleLoading] = useState(true);

  //Almacenar token
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  const ahorita = Math.round(new Date().getTime() / 1000.0);

  //routing
  const router = useRouter();
  useEffect(() => {
    if (token) {
      if (decoded.exp > ahorita) {
        router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}users/webinar`);
        return <Loading />;
      } else {
        handleLoading(false);
      }
    }
  }, [token]);

  return (
    <>
      <div>
        <Menu />
        <RegistroToken />
        <Footer />
      </div>
    </>
  );
};

export default token;
