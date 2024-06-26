<?php

namespace App\Models;

use Faker\Provider\kk_KZ\Color;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Variant extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function trim()
    {
        return $this->belongsTo(Trim::class);
    }

    public function vehicleColor()
    {
        return $this->belongsTo(Color::class);
    }

    public function variantGallery()
    {
        return $this->hasMany(VariantImage::class);
    }
}
