<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Recipe;
use App\Models\Ingredient;
use Illuminate\Support\Facades\Storage;

class RecipeController extends Controller
{
    public function displayRecipes() {
        $recipes = Recipe::withCount('likes')->with('ingredients')->get();

        return response()->json(['recipeList' => $recipes]);
    }

    public function displayRecipeItem($recipeId) {
        $recipeItem = Recipe::withCount('likes')->with('ingredients')->find($recipeId);

        return response()->json(['recipeItem' => $recipeItem]);
    }

    public function registerRecipe(Request $request) {
        $information = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'videourl' => 'required',
            'imageurl' => 'required',
            'bookurl' => 'required',
            'ingredients.*.ingredientName' => 'required',
            'ingredients.*.quantity' => 'required',
        ]);

        $imageFile = $request->hasFile('imageurl')? $request->file('imageurl')->store('images', 'public') : null;
        $videoFile = $request->hasFile('videourl')? $request->file('videourl')->store('videos', 'public') : null;
        $bookFile = $request->hasFile('bookurl')? $request->file('bookurl')->store('books', 'public') : null;

        $recipe = Recipe::create([
            'title' => $information['title'],
            'description' => $information['description'],
            'videourl' => $videoFile,
            'imageurl' => $imageFile,
            'bookurl' => $bookFile,
        ]);

        if (isset($request->ingredients) && is_array($request->ingredients)) {
            foreach ($request->ingredients as $ingredientData) {
                Ingredient::create([
                    'recipeID' => $recipe->recipeID,
                    'ingredientName' => $ingredientData['ingredientName'],
                    'quantity' => $ingredientData['quantity'],
                ]);
            }
        }

        return response()->json(['status' => 'success']);
    }

    public function recipeDelete(Request $request) {
        $recipeId = $request->input('recipeId');
        $recipe = Recipe::find($recipeId);
    
        if ($recipe) {
            $recipe->delete();
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status' => 'failed']);
        }
    }

    public function updateRecipe(Request $request) {
        // Validate the request data
        $validatedData = $request->validate([
            'recipeId' => 'integer',
            'title' => 'string',
            'description' => 'string',
            'ingredients.*.ingredientName' => 'required',
            'ingredients.*.quantity' => 'required',
        ]);
    
        $recipe = Recipe::find($validatedData['recipeId']);
    
        $imageFile = $request->hasFile('imageurl')? $request->file('imageurl')->store('images', 'public') : null;
        $videoFile = $request->hasFile('videourl')? $request->file('videourl')->store('videos', 'public') : null;
    
        // Check if both files are not null before updating
        if ($imageFile!== null && $videoFile!== null) {
            $recipe->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'imageurl' => $imageFile,
                'videourl' => $videoFile,
            ]);
        } elseif ($imageFile!== null) {
        // If only the image is not null, update the recipe with the new image URL and keep the current video URL
            $recipe->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'imageurl' => $imageFile,
                'videourl' => $recipe->videourl, // Keep the current video URL
            ]);
        } elseif ($videoFile!== null) {
        // If only the video is not null, update the recipe with the new video URL and keep the current image URL
            $recipe->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'imageurl' => $recipe->imageurl,
                'videourl' => $videoFile,
            ]);
        } else {
            // If both files are null, you might choose to skip the update or handle it differently
            $recipe->update([
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
            ]);
        }

        $currentIngredients = $recipe->ingredients;

        // Update or delete existing ingredients
        foreach ($currentIngredients as $ingredient) {
            $ingredientExists = false;
            foreach ($request->ingredients as $ingredientData) {
                if ($ingredient->ingredientName == $ingredientData['ingredientName']) {
                    $ingredientExists = true;
                    break;
                }
            }
            if (!$ingredientExists) {
                $ingredient->delete();
            }
        }

        // Create new ingredients for any new entries in the request
        foreach ($request->ingredients as $ingredientData) {
            $ingredient = Ingredient::firstOrNew(['recipeID' => $recipe->recipeID, 'ingredientName' => $ingredientData['ingredientName']]);
            $ingredient->quantity = $ingredientData['quantity'];
            $ingredient->save();
        }   
    
        return response()->json(['status' => 'success']);
    }
    
}
