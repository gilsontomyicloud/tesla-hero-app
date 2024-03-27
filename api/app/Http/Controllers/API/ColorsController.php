<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\ColorResource;
use App\Models\Color;
use Illuminate\Http\Request;

class ColorsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllColors()
    {
        return ColorResource::collection(
            Color::where('status', 1)->orderBy('created_at', 'desc')
            ->get()
        );
    }

    
}
