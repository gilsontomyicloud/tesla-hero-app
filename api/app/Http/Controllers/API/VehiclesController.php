<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleVariantRequest;
use App\Http\Resources\VariantResource;
use App\Http\Resources\VehicleResource;
use App\Models\Variant;
use App\Models\Vehicle;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VehiclesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return VehicleResource::collection(
            Vehicle::where('status',1)->orderBy('created_at', 'desc')
            ->get()
        );
    }

    /**
     * Display a listing of the resource.
     */
    public function fetchAllColors()
    {
        return VehicleResource::collection(
            Vehicle::where('status', 1)->orderBy('created_at', 'desc')
            ->get()
        );
    }

    
}
