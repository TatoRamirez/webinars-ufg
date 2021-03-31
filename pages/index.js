import React, { Component, useEffect, useState } from 'react';
import { useRouter } from "next/router";

const index = () => {
    //routing
    const router = useRouter();

    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);

    return (
        <div></div>
    )
}

export default index;
