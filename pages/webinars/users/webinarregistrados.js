import React, { Component, useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import { useRouter } from "next/router";
import Menu from '../../../components/Menu'
import Footer from '../../../components/Footer'
import UserWebinar from '../../../components/UserWebinars'

const webinarRegistrados = () => {
    //Almacenar token
    const token = localStorage.getItem("token");
    const decoded = jwt.decode(token);
    const ahorita = Math.round(new Date().getTime() / 1000.0);

    //routing
    const router = useRouter();

    //verificar si el token ha expirado o está destruído
    if (token) {
        if (decoded.exp < ahorita) {
            localStorage.removeItem("token");
            router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
            return null;
        }
    } else if (token == null) {
        router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
        return null;
    }
    
    return (
        <div>
            <Menu />
            <UserWebinar />
            <Footer />
        </div>
    );
}

export default webinarRegistrados;