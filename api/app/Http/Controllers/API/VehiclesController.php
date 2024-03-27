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
     * Show the form for creating a new resource.
     */
    public function storeVariant(StoreVehicleVariantRequest $request)
    {
        $data = $request->validated();

        $newFileName = null;
        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            // Generate a unique name for the file
            $fileName = Carbon::now()->format('YmdHis').Str::random(5) . '.' . $data['image']->getClientOriginalExtension();
            // Store the file in the 'public' disk
            Storage::disk('public')->putFileAs('variants', $data['image'], $fileName);
            $newFileName = $fileName;
        }

        $variant = Variant::create([
            'vehicle_id' => $data['vehicle'] ? $data['vehicle'] : 1,
            'color_id' => $data['color'] ? $data['color'] : 1,
            'trim_id' => $data['trim'] ? $data['vehicle'] : 1,
            'user_id' => Auth::user()->id,
            'name' => $data['name'] ? $data['name'] : null,
            'slug' => $data['name'] ? Str::slug($data['name']).'-'. Carbon::now()->format('YmdHis') : null,
            'description' => $data['description'] ? $data['description'] : null,
            'warranty_details' => $data['warranty_details'] ? $data['warranty_details'] : null,
            'price' => $data['price'] ? $data['price'] : 1,
            'range' => $data['range'] ? $data['range'] : null,
            'top_speed' => $data['top_speed'] ? $data['top_speed'] : null,
            'acceleration' => $data['acceleration'] ? $data['acceleration'] : 1,
            'wheel_size' => $data['wheel_size'] ? $data['wheel_size'] : 18,
            'wheel_type' => $data['wheel_type'] ? $data['wheel_type'] : 1,
            'seat_capacity' => $data['seat_capacity'] ? $data['seat_capacity'] : 5,
            'status' => 1,
            'image' => $data['image'] ? $newFileName : 5,
        ]);

        return new VariantResource($variant);
    }

    
}
