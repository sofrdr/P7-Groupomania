import {React, useEffect, useState} from "react";
import Posts from "../components/Post/Posts"
import Header from "../components/Header/Header";
import CreatePost from "../components/Post/CreatePost";
import { getUserInfos } from "../services/api";
import "./Home.scss"

export default function Home(){

    const [user, setUser] = useState("")

 // On récupère les infos de l'utilisateur (email, id, pseudo)
 useEffect(() => {
    const data = getUserInfos();
    setUser(data)
    
}, [])



    return(
        <div className="home-container">
            <Header
            user = {user.pseudo}
            />
            <CreatePost
            user = {user.pseudo}
            />
            <Posts/>
            
            </div>
    )
}