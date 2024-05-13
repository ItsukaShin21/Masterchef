import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { FaPlus } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import ImageDropZone from '../dropzones/imageDropzone';
import VideoDropZone from '../dropzones/videoDropzone';
import { RecipeManager } from '../components/recipesManager';
import { showToastSuccess, showToastFail } from '../components/toasters';

function PostModal({ onClose, onSuccess }) {
    const [show, setShow] = useState(true);
    const { AddRecipe } = RecipeManager();
    const [recipeDetails, setRecipeDetails] = useState({
        title: '',
        description: '',
        videourl: null,
        imageurl: null,
        bookurl: null,
        ingredients: [{ingredient: '', quantity: ''}],
    });

    const handleClose = () => {
        setShow(false);
        onClose();
    };

    const handleImageDrop = (file) => {
        console.log("Image dropped:", file);

        setRecipeDetails(prevState => ({
            ...prevState,
            imageurl: file,
        }));
    };

    const handleVideoDrop = (file) => {
        console.log("Video dropped:", file);

        setRecipeDetails(prevState => ({
            ...prevState,
            videourl: file,
        }));
    };

    const handleBookDrop = (event) => {
        setRecipeDetails(prevState => ({
            ...prevState,
            bookurl: event.target.files[0],
        }))
    }

    const handleChange = (event) => {
        const field = event.target.name;
        setRecipeDetails((prevState) => ({
            ...prevState,
            [field]: event.target.value,
        }));
    };

    const handleIngredients = (event, index) => {
        const { name, value } = event.target;
        const ingredients = [...recipeDetails.ingredients];
        ingredients[index][name] = value;
        setRecipeDetails(prevState => ({
            ...prevState,
            ingredients: ingredients,
        }));
    };

    const addIngredient = () => {
        setRecipeDetails(prevState => ({
           ...prevState,
            ingredients: [...prevState.ingredients, { ingredient: '', quantity: '' }],
        }));
    };

    const removeIngredient = index => {
        const ingredients = [...recipeDetails.ingredients];
        ingredients.splice(index, 1);
        setRecipeDetails(prevState => ({
           ...prevState,
            ingredients: ingredients,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(recipeDetails.videourl === null && recipeDetails.imageurl === null) {
            showToastFail("Choose a video and image first");
        } else if (recipeDetails.videourl === null) {
            showToastFail("Choose a video");
        } else if(recipeDetails.imageurl === null) {
            showToastFail("Choose an image");
        } else if (recipeDetails.title === "" && recipeDetails.description === "") {
            showToastFail("All fields are required");
        } else if(recipeDetails.title === "") {
            showToastFail("Put a Title");
        } else if(recipeDetails.description === "") {
            showToastFail("Put a description");
        } else if(recipeDetails.bookurl === "") {
            showToastFail("Put a book");
        } else {
            const formData = new FormData();

            formData.append("title", recipeDetails.title);
            formData.append("description", recipeDetails.description);
            formData.append('imageurl', recipeDetails.imageurl);
            formData.append('videourl', recipeDetails.videourl);
            formData.append('bookurl', recipeDetails.bookurl);

            recipeDetails.ingredients.forEach((ingredient, index) => {
                formData.append(`ingredients[${index}][ingredientName]`, ingredient.ingredient);
                formData.append(`ingredients[${index}][quantity]`, ingredient.quantity);
            });
            
            AddRecipe(formData).then(response => {
                if(response === "success") {
                    showToastSuccess("Recipe has been added");
                    setShow(false);
                    onSuccess();
                } else {
                    showToastFail("Failed");
                }
            });
        }
    };

    return (
            <Modal show={show} onHide={handleClose} className="mt-3 modal-container" size='lg'>
                <Modal.Header closeButton className="modal-background">
                    <Modal.Title className='fw-bold text-white'>Post a New Recipe</Modal.Title>
                </Modal.Header>

                <Modal.Body className="modal-background">
                    
                    <Form>
                        <div className="dropzones">

                            <div className='row1'>
                                <p className='text-white'>Choose Image:</p>
                                <div className="image-dropzone">
                                    <ImageDropZone onImageDrop={handleImageDrop} name='imageurl' required/>
                                </div>
                            </div>

                            <div className='row2'>
                                <p className='text-white'>Choose Video:</p>
                                <div className="video-dropzone">
                                    <VideoDropZone onVideoDrop={handleVideoDrop} name='videourl' required/>
                                </div>
                            </div>

                        </div>

                        <Form.Group controlId="formFile" className="mt-4">
                            <Form.Label className="text-white">Book File :</Form.Label>
                            <Form.Control type="file" onChange={handleBookDrop}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label className="text-white mt-4">Title :</Form.Label>
                            <Form.Control type='text' placeholder='Recipe title' name='title' onChange={handleChange}/>
                            <Form.Label className="text-white mt-3">Description :</Form.Label>
                            <Form.Control className="mb-3" as='textarea' rows={5} style={{resize: 'none'}} name='description' onChange={handleChange} />
                        </Form.Group>

                        <div className="d-flex justify-content-between">
                            <Form.Label className="text-white mb-3">Ingredients :</Form.Label>
                            <Button variant="primary" onClick={addIngredient}>
                                <FaPlus />
                            </Button>
                        </div>

                        {recipeDetails.ingredients.map((ingredient, index) => (
                        <Form.Group key={index} className="d-flex justify-content-evenly">
                            <div className="d-flex align-items-center mb-3">
                                <Form.Control type='text' placeholder='Ingredient' name='ingredient' value={ingredient.ingredient} onChange={(e) => handleIngredients(e, index)} className="me-2" />
                                <Form.Control type='text' placeholder='Quantity' name='quantity' value={ingredient.quantity} onChange={(e) => handleIngredients(e, index)} className="me-2" />
                                <Button variant="danger" onClick={() => removeIngredient(index)} className="me-2">
                                    <MdRemoveCircle />
                                </Button>
                            </div>
                        </Form.Group>
                        ))}

                    </Form>

                </Modal.Body>
                
                <Button variant="primary" className="post-button fw-bold" onClick={handleSubmit}>
                    POST
                </Button>

            </Modal>
    );
}

export default PostModal;
