<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Admin User
        DB::table('users')->insert([
            'username' => 'admin',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin2102'),
            'role' => 'admin',
        ]); 
        // Chef User
        DB::table('users')->insert([
            'username' => 'chef',
            'email' => 'chef@gmail.com',
            'password' => Hash::make('chef2102'),
            'role' => 'owner',
        ]); 
        // Visitor User
        DB::table('users')->insert([
            'username' => 'visitor',
            'email' => 'visitor@gmail.com',
            'password' => Hash::make('visit2102'),
            'role' => '',
        ]);
    }
}
