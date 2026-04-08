<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'email'=> 'user@gmail.com',
            'password'=> bcrypt('password'),
            'role'=> 'student'
        ]);
        
        User::create([
            'email'=> 'teach1@gmail.com',
            'password'=> bcrypt('password'),
            'role'=> 'teacher'
        ]);

        User::create([
            'email'=> 'teach2@gmail.com',
            'password'=> bcrypt('password'),
            'role'=> 'teacher'
        ]);
    }
}
