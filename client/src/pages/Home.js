import { React, useState, useEffect } from "react";
import {Navigate } from "react-router-dom";

import { isExpired } from "react-jwt";
import Posts from "../components/Posts"
import Header from "../components/Header/Header";


import "./Home.scss"

export default function Home() {


// On récupère la largeur de la fenêtre 
   const [windowWidth, setWindowWidth] = useState(window.innerWidth)

   const detectWidth = () => {
    setWindowWidth(window.innerWidth)
   }

   useEffect(() => {
    window.addEventListener('resize', detectWidth);

    return () => {
        window.removeEventListener('resize', detectWidth)
    }
   }, [windowWidth])


  

    // On récupère les infos de l'utilisateur connecté et le token
    const currentUser = JSON.parse(localStorage.getItem("user"))
    const token = localStorage.getItem("token")

    if (isExpired(token)) {
        localStorage.clear();
        return <Navigate to="/" />
    }
    else {
        return (
            <div className="home-container">
                <Header
                    user={currentUser.pseudo}
                    windowWidth={windowWidth}
                />

                <Posts
                    user={currentUser}
                    windowWidth={windowWidth}                  
                />

            </div>
        )
    }



}





