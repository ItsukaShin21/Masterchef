<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CommentLikes;

class CommentLikesController extends Controller
{
    public function likeComment(Request $request) {
        $validatedData = $request->validate([
            'commentId' => 'required|integer',
            'userId' => 'required|integer',
        ]);

        $item = CommentLikes::where('commentID', $validatedData['commentId'])
                            ->where('userID', $validatedData['userId'])
                            ->first();
    
        if ($item) {
            // If the like exists, delete it (unlike)
            $item->delete();
            return response()->json(['status' => 'unliked']);
        } else {
            // If the like does not exist, create it (like)
            CommentLikes::create([
                'commentID' => $validatedData['commentId'],
                'userID' => $validatedData['userId'],
            ]);
            return response()->json(['status' => 'liked']);
        }
    }

    public function displaylikeComments() {
        $comments = Comment::withCount('likes')->get();

        return response()->json(['commentList' => $comments]);
    }
}
