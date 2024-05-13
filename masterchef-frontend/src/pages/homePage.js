import React, { useState, useEffect } from 'react';
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PostModal from "../modals/postModal";
import DeleteModal from '../modals/deleteModal';
import Header from "../templates/headerTemplate";
import RecipeIcons from '../templates/recipeIconTemplate';
import Loader from '../templates/loaderTemplate';
import { RecipeManager } from "../components/recipesManager";

function HomePage() {
    const navigate = useNavigate();
    const { LikeRecipe, DeleteRecipe, FetchAllRecipe } = RecipeManager();
    const [modalOpen, setModalOpen] = useState(false);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [recipes, setRecipes] = useState([]);
    const [likedRecipe, setLikedRecipe] = useState();
    const [searchTerm, setSearchTerm] = useState('');
    const [loader, setLoader] = useState(false);

    const username = localStorage.getItem('username');

    useEffect(() => {
        setLoader(true);
        FetchAllRecipe().then(recipeList => {
            console.log(recipeList);
            setRecipes(recipeList);
            setLoader(false);
        });
    }, []);
    
    const handleLike = (recipeId) => {
        const userId = localStorage.getItem('id');
        LikeRecipe(recipeId, userId).then(() => {
            setLikedRecipe(true);
            FetchAllRecipe().then(recipeList => setRecipes(recipeList));
        });
    };

    const handleView = (recipeId) => {
        navigate(`/view-recipe/${ recipeId }`);
    };

    const handleConfirmation = (recipeId) => {
        setSelectedRecipe(recipeId);
        setDeleteModalOpen(true);
    };

    const handleDelete = () => {
        DeleteRecipe(selectedRecipe);
        FetchAllRecipe().then(recipeList => setRecipes(recipeList));
        setDeleteModalOpen(false);
        setModalOpen(false);
    };

    const toggleModal = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className="home-body">
            <ToastContainer/>

            <Header modalOpen={toggleModal}/>

            <div className="home-content">

                <div className="d-flex justify-content-center pt-4 search-container">
                    <input
                        className="search-textbox"
                        type="text" 
                        name="search"
                        id="search"
                        maxLength={16} 
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e)=>setSearchTerm(e.target.value)} />
                </div>

                {loader? (
                    <Loader text={ "Fetching All Recipes" }/>
                ) : (
                    <div className="container mt-5 recipe-list">
                        <div className="row">
                            {recipes
                             .filter(recipe => recipe.title.toLowerCase().includes(searchTerm.toLowerCase()))
                             .map((recipe) => (
                                <RecipeIcons 
                                    key={recipe.recipeID}
                                    imageUrl={recipe.imageurl}
                                    title={recipe.title}
                                    description={recipe.description}
                                    likeCounter={recipe.likes_count} 
                                    onLike={()=>handleLike(recipe.recipeID)}
                                    onView={()=>handleView(recipe.recipeID)}
                                    onDelete={()=>handleConfirmation(recipe.recipeID)}
                                    showDelete={username === 'admin' || username === 'chef'} />
                            ))}
                        </div>
                    </div>
                )}

                {modalOpen && 
                    <PostModal 
                        onClose={ toggleModal } 
                        onSuccess={() => {
                            toggleModal();
                            FetchAllRecipe().then(recipeList => setRecipes(recipeList));}} />
                }
                
                {deleteModalOpen && 
                    <DeleteModal 
                        onClose={() => setDeleteModalOpen(false)} 
                        onConfirm={handleDelete} 
                        item={ "recipe" }/>}

            </div>
            
        </div>
    )
}

export default HomePage;