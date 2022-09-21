import React, { useEffect, useState } from "react";
import Card from "./Card/Card"
import { getPosts, getUserInfos } from "../../services/api";
import Comment from "./Comment/Comment";


const Posts = () => {


    const [allPosts, setAllPosts] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)
    const [user, setUser] = useState("")

    // Appel API pour récupérer les posts et mise à jour du state 
    useEffect(() => {
        async function getAllPosts() {
            const data = await getPosts()
            
            setAllPosts(data)
        }

        getAllPosts()
    }, [])


    // On récupère les infos de l'utilisateur (email, id, pseudo)
    useEffect(() => {
        const data = getUserInfos();
        setUser(data)
        
    }, [])

    console.log(user)


    const posts = allPosts.map((post) => {
        const allComments = JSON.parse(post.comments)

        // Fonction pour passer les commentaires de chaque post dans un composant <Comment/>
        function getAllComments(){
            if (allComments === null) {
                return ""
            } else {
                
                return allComments.map((comment) => {
                    return (
                        <Comment
                            key={comment.id}
                            author={comment.author}
                            message={comment.message}
                            date={comment.date}
                        />
                    )
                })
            }
        }

        const comments = getAllComments()
        console.log(comments)

        function handleComments(){
            setShowAllComments((prevShowComments) => !prevShowComments )
            
            
        }

        // On récupère les 3 premiers commentaires de chaque post

        const firstComments = comments.slice(0,3)

        // On passe chaque post dans le composant <Card/>
        return (
            <div>
                <Card
                    key={post.id}
                    id = {post.id}
                    userPseudo = {user.pseudo}
                    author={post.author}
                    date={post.date}
                    message={post.message}
                    picture={post.picture}
                    likes={post.likes}
                    usersLiked={post.usersLiked}
                    numberOfComments={allComments === null ? 0 : allComments.length}
                    comments={showAllComments ? comments : firstComments
                    }
                    handleComments={handleComments}
                    showAllComments={showAllComments}
                />


            </div>
        )

    })

    return (
        <div>
            {posts}
        </div>
    )

}

export default Posts