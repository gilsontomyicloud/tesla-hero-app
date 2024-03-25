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
            'id' => (string)$this->id,
            'attributes' => [
                'vehicle_id' => $this->vehicle_id,
                'color_id' => $this->color_id,
                'trim_id' => $this->trim_id,
                'name' => $this->name,
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
                'creatupdated_ated_at' => $this->updated_at,
            ],
            'relationships' => [
                'user' => [
                    'user_id' => $this->user->id,
                    'user_name' => $this->user->name,
                ],
                'images' =>[]
            ]
        ];
    }
}
