<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('recipelikes', function (Blueprint $table) {
            $table->id('likeID')->autoIncrement();
            $table->unsignedBigInteger('recipeID');
            $table->unsignedBigInteger('userID');
            $table->timestamps();

            // Foreign key constraints
            $table->foreign('recipeID')->references('recipeID')->on('recipes')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('userID')->references('id')->on('users')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('recipelikes');
    }
};
