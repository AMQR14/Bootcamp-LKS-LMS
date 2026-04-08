<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class TeacherController extends Controller
{
    public function allteachers($request){
        // $teachers = User::where('role', 'teacher')->get();

        // return response()->json('$teachers');
        return response()->json('hello');
    }
}
