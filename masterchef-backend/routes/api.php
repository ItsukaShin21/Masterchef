<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\RecipeLikeController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommentLikesController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:sanctum','api'])->group(function() {
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware('api')->group(function() {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [UserController::class, 'add']);
    Route::post('/register-recipe', [RecipeController::class, 'registerRecipe']);
    Route::get('/display-recipes', [RecipeController::class, 'displayRecipes']);
    Route::post('/like-recipe', [RecipeLikeController::class, 'likeRecipe']);
    Route::post('/like-comment', [CommentLikesController::class, 'likeComment']);
    Route::get('/display-recipe-item/{recipeId}', [RecipeController::class, 'displayRecipeItem']);
    Route::post('/delete-recipe', [RecipeController::class, 'recipeDelete']);
    Route::post('/update-recipe', [RecipeController::class, 'updateRecipe']);
    Route::post('/update-comment', [CommentController::class, 'updateComment']);
    Route::post('/recipe-comment', [CommentController::class, 'addComment']);
    Route::get('/display-comment-items/{recipeId}', [CommentController::class, 'displayCommentItem']);
    Route::post('/delete-comment', [CommentController::class, 'commentDelete']);
});