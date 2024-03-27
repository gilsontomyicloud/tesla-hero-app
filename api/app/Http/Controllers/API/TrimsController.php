<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\TrimResource;
use App\Models\Trim;
use Illuminate\Http\Request;

class TrimsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getAllTrims()
    {
        return TrimResource::collection(
            Trim::where('status', 1)->orderBy('created_at', 'desc')
            ->get()
        );
    }
}
