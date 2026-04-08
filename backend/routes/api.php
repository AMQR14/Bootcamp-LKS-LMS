<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TeacherController;
use App\Models\User;

Route::prefix('v1')->group(function (){
    Route::post('/login', [AuthController::class, 'login']);
    
    Route::middleware(['auth:sanctum'])->group(function (){
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
        
        Route::get('/teachers', [TeacherController::class, 'allteachers']);
    });
});
