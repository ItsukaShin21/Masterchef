<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Comment extends Model
{
    protected $table = "comments";

    protected $primaryKey = "commentID";

    protected $fillable = [
        'recipeID',
        'userID',
        'commentText',
    ];

    public function user() {
        return $this->belongsTo(User::class, 'userID', 'id');
    }

    public function likes() {
        return $this->hasMany(CommentLikes::class, 'commentID', 'commentID');
    }
}
