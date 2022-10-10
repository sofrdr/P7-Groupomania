import React, { useEffect, useState } from "react";
import Card from "./Card/Card"
import { getPosts } from "../../services/api";
import Comment from "./Comment/Comment";


/**
 * @typedef {Object} showOptions
 * @property {('post' | 'comment')} [type] le type de menu contextuel à  afficher
 * @property {Number} [id] l'id du post ou du commentaire
 */


const Posts = (props) => {


    const [allPosts, setAllPosts] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)
    const [showOptions, setShowOptions] = useState({})


    // Appel API pour récupérer les posts et mise à jour du state 
    useEffect(() => {
        async function getAllPosts() {
            try {
                const data = await getPosts()

                setAllPosts(data)
            } catch (err) {
                console.log(err)
            }

        }

        getAllPosts()
    }, [])


    const user = props.user
    
    

    /**
     * @params {showOptions} [options]
     */
    const handleOptions = (options) => {
        setShowOptions(options)
    }


    const posts = allPosts.map((post) => {
        const allComments = JSON.parse(post.comments)

        // Fonction pour passer les commentaires de chaque post dans un composant <Comment/>
        function getAllComments() {
            if (allComments === null) {
                return ""
            } else {

                return allComments.map((comment) => {
                    return (
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            user = {user}
                            author={comment.author}
                            message={comment.message}
                            date={comment.date}
                            handleOptions={handleOptions}
                            options={showOptions}
                            
                        />
                    )
                })
            }
        }

        const comments = getAllComments()
        

        function handleComments() {
            setShowAllComments((prevShowComments) => !prevShowComments)


        }

        // On récupère les 3 premiers commentaires de chaque post

        const firstComments = comments.slice(0, 3)

        // On passe chaque post dans le composant <Card/>
        return (
            <div>
                <Card
                    key={post.id}
                    id={post.id}
                    user={user}
                    author={post.author}
                    date={post.date}
                    message={post.message}
                    picture={post.picture}
                    likes={post.likes}
                    usersLiked={post.usersLiked}
                    numberOfComments={allComments === null ? 0 : allComments.length}
                    comments={showAllComments ? comments : firstComments}
                    handleComments={handleComments}
                    showAllComments={showAllComments}
                    handleOptions={handleOptions}
                    options={showOptions}
                    
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