<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('recipes', function (Blueprint $table) {
            $table->id('recipeID')->autoIncrement();
            $table->string('title', 255)->nullable();
            $table->text('description')->nullable();
            $table->string('videoUrl', 255)->nullable();
            $table->string('imageUrl', 255)->nullable();
            $table->string('bookUrl', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recipes');
    }
};
