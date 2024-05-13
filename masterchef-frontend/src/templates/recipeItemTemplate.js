import DataTable from 'react-data-table-component';
import { FaHeart, FaEdit } from "react-icons/fa";
import Badge from 'react-bootstrap/Badge';

function RecipeItem({ recipe, onEdit, onLike }) {
    const baseURL = 'http://127.0.0.1:8000';
    const username = localStorage.getItem('username');
    const columns = [
        {
            name: "Ingredient",
            selector: row => row.ingredientName,
            sortable: false,
        },
        {
            name: "Quantity",
            selector: row => row.quantity,
            sortable: false,
        }
    ];

    const tableStyle = {
        headCells: {
            style: {
                backgroundColor: '#FFA31A',
                fontWeight: 'bold',
                display: 'flex',
                justifyContent: 'center',
                fontSize: '16px',
            },
        },
    };

    return (
        <div>
            <div className="video-container d-flex justify-content-center mt-5">
                <video src={`${baseURL}/storage/${recipe.videourl}`} controls className="recipe-video" />
            </div>
            
            <div className="recipe-title-container d-flex mt-3 ms-4 justify-content-between">
                <h1 className="fw-bold text-white">{recipe.title}</h1>
                {username === 'admin' && <FaEdit className="edit-button" size={30} color='skyblue' onClick={onEdit}/>} 
            </div>
            <div className="recipe-heart-container ms-4 mb-3 d-flex">
                <FaHeart className="me-1 heart" size={30} color="red" onClick={onLike}/>
                <h5>
                    <Badge bg="success">{recipe.likes_count}</Badge>
                </h5>
            </div>
            <div className="ingredients ms-4 mb-4 mt-5">
                <DataTable
                    responsive 
                    columns={columns}
                    data={recipe.ingredients}
                    customStyles={tableStyle}/>
            </div>

            <div className="book-container ms-4 p-2 text-center mb-4">
                <a href={`${baseURL}/storage/${recipe.bookurl}`} 
                    className="text-black text-decoration-none fw-bold" 
                    target="_blank" rel="noopener noreferrer" download>
                    Download the Book
                </a>
            </div>

            <div className="description-container pb-3 ms-4 text-white">
                <p>{recipe.description}</p>
            </div>
        </div>
    );
}

export default RecipeItem;