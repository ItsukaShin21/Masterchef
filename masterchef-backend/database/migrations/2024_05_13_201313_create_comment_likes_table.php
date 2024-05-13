<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('comment_likes', function (Blueprint $table) {
            $table->id('likeID')->autoIncrement(); // Primary key, auto-incrementing
            $table->unsignedBigInteger('commentID'); // Foreign key referencing comments table
            $table->unsignedBigInteger('userID'); // Foreign key referencing users table
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('commentID')->references('commentID')->on('comments')->onDelete('cascade');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('comment_likes');
    }
};
