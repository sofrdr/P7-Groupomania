import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

// Composants 
import Card from "../Card/Card"
import CreatePost from "../CreatePost/CreatePost";
import Comment from "../Comment/Comment";

// API
import { getPosts } from "../../services/api";



/**
 * @typedef {Object} showOptions
 * @property {('post' | 'comment')} [type] le type de menu contextuel à  afficher
 * @property {Number} [id] l'id du post ou du commentaire
 */


const Posts = (props) => {


    const [allPosts, setAllPosts] = useState([])
    const [showAllComments, setShowAllComments] = useState(false)
    const [showOptions, setShowOptions] = useState({})


    const {user, windowWidth} = props

    

    // Appel API pour récupérer les posts et mise à jour du state allPosts
    useEffect(() => {
        async function getAllPosts() {
            try {
                const data = await getPosts()
                for (const post of data) {
                    post.comments = JSON.parse(post.comments)
                }
                setAllPosts(data)
            } catch (err) {
                console.log(err)
            }

        }

        getAllPosts()
    }, [])



 

    /**
     * @params {showOptions} [options]
     */
    const handleOptions = (options) => {
        setShowOptions(options);
    }

    /**
     * [Supprimer un commentaire de la liste des commentaires]
     *
     * @param   {Number}  idPost     [id du post]
     * @param   {Number}  idComment  [id du commentaire]
     *
     */
    const removeComment = (idPost, idComment) => {
        const newData = JSON.parse(JSON.stringify(allPosts));
        for (const post of newData) {
            if (post.id === idPost) {
                
                for (let i = 0; i < post.comments.length; i++) {
                    if (post.comments[i].id === idComment){
                        post.comments.splice(i, 1)
                    } 
                }             
                setAllPosts(newData);
                return;
            }
        }
    }

    /**
     * Ajouter un commentaire
     *
     * @param   {Number}  idPost      [id du post]
     * @param   {Object}  newComment  [nouveau commentaire envoyé par l'API]
     *
     */
    const createComment = (idPost, newComment) => {
        const newData = JSON.parse(JSON.stringify(allPosts));
        for (const post of newData) {
            if (post.id === idPost) {
                if(post.comments === null){
                    post.comments = [];
                    post.comments.push(newComment)
                }else{
                    post.comments.unshift(newComment)
                }
                setAllPosts(newData);
                return;
            }
        }
    }


    /**
     * Ajouter un post
     *
     * @param   {Object}  newPost  [Nouveau post renvoyé par l'API]
     *
     */
    const createPost = (newPost) => {
        let newData = JSON.parse(JSON.stringify(allPosts));
        if(newData === null){
            newData = [];
            newData.push(newPost)
        }else{
            newData.unshift(newPost)
        }
        setAllPosts(newData);
    }


    /**
     * Supprimer un post
     *
     * @param   {Number}  idPost  [id du post]
     *
     */
    const removePost = (idPost) => {
        const newData = JSON.parse(JSON.stringify(allPosts));
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === idPost) {
                newData.splice(i, 1)
                setAllPosts(newData)
                return;
            }
        }


    }

    // Fonction qui change le state de showAllComments afin d'afficher tous les commentaires d'un post 
    const handleComments = () => {
        setShowAllComments((prevShowComments) => !prevShowComments)
    }



    const posts = allPosts.map((post) => {
        
        const allComments = post.comments

        // Fonction pour passer les commentaires de chaque post dans un composant <Comment/>
        function getAllComments() {
            if (allComments === null) {
                return ""
            } else {

                return allComments.map((comment) => {

                    if(comment === undefined){
                        return <Navigate to="/"/>
                    }else{
                       return (
                        <Comment
                            key={comment.id}
                            id={comment.id}
                            user={user}
                            author={comment.author}
                            message={comment.message}
                            date={comment.date}
                            handleOptions={handleOptions}
                            options={showOptions}
                            removeComment={removeComment}
                            postId={post.id}
                            windowWidth={windowWidth}

                        />
                    ) 
                    }
                    
                })
            }
        }

        const comments = getAllComments()
        
        // On récupère les 3 premiers commentaires de chaque post

        const firstComments = comments.slice(0, 3)
        if(post === undefined){
            return <Navigate to="/"/>
        }else{
            // On passe chaque post dans le composant <Card/>
        return (
            <div >
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
                    createComment={createComment}
                    removePost={removePost}
                    windowWidth={windowWidth}
                />


            </div>
        )
        }
        

    })

    return (
        <div>
            <CreatePost
                user={user.pseudo}
                createPost={createPost}
            />
            {posts}
        </div>
    )

}

export default Posts