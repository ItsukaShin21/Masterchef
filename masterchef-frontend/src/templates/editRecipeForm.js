import React from 'react';
import ImageDropZone from '../dropzones/imageDropzone';
import VideoDropZone from '../dropzones/videoDropzone';
import { MdRemoveCircle } from "react-icons/md";
import { FaEdit, FaPlus } from "react-icons/fa";
import { Form } from 'react-bootstrap';

const EditRecipeForm = ({onSubmit, onEdit, onChangeText, 
                         recipeData, image, video, onAddRow, 
                         onRemoveRow, onIngredientChange, onVideoDrop, onImageDrop, onBookDrop }) => {

    const username = localStorage.getItem('username');

    return (
        <Form onSubmit={onSubmit} className="d-flex flex-column edit-mode-recipe mt-5">
                        
        <div className="d-flex edit-dropzones mb-4 justify-content-evenly">

            <div className="video-edit-drop">
                <VideoDropZone onVideoDrop={onVideoDrop} name="videourl" initialVideo={video}/>
            </div>

            <div className="image-edit-drop">
                <ImageDropZone onImageDrop={onImageDrop} name="imageurl" initialImage={image} />
            </div>

        </div>

        <div className="recipe-title-container d-flex mt-3 ms-4 justify-content-between">
            <input className="edit-title fw-bold" type="text" name="title" onChange={onChangeText} defaultValue={recipeData.title} />
            {username === 'admin' && <FaEdit className="edit-button" size={30} color='skyblue' onClick={onEdit}/>}
        </div>

        <div className="ingredients d-flex row ms-4 mb-4 mt-5">
            <div className="d-flex justify-content-between mb-2">
                <h3 className="text-white">Ingredients :</h3>
                <button type="button" className="add-action" onClick={onAddRow}>
                    <FaPlus />
                </button>
            </div>

            <div className="ingredient-list">
                {recipeData.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-row mb-3">
                        <input
                            type="text"
                            className="me-3 ingredient-textbox"
                            name="ingredientName"
                            defaultValue={ingredient.ingredientName}
                            onChange={(e) => onIngredientChange(index, 'ingredientName', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            className="ingredient-textbox"
                            name="quantity"
                                defaultValue={ingredient.quantity}
                                onChange={(e) => onIngredientChange(index, 'quantity', e.target.value)}
                                required
                            />
                        <button className="ms-3 remove-action" onClick={() => onRemoveRow(index)}>
                            <MdRemoveCircle />
                        </button>
                        </div>
                    ))}
                </div>

            </div>

            <div>
                <h1 className="text-white">Hello</h1>
            </div>

            <div className="edit-description-container mt-3 ms-4 text-white">
                <textarea className="edit-description" name="description" onChange={onChangeText} defaultValue={recipeData.description} />
            </div>

            <div className="d-flex align-self-center justify-content-center save-button-container mt-3 pb-5">
                <button className="align-self-center fw-bold save-button" type="submit">Save</button>
            </div>

        </Form>
    );
}

export default EditRecipeForm;