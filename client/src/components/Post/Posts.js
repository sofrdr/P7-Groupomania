import React, { useEffect, useState } from "react";
import Card from "./Card/Card"
import CreatePost from "./CreatePost/CreatePost";
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



    const user = props.user

    // Appel API pour récupérer les posts et mise à jour du state 
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
        setShowOptions(options)
    }

    function removeComment(idPost, idComment) {
        const newData = JSON.parse(JSON.stringify(allPosts));
        for (const post of newData) {
            if (post.id === idPost) {
                const newComments = [];
                for (let i = 0; i < post.comments.length; i++) {
                    if (post.comments[i].id === idComment) continue;
                    newComments.push(post.comments[i]);
                }
                post.comments = newComments
                setAllPosts(newData);
                return;
            }
        }
    }

    function createComment(idPost, newComment) {
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


    function createPost(newPost) {
        const newData = JSON.parse(JSON.stringify(allPosts));
        if(newData === null){
            newData = [];
            newData.push(newPost)
        }else{
            newData.unshift(newPost)
        }
            
       

        setAllPosts(newData);
    }

    function removePost(idPost) {
        const newData = JSON.parse(JSON.stringify(allPosts));
        for (let i = 0; i < newData.length; i++) {
            if (newData[i].id === idPost) {
                newData.splice(i, 1)
                setAllPosts(newData)
                return;
            }
        }


    }


    const posts = allPosts.map((post) => {
        //const allComments = JSON.parse(post.comments)
        const allComments = post.comments

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
                            user={user}
                            author={comment.author}
                            message={comment.message}
                            date={comment.date}
                            handleOptions={handleOptions}
                            options={showOptions}
                            removeComment={removeComment}
                            postId={post.id}

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
                    createComment={createComment}
                    removePost={removePost}

                />


            </div>
        )

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