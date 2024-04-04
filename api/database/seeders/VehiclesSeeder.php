<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class VehiclesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('vehicles')->insert([
            [
                'user_id' => 1,
                'name' => 'Model S',
                'slug' => 'model-s',
                'short_description' => 'Model S Plaid has the quickest acceleration of any vehicle in production.',
                'description' => 'Model S Plaid has the quickest acceleration of any vehicle in production. Updated battery architecture for all Model S trims enables back-to-back track runs without performance degradation.',
                'main_image' => null,
                'thumb_image' => null,
                'status' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'user_id' => 1,
                'name' => 'Model 3',
                'slug' => 'model-3',
                'short_description' => 'Luxury sedan for long distance drives, quick acceleration and comfort',
                'description' => 'Go up to 341 miles (EPA est.) on a single charge with updated exterior styling optimized for maximum aerodynamics.',
                'main_image' => null,
                'thumb_image' => null,
                'status' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            

        ]);
    }
}
