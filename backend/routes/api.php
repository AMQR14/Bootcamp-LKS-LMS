<?php

use App\Http\Controllers\AnswerController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseFileController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\MultipleChoiceController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\StatsController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WorkshopController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function (){
    Route::post('/login', [AuthController::class, 'login']);

    Route::apiResource('workshops', WorkshopController::class);
    Route::apiResource('users', UserController::class);
    Route::apiResource('teachers', TeacherController::class);
    Route::apiResource('students', StudentController::class);
    Route::apiResource('courses', CourseController::class);
    Route::apiResource('exams', ExamController::class);
    Route::apiResource('questions', QuestionController::class);
    Route::apiResource('answers', AnswerController::class); 
    Route::apiResource('multiplechoices', MultipleChoiceController::class);    
    Route::apiResource('coursefiles', CourseFileController::class);
    Route::get('/stats', [StatsController::class, 'index']);
    Route::get('/stats/students-by-year', [StatsController::class, 'studentsByYear']);
    
    Route::middleware(['auth:sanctum'])->group(function (){

        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});
