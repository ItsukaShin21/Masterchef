import React, { useState } from 'react';
import { AiFillLike } from "react-icons/ai";
import { MdDelete, MdEditSquare } from "react-icons/md";
import Badge from 'react-bootstrap/Badge';
import { CommentManager } from '../components/commentsManager';
import { showToastSuccess } from '../components/toasters';


function CommentItems({ username,commentId, commentText, onLike, onDelete, likeCounter, isOwner, onSuccess }) {
    const [editMode, setEditMode] = useState(false);
    const [editedText, setEditedText] = useState(commentText);
    const  { UpdateComment } = CommentManager();

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleChange = (event) => {
        setEditedText(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        UpdateComment(commentId,editedText).then(response => {
            onSuccess();
            showToastSuccess("Comment Successfully Updated");
        });
    }

    return (
        <div className="comment-item-container m-3 d-flex">
            
            <div className="comment-owner">
                <h5 className="fw-bold">{ username }</h5>

                <div className="comment-text">
                    {editMode? (
                    <input
                        type="text"
                        value={editedText}
                        onChange={handleChange}
                        onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                                handleSubmit(event);
                                setEditMode(false);
                            }
                    }}
                    />
                    ) : (
                    <p>{commentText}</p>
                    )}
                </div>

            </div>

            <div className="comment-options d-flex justify-content-evenly align-items-center">
                
                <div>
                    <AiFillLike className='icon' size={20} color="skyblue" onClick={()=>onLike()} />
                    <Badge bg="success">{ likeCounter }</Badge>
                </div>

                {isOwner && <MdDelete className='icon' size={20} color="red" onClick={()=>onDelete()}/>}
                {isOwner && <MdEditSquare className='icon' size={20} color="blue" onClick={toggleEditMode}/>}
            </div>

        </div>
    );
}

export default CommentItems;