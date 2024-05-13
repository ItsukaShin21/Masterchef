<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecipeLikes extends Model
{
    protected $table = "recipelikes";
    
    protected $primaryKey = 'likeID';

    protected $fillable = [
        'recipeID',
        'userID',
    ];
}
