<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'attributes' => [
                'name' => $this->name,
                'vehicle_id' => $this->vehicle_id,
                'color_id' => $this->color_id,
                'trim_id' => $this->trim_id,
                'slug' => $this->slug,
                'description' => $this->description,
                'warranty_details' => $this->warranty_details,
                'price' => $this->price,
                'image' => $this->image,
                'range' => $this->range,
                'top_speed' => $this->top_speed,
                'acceleration' => $this->acceleration,
                'autopilot_available' => $this->autopilot_available,
                'wheel_size' => $this->wheel_size,
                'wheel_type' => $this->wheel_type,
                'seat_capacity' => $this->seat_capacity,
                'status' => $this->status,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'relationships' => [
                'user' => [
                    'id' => $this->user->id,
                    'name' => $this->user->name,
                ],
                'images' =>[],
                'vehicle' => [
                    'id' => $this->vehicle->id,
                    'name' => $this->vehicle->name
                ],
                'trim' => [
                    'id' => $this->trim->id,
                    'name' => $this->trim->name
                ],
                'color' => [
                    'id' => $this->trim->id,
                    'name' => $this->trim->name,
                    'code' => $this->trim->color_code,

                ]
            ]
        ];
    }
}
