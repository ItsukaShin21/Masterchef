import backend_api from "../backend_api/api";
import { showToastSuccess } from "./toasters";
import { useParams } from 'react-router-dom';

export const RecipeManager = () => {
    const { recipeId } = useParams();

    //Function to like a recipe
    const LikeRecipe = (recipeId, userId) => {
        backend_api.post('/like-recipe', {
            recipeId,
            userId
        });
    }

    //Function to delete a recipe
    const DeleteRecipe = async (recipeId) => {
        await backend_api.post('/delete-recipe', {
            recipeId,
        }).then(response => {
            if(response.data.status === "success") {
                showToastSuccess("Recipe has been deleted");
            }
        });
    }

    //Function to fetch all recipes
    const FetchAllRecipe = async () => {
        const response = await backend_api.get('/display-recipes');
        return response.data.recipeList;
    };

    //Function to fetch a recipe
    const FetchRecipeItem = async () => {
        const response = await backend_api.get(`/display-recipe-item/${recipeId}`);
        return response.data.recipeItem;
    };

    //Function to Add a recipe
    const AddRecipe = async (formData) => {
        const response = await backend_api.post('/register-recipe', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.status;
    }

    //Function to update a recipe
    const UpdateRecipe = async (formData) => {
        const response = await backend_api.post('/update-recipe', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data.status;
    };

    return { LikeRecipe, DeleteRecipe, FetchAllRecipe, FetchRecipeItem, UpdateRecipe, AddRecipe };
}