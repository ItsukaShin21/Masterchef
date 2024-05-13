import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import CommentItems from '../templates/commentItemTemplate';
import DeleteModal from '../modals/deleteModal';
import Header from "../templates/headerTemplate";
import PostModal from "../modals/postModal";
import { RecipeManager } from '../components/recipesManager';
import { CommentManager } from '../components/commentsManager';
import { showToastSuccess } from "../components/toasters";
import RecipeEditForm from '../templates/recipeEditForm';
import RecipeItem from '../templates/recipeItemTemplate';
import Loader from '../templates/loaderTemplate';
import CommentForm from '../templates/commentForm';

function RecipeItemPage() {
    const baseURL = 'http://127.0.0.1:8000';
    const { recipeId } = useParams();
    const { UpdateRecipe } = RecipeManager();
    const [recipe, setRecipe] = useState({
        title: '',
        description: '',
        videourl: null,
        imageurl: null,
        bookurl: null,
        ingredients: [{ingredientName: '', quantity: ''}],
    });
    const [comments, setComments] = useState([]);
    const [likedRecipe, setLikedRecipe] = useState();
    const [likedComment, setLikedComment] = useState();
    const [editMode, setEditMode] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const userId = localStorage.getItem('id');
    const [commentText, setCommentText] = useState('');
    const [selectedComment, setSelectedComment] = useState(null);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const { FetchRecipeItem, LikeRecipe } = RecipeManager();
    const { FetchAllComments, LikeComment, AddComment, DeleteComment } = CommentManager();

    const fetchRecipeItem = useCallback(() => {
        FetchRecipeItem().then(response => {
            setRecipe(response);
            setImageUrl(`${baseURL}/storage/${response.imageurl}`);
            setVideoUrl(`${baseURL}/storage/${response.videourl}`);
        setLoader(false);
        });
    }, [FetchRecipeItem]);

    const fetchComments = useCallback(() => {
        FetchAllComments().then(comments => {
            setComments(comments);
        });
    }, [FetchAllComments]);

    useEffect(() => {
        setLoader(true);
        fetchComments();
        fetchRecipeItem();
    },[]);

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    const handleLike = () => {
        LikeRecipe(recipeId,userId);
        setLikedRecipe(!likedRecipe);
        fetchRecipeItem();
    };

    const handleCommentLike = (commentId) => {
        LikeComment(commentId,userId).then(() => {
            setLikedComment(!likedComment);
        });
        fetchComments();
    }

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleCommentSubmit = (event) => {
        event.preventDefault();

        AddComment(recipeId,userId,commentText).then(response => {
            if(response === 'success') {
                fetchComments();
                showToastSuccess("Your comment has been added");
                setCommentText('');
            }
        });
    }

    const handleAddRow = () => {
        setRecipe(prevState => ({
           ...prevState,
            ingredients: [...prevState.ingredients, { ingredientName: '', quantity: '' }],
        }));
    };

    const handleRemoveRow = (index) => {
        const ingredients = [...recipe.ingredients];
        ingredients.splice(index, 1);
        setRecipe(prevState => ({
           ...prevState,
            ingredients: ingredients,
        }));
    };

    const handleTextChange = (e) => {
        const { name, value } = e.target;
        setRecipe(prevState => ({
            ...prevState,
            [name]:value,
        }));
    };

    const handleIngredientChange = (index, field, value) => {
        setRecipe(prevState => {
            const newIngredients = [...prevState.ingredients];
            newIngredients[index][field] = value;
            return {...prevState, ingredients: newIngredients };
        });
    };

    const handleConfirmation = (commentId) => {
        setSelectedComment(commentId);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        DeleteComment(selectedComment).then(response => {
            if(response === "success") {
                fetchComments();
                showToastSuccess("Your comment has been deleted");
            }
        });
        setDeleteModalOpen(false);
    };

    const handleImageDrop = (file) => {
        setImageUrl(file);
    };

    const handleVideoDrop = (file) => {
        setVideoUrl(file);
    };

    const handleBookDrop = (event) => {
        setRecipe(prevState => ({
            ...prevState,
            bookurl: event.target.files[0],
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        
        formData.append('recipeId', recipeId);
        formData.append("title", recipe.title);
        formData.append("description", recipe.description);
        formData.append('imageurl', imageUrl);
        formData.append('videourl', videoUrl);
        formData.append('bookurl', recipe.bookurl);

        recipe.ingredients.forEach((ingredient, index) => {
            formData.append(`ingredients[${index}][ingredientName]`, ingredient.ingredientName);
            formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
        });

        UpdateRecipe(formData).then(response => {
            if(response === 'success') {
                showToastSuccess("The recipe has been updated");
                handleEdit(false);
            }
          });
    }

    return (
        <div className="recipe-item-page-body d-flex">
            <ToastContainer />

            <div>
                <Header modalOpen={toggleModal}/>
            </div>

            {deleteModalOpen && <DeleteModal onClose={() => setDeleteModalOpen(false)} onConfirm={handleDelete} item={ "comment" }/>}

            <div className="d-flex recipe-container">
                {editMode? (
                    <RecipeEditForm 
                        recipe={ recipe }
                        onEdit={ handleEdit }
                        onAddRow={ handleAddRow }
                        onRemoveRow={ handleRemoveRow }
                        onSubmit={ handleSubmit }
                        onTextChange={ handleTextChange }
                        onIngredientChange={ handleIngredientChange }
                        onDropImage={ handleImageDrop }
                        onDropVideo={ handleVideoDrop }
                        onBookDrop={ handleBookDrop } />
                ) : (
                    loader? (
                        <Loader text={ "Fetching Recipe Details..." }/>
                    ) : (
                        <RecipeItem 
                            recipe={ recipe }
                            onLike={ handleLike }
                            onEdit={ handleEdit } />
                    )
                )}
            </div>

            <div className="comments-container">
                
                <div className="comment-list">
                    {loader? (
                        <Loader text={ "Fetching All Comments" } />
                    ):(
                        comments.length > 0? (
                            comments
                                .sort((a, b) => b.likes_count - a.likes_count)
                                .map((comment) => (
                                    <CommentItems
                                        key={comment.commentID}
                                        username={comment.user.username}
                                        commentText={comment.commentText}
                                        likeCounter={comment.likes_count}
                                        commentId={comment.commentID}
                                        onLike={() => handleCommentLike(comment.commentID)}
                                        onDelete={() => handleConfirmation(comment.commentID)}
                                        onSuccess={() => fetchComments()}
                                        isOwner={parseInt(userId) === comment.userID}
                                    />
                                ))
                        ) : (
                            <p className="no-comment-items m-3 text-center fw-bold">Be the first to comment</p>
                            )
                    )}
                </div>

                <div className="comment-textbox-container d-flex align-items-center">
                    <CommentForm 
                        onSubmit={ handleCommentSubmit }
                        commentText={ commentText }
                        onChangeComment={ setCommentText }/>
                </div>

            </div>

            {modalOpen && 
                <PostModal 
                    onClose={ toggleModal } 
                    onSuccess={() => { toggleModal(); }} />
            }
            
        </div>
    );
}

export default RecipeItemPage;