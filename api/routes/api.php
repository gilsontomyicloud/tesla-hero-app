<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\ColorsController;
use App\Http\Controllers\API\TrimsController;
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
    Route::post('/vehicles/variants/create', [VariantController::class, 'storeVariant']);
    Route::post('/vehicles/store', [VehiclesController::class, 'storeVehicle']);
    Route::post('/vehicles/variants/images/create', [VariantController::class, 'storeVariantImages']);
});

/* API routes which are accessible to public */
Route::apiResource('/vehicles',VehiclesController::class);
Route::apiResource('/variants',VariantController::class);
// Route::get('/fetch-variant-detail/{slug}',[VariantController::class, 'showDetails']);
Route::get('/variants/get-by-slug/{variant:slug}', [VariantController::class, 'getBySlug']);
Route::get('/get-colors',[ColorsController::class, 'getAllColors']);
Route::get('/get-trims',[TrimsController::class, 'getAllTrims']);
Route::apiResource('/variants',VariantController::class);


Route::post('/login', [AuthController::class,'login']);