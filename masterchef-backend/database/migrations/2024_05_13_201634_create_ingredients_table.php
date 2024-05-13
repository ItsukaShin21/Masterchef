<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('ingredients', function (Blueprint $table) {
            $table->id('ingredientID')->autoIncrement();
            $table->unsignedBigInteger('recipeID');
            $table->string('ingredientName', 255);
            $table->string('quantity', 255);
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('recipeID')->references('recipeID')->on('recipes')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    public function down()
    {
        Schema::dropIfExists('ingredients');
    }
};
