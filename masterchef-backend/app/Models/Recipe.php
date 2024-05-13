<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    protected $table = "recipes";

    protected $primaryKey = 'recipeID';

    protected $fillable = [
        'title',
        'description',
        'videourl',
        'imageurl',
        'bookurl',
    ];

    public function likes() {
        return $this->hasMany(RecipeLikes::class, 'recipeID');
    }

    public function comments() {
        return $this->hasMany(Comment::class, 'recipeID', 'recipeID');
    }

    public function ingredients() {
        return $this->hasMany(Ingredient::class, 'recipeID', 'recipeID');
    }
}
