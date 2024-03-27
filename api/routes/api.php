<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\VariantController;
use App\Http\Controllers\API\VehiclesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/vehciles/variants/create', [VehiclesController::class, 'storeVariant']);
});

/* API routes which are accessible to public */
Route::apiResource('/vehicles',VehiclesController::class);
Route::apiResource('/variants',VariantController::class);
Route::post('/login', [AuthController::class,'login']);