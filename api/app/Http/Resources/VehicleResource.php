<?php

namespace App\Http\Resources;

use App\Models\Variant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
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
                'slug' => $this->slug,
                'mainImage' => $this->main_image,
                'thumbImage' => $this->thumb_image,
                'shortDescription' => $this->short_description,
                'fullDescription' => $this->description,
                'status' => $this->status,
                'created_at' => $this->created_at,
                'updated_at' => $this->updated_at,
            ],
            'relationships' => [
                'user' => [
                    'user_id' => $this->user->id,
                    'user_name' => $this->user->name,
                ],
                'variants' => VariantResource::collection($this->variants)
            ]
        ];
    }
}
