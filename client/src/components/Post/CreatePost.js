import React, { useState } from "react";
import { addPostMessage, addPostData } from "../../services/api";
import "./CreatePost.scss"

const CreatePost = (props) => {

    const [message, setMessage] = useState("");
    const [img, setImg] = useState("")


    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData;
        formData.append('picture', img, img.name);
        formData.append('message', message)
        
        

        try {

            if (img === "") {
                await addPostMessage({ message })
            } else {
                await addPostData(formData)
                for (let key of formData.entries()) {
                    console.log(key[1])
                }
            }

        }
        catch (err) {
            console.log(err)
        }

    }



    return (
        <div className="card addpost">
            <form method="post" onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    className="message-field"
                    type="text"
                    name="message"
                    id="message"
                    placeholder={`Quoi de neuf aujourd'hui ${props.user} ?`}
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <br />

                <label htmlFor="file">Ajouter une image</label>
                <input
                    className="addFile"
                    type="file"
                    id="file"
                    name="picture"
                    onChange={(e) => setImg(e.target.files[0])}
                    
                />

                <br />
                <input
                    type="submit"
                    value="Publier"
                    className="btn"

                />
            </form>


        </div>
    )



}

export default CreatePost