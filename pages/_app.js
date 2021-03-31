import { React, useEffect, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import clientDeft from "../config/apollo";

//Importar CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css/animate.css';
import 'rodal/lib/rodal.css';
import "../styles/Registro.css"
import '../styles/index.css';
import '../styles/globals.css';
import '../styles/Menu.css';
import '../styles/Header.css';
import '../styles/Home.css';
import '../styles/Information.css';
import '../styles/Footer.css';
import '../styles/Login.css';
import '../styles/register.css';
import '../styles/webinar.css';


function MyApp({ Component, pageProps }) {
  const [clt, handleclt] = useState(false);
  const [loading, handleLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleclt(true);
    } else {
      handleclt(false);
    }
    handleLoading(true);
  }, []);
  
  return (
    <>
      {loading && (
        <ApolloProvider client={clientDeft}>
          <Component {...clientDeft} />
        </ApolloProvider>
      )}
    </>
  );
}

export default MyApp
