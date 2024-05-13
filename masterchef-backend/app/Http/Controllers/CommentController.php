<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comment;
use App\Models\Recipe;

class CommentController extends Controller
{
    public function addComment(Request $request) {
        $comment = Comment::create([
            'recipeID' => $request->recipeId,
            'userID' => $request->userId,
            'commentText' => $request->commentText,
        ]);

        return response()->json(['status' => 'success']);
    }

    public function displayCommentItem($recipeId) {
        $recipe = Recipe::find($recipeId);
        $commentItems = $recipe->comments()->with('user')->withCount('likes')->get();
    
        return response()->json(['commentList' => $commentItems]);
    }

    public function commentDelete(Request $request) {
        $commentId = $request->input('commentId');
        $comment = Comment::find($commentId);

        if ($comment) {
            $comment->delete();
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status' => 'failed']);
        }
    }

    public function updateComment(Request $request) {
        $commentId = $request->input('commentId');
        $commentText = $request->input('commentText');
        $comment = Comment::find($commentId);
    
        if ($comment) {
            $comment->commentText = $commentText;
            $comment->save();
            
            return response()->json(['status' => 'success']);
        } else {
            return response()->json(['status' => 'failed']);
        }
    }
}
