<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreVehicleVariantImagesRequest;
use App\Http\Requests\StoreVehicleVariantRequest;
use App\Http\Resources\VariantImageResource;
use App\Http\Resources\VariantResource;
use App\Models\Color;
use App\Models\Variant;
use App\Models\VariantImage;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class VariantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        
        return VariantResource::collection(
            Variant::where('status', 1)->orderBy('created_at', 'desc')
                ->get()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $variant = Variant::where([['status','=',1],['slug','=', $id]])->first();
        dd($variant);
        return new VariantResource($variant);
    }

    public function getBySlug(string $id)
    {
        $variant = Variant::where([['status', '=', 1], ['slug', '=', $id]])->first();
        return response()->json([
            'id' => $variant->id,
            'name' => $variant->name,
            'vehicle_id' => $variant->vehicle_id,
            'color_id' => $variant->color_id,
            'trim_id' => $variant->trim_id,
            'slug' => $variant->slug,
            'description' => $variant->description,
            'warranty_details' => $variant->warranty_details,
            'price' => $variant->price,
            'image' => $variant->image,
            'range' => $variant->range,
            'top_speed' => $variant->top_speed,
            'acceleration' => $variant->acceleration,
            'autopilot_available' => $variant->autopilot_available,
            'wheel_size' => $variant->wheel_size,
            'wheel_type' => $variant->wheel_type,
            'seat_capacity' => $variant->seat_capacity,
            'status' => $variant->status,
            'created_at' => $variant->created_at,
            'updated_at' => $variant->updated_at,
            'images' => $variant->variantGallery()->pluck('image'),
            'user_id' => $variant->user->id,
            'user_name' => $variant->user->name,
            'vehicle_name' => $variant->vehicle->name,
            'trim_name' => $variant->trim->name,
            'color_name' => Color::find($variant->color_id) ? Color::find($variant->color_id)->name : null,
            'color_code' => Color::find($variant->color_id) ? Color::find($variant->color_id)->color_code : null,
        ],200);
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
            $fileName = Carbon::now()->format('YmdHis') . Str::random(5) . '.' . $data['image']->getClientOriginalExtension();
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
            'slug' => $data['name'] ? Str::slug($data['name']) . '-' . Carbon::now()->format('YmdHis') : null,
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

    /**
     * Show the form for creating a new resource.
     */
    public function storeVariantImages(StoreVehicleVariantImagesRequest $request)
    {
        $data = $request->validated();

        $newFileName = null;
        // Check if image was given and save on local file system
        if (isset($data['image'])) {
            // Generate a unique name for the file
            $fileName = Carbon::now()->format('YmdHis') . Str::random(5) . '.' . $data['image']->getClientOriginalExtension();
            // Store the file in the 'public' disk
            Storage::disk('public')->putFileAs('variants/gallery', $data['image'], $fileName);
            $newFileName = $fileName;
        }

        $variantImages = VariantImage::create([
            'variant_id' => $data['variant'] ? $data['variant'] : 1,
            'user_id' => Auth::user()->id,
            'name' => $data['name'] ? $data['name'] : null,
            'status' => 1,
            'display_order' =>  1,
            'image' => $data['image'] ? $newFileName : null,
        ]);

        return new VariantImageResource($variantImages);
    }
}
