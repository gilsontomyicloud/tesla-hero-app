<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('variant_images', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->comment('creator user id');
            $table->unsignedBigInteger('variant_id')->comment('Variant id from variants table');
            $table->string('name', 150)->nullable();
            $table->string('image',250);
            $table->smallInteger('display_order')->default(1);
            $table->tinyInteger('status')->default(1)->comment('1-Active, 0-Inactive');
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('variant_id')->references('id')->on('variants')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variant_images');
    }
};
