import { useParams } from 'react-router-dom';
import backend_api from "../backend_api/api";

export const CommentManager = () => {
    const { recipeId } = useParams();

    //Function to fetch all comments
    const FetchAllComments = async () => {
        const response = await backend_api.get(`/display-comment-items/${recipeId}`);
        return response.data.commentList;
    };

    //Function to like a comment
    const LikeComment = async (commentId,userId) => {
        await backend_api.post('/like-comment', {
            commentId,
            userId
        });
    }

    //Function to add a comment to a recipe
    const AddComment = async (recipeId,userId,commentText) => {
        const response = await backend_api.post('/recipe-comment', {
            recipeId: recipeId,
            userId: userId,
            commentText: commentText,
        });
        return response.data.status;
    }

    //Function to update a comment to a recipe
    const UpdateComment = async (commentId, text) => {
        const response = await backend_api.post('/update-comment', {
            commentId: commentId,
            commentText: text,
        });
        return response.data.status;
    }

    //Function to delete a comment to a recipe
    const DeleteComment = async (commentId) => {
        const response = await backend_api.post('/delete-comment', {
            commentId,
        });
        return response.data.status;
    }

    return { FetchAllComments, LikeComment, AddComment, DeleteComment, UpdateComment };
}
