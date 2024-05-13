import ImageDropZone from '../dropzones/imageDropzone';
import VideoDropZone from '../dropzones/videoDropzone';
import { FaEdit, FaPlus } from "react-icons/fa";
import { MdRemoveCircle } from "react-icons/md";
import { Form, Button } from 'react-bootstrap';

function RecipeEditForm({ recipe, onEdit, onAddRow, onRemoveRow, onSubmit, 
                          onTextChange, onIngredientChange, onDropVideo, onDropImage, onBookDrop }) {
                            
    const baseURL = 'http://127.0.0.1:8000';
    const username = localStorage.getItem('username');

    return (
        <Form onSubmit={onSubmit} className="d-flex flex-column edit-mode-recipe mt-5">
            <div className="d-flex edit-dropzones mb-4 justify-content-evenly">
                <div className="video-edit-drop">
                    <VideoDropZone onVideoDrop={onDropVideo} name="videourl" initialVideo={`${baseURL}/storage/${recipe.videourl}`}/>
                </div>

                <div className="image-edit-drop">
                    <ImageDropZone onImageDrop={onDropImage} name="imageurl" initialImage={`${baseURL}/storage/${recipe.imageurl}`} />
                </div>

            </div>

            <div className="recipe-title-container d-flex mt-3 ms-4 justify-content-between">
                <input className="edit-title fw-bold" type="text" name="title" onChange={onTextChange} defaultValue={recipe.title} />
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
                    {recipe.ingredients.map((ingredient, index) => (
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

            <Form.Group controlId="formFile" className="mt-4 ms-4 mb-3 book-field">
                <Form.Label className="text-white">Current Book File :
                    <a href={`${baseURL}/storage/${recipe.bookurl}`} 
                        className="text-black ms-3 p-1 book-preview text-decoration-none fw-bold" 
                        target="_blank" rel="noopener noreferrer" download>
                        Click to preview
                    </a>
                </Form.Label>
                <Form.Control type="file" onChange={onBookDrop}/>
            </Form.Group>
                
            <div className="edit-description-container mt-3 ms-4 text-white">
                <textarea className="edit-description" name="description" onChange={onTextChange} defaultValue={recipe.description} />
            </div>
                
            <div className="d-flex align-self-center justify-content-center save-button-container mt-3 pb-5">
                <Button className="align-self-center fw-bold save-button" type="submit">Save</Button>
            </div>
                
        </Form>
    );
}

export default RecipeEditForm;