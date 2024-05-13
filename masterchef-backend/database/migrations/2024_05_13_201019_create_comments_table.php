<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comments', function (Blueprint $table) {
            $table->id('commentID')->autoIncrement();
            $table->unsignedBigInteger('recipeID');
            $table->unsignedBigInteger('userID');
            $table->string('commentText', 255);
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('recipeID')->references('recipeID')->on('recipes')->onDelete('cascade');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comments');
    }
};
