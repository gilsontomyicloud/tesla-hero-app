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
        Schema::create('variants', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->comment('creator user id');
            $table->unsignedBigInteger('vehicle_id')->comment('Vehicle model id from vehicles table');
            $table->unsignedBigInteger('color_id')->comment('Color id from colors table');
            $table->unsignedBigInteger('trim_id')->comment('Vehicle trim id from trims table');
            $table->string('name', 150);
            $table->string('slug', 150)->nullable();
            $table->longText('description')->nullable();
            $table->text('warranty_details')->nullable();
            $table->string('image',250)->nullable();
            $table->string('price', 80)->nullable()->comment('In USD');
            $table->string('range', 50)->nullable();
            $table->string('top_speed', 50)->nullable();
            $table->string('acceleration', 50)->nullable()->comment('0-60 mph');
            $table->tinyInteger('autopilot_available')->default(1)->comment('1-Yes, 0-No');
            $table->integer('wheel_size')->nullable()->comment('18-18" Inch., 19-19" Inch., 20-20" Inch., 21-21" Inch., 22-22" Inch.');
            $table->tinyInteger('wheel_type')->nullable()->comment('1-Gemini, 2-Induction');
            $table->tinyInteger('seat_capacity')->default(5)->comment('5-Five Seater, 6-Five Seater, 7-Five Seater');
            $table->tinyInteger('status')->default(1)->comment('1-Active, 0-Inactive');
            $table->foreign('user_id')->references('id')->on('users')->nullOnDelete()->cascadeOnUpdate();
            $table->foreign('color_id')->references('id')->on('colors')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('vehicle_id')->references('id')->on('vehicles')->cascadeOnDelete()->cascadeOnUpdate();
            $table->foreign('trim_id')->references('id')->on('trims')->cascadeOnDelete()->cascadeOnUpdate();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('variants');
    }
};
