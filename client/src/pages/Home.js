import {React, useEffect, useState} from "react";
import Posts from "../components/Post/Posts"
import Header from "../components/Header/Header";
import CreatePost from "../components/Post/CreatePost/CreatePost";
import "./Home.scss"



export default function Home(){

   

const currentUser = JSON.parse(localStorage.getItem("user"))

console.log(currentUser)

    return(
        <div className="home-container">
            <Header
            user = {currentUser.pseudo}
            />
            <CreatePost
            user = {currentUser.pseudo}
            />
            <Posts
            user = {currentUser}
            />
            
            </div>
    )
}