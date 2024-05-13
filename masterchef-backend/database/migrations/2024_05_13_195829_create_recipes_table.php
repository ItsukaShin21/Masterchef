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
            $table->string('videourl', 255)->nullable();
            $table->string('imageurl', 255)->nullable();
            $table->string('bookurl', 255)->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('recipes');
    }
};
