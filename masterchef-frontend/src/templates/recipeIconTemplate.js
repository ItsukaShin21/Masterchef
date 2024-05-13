import React from "react";
import { FaHeart } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Badge from 'react-bootstrap/Badge';

function RecipeIcons({ title, imageUrl, onLike, onView, onDelete, likeCounter, showDelete }) {
    const baseURL = 'http://127.0.0.1:8000';

    return (
        <div className="col-md-3 mb-4">

            <div className="recipe-item-container">
                    <img src={ `${ baseURL }/storage/${ imageUrl }` } alt="" className="recipe-image"></img>

                <div className="overlay">

                    <div className="heart-container">
                        <Badge className="counter" bg="success">{ likeCounter }</Badge>
                        <FaHeart className="heart-icon" color="red" onClick={()=>onLike()}/>                    
                    </div>


                    {showDelete && <MdDelete className="delete-button" color="red" onClick={()=>onDelete()}/>}

                    <p className="fw-bold recipe-item-title" onClick={()=>onView()}>{ title }</p>
                </div>

            </div>

        </div>

    )
};

export default RecipeIcons;