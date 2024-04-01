<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleRequest;
use App\Http\Resources\VariantResource;
use App\Http\Resources\VehicleResource;
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

    public function storeVehicle(StoreVehicleRequest $request)
    {
        $data = $request->validated();

        $newFileName = null;
        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            // Generate a unique name for the file
            $fileName = Carbon::now()->format('YmdHis') . Str::random(5) . '.' . $data['image']->getClientOriginalExtension();
            // Store the file in the 'public' disk
            Storage::disk('public')->putFileAs('models', $data['image'], $fileName);
            $newFileName = $fileName;
        }

        
        $vehicle = Vehicle::create([
            'user_id' => Auth::user()->id,
            'name' => $data['name'] ? $data['name'] : null,
            'slug' => $data['name'] ? Str::slug($data['name']) . '-' . Carbon::now()->format('YmdHis') : null,
            'short_description' => $data['short_description'] ? $data['short_description'] : null,
            'description' => $data['description'] ? $data['description'] : null,
            'status' => 1,
            'main_image' => $data['image'] ? $newFileName : null,
            'thumb_image' => $data['image'] ? $newFileName : null,
        ]);

        return new VehicleResource($vehicle);
    }

    
}
