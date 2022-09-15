import React from "react";
import Posts from "../components/Post/Posts"
import Header from "../components/Header/Header";
import "./Home.scss"

export default function Home(){
    return(
        <div className="home-container">
            <Header/>
            <Posts/>
            
            </div>
    )
}