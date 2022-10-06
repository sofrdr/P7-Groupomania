import {React, useEffect, useState} from "react";
import Posts from "../components/Post/Posts"
import Header from "../components/Header/Header";
import CreatePost from "../components/Post/CreatePost/CreatePost";
import { getUserInfos } from "../services/api";
import "./Home.scss"



export default function Home(){

    const [user, setUser] = useState("")
    

 // On récupère les infos de l'utilisateur (email, id, pseudo)
 useEffect(() => {
    const data = getUserInfos();
    setUser(data)   
    
}, [])

localStorage.setItem("user", JSON.stringify(user))
const currentUser = localStorage.getItem("user")

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