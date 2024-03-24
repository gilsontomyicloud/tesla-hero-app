<?php

namespace App\Http\Resources;

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
            'id' => (string)$this->id,
            'attributes' => [
                'name' => $this->name,
                'slug' => $this->slug,
                'mainImage' => $this->main_image,
                'thumbImage' => $this->thumb_image,
                'shortDescription' => $this->short_description,
                'fullDescription' => $this->description,
                'status' => $this->status,
                'created_at' => $this->created_at,
                'creatupdated_ated_at' => $this->updated_at,
            ],
            'relationships'=>[
                'user_id' => $this->user->id,
                'user_name' => $this->user->name,
            ] 
        ];
    }
}
