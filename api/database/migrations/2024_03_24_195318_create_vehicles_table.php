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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->comment('creator user id');
            $table->string('name',150);
            $table->string('slug', 150)->nullable();
            $table->text('short_description')->nullable();
            $table->longText('description')->nullable();
            $table->string('main_image',250)->nullable();
            $table->string('thumb_image',250)->nullable();
            $table->tinyInteger('status')->default(1)->comment('1-Active, 0-Inactive');
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
