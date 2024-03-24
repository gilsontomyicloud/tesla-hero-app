<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'name', 'slug', 'short_description', 'description', 'thumb_image', 'main_image', 'status'
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
