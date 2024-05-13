<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CommentLikes extends Model
{
    protected $table = "comment_likes";

    protected $primaryKey = "likeID";

    protected $fillable = [
        'commentID',
        'userID',
    ];

    public function comment() {
        return $this->belongsTo(Comment::class, 'commentID', 'commentID');
    }
}
