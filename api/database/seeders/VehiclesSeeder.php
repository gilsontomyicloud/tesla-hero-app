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
            [
                'user_id' => 1,
                'name' => 'Model X',
                'slug' => 'model-x',
                'short_description' => 'With ample storage and 5,000 lbs of towing capacity, Model X is built for maximum utility.',
                'description' => 'With the most power and quickest acceleration of any SUV, Model X Plaid is the highest performing SUV ever built. Updated battery architecture enables both Long Range and Plaid configurations to complete back-to-back track runs without performance degradation.',
                'main_image' => null,
                'thumb_image' => null,
                'status' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],
            [
                'user_id' => 1,
                'name' => 'Model Y',
                'slug' => 'model-y',
                'short_description' => 'From daily driving to family road trips, charging Model Y is fast, convenient and accessible anywhere there\'s electricity.',
                'description' => 'Go ahead, take the road trip. With up to 310 miles (EPA est.) of range on a single charge, chances are you\'ll need a break before your Model Y will. Dual motor all-wheel drive ensures you\'re ready to tackle any road conditions.',
                'main_image' => null,
                'thumb_image' => null,
                'status' => 1,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ],

        ]);
    }
}
