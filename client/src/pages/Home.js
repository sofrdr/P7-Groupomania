import {React} from "react";
import { Navigate } from "react-router-dom";
import { isExpired} from "react-jwt";
import Posts from "../components/Post/Posts"
import Header from "../components/Header/Header";

import "./Home.scss"




export default function Home(){



const currentUser = JSON.parse(localStorage.getItem("user"))
const token = localStorage.getItem("token")



if(isExpired(token)){
    localStorage.clear();
   return  <Navigate to="/"/> 
}
else{
    return(
        <div className="home-container">
            <Header
            user = {currentUser.pseudo}
            />
            
            <Posts
            user = {currentUser}
           
            />
            
            </div>
    )
}



}

    
    
    

