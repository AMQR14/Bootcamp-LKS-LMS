<?php

namespace App\Http\Controllers;

use App\Models\TeacherCourse;
use Illuminate\Http\Request;

class TeacherCoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachercourse = TeacherCourse::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'teacher_courses'=> $teachercourse,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'teacher_id'=> 'required',
            'course_id'=> 'required',
        ]);

        try{
            $teachercourse = TeacherCourse::create([
                'teacher_id'=> $request->teacher_id,
                'course_id'=> $request->course_id,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'Teacher course created',
                'teacher_courses'=> $teachercourse,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher course failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $teachercourse = TeacherCourse::find($id);

        if(!$teachercourse){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher course not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'teacher_course'=> $teachercourse
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $teachercourse = TeacherCourse::find($id);

        if(!$teachercourse){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher course not found',
            ], 404);
        }

        $request->validate([
            'teacher_id'=> 'required',
            'course_id'=> 'required',
        ]);

        try{
            $teachercourse->update([
                'teacher_id'=> $request->teacher_id,
                'course_id'=> $request->course_id,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'Teacher course updated',
                'teacher_courses'=> $teachercourse,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher course failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $teachercourse = TeacherCourse::find($id);

        if(!$teachercourse){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher course not found',
            ], 404);
        }

        try{
            $teachercourse->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'Teacher course deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher course failed to be deleted',
            ], 500);
        }
    }
}
