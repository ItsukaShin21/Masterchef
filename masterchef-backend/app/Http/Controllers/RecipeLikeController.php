<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecipeLikes;

class RecipeLikeController extends Controller
{
    public function likeRecipe(Request $request) {
        $items = $request->validate([
            'recipeId' => 'required',
            'userId' => 'required',
        ]);
    
        // Check if a like entry already exists for the given recipeId and userId
        $existingLike = RecipeLikes::where('recipeID', $items['recipeId'])
                                   ->where('userID', $items['userId'])
                                   ->first();
    
        if ($existingLike) {
            // If a like entry exists, delete it to unlike the recipe
            $existingLike->delete();
            return response()->json(['status' => 'unliked']);
        } else {
            // If no like entry exists, create a new one to like the recipe
            $new = RecipeLikes::create([
                'recipeID' => $items['recipeId'],
                'userID' => $items['userId'],
            ]);
            return response()->json(['status' => 'liked']);
        }
    }

    public function displayLikes() {
        $recipes = Recipe::withCount('likes')->get();

        return response()->json(['recipeList' => $recipes]);
    }
}
