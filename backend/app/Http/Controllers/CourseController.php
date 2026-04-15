<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'courses'=> $courses,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
        ]);

       try{
            $courses = Course::create([
                'name'=> $request->name,
                'workshop_id'=> $request->workshop_id
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Course created',
                'courses'=> $courses,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Course failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $course = Course::find($id);

        if(!$course){
            return response()->json([
                'success'=> false,
                'message'=> 'Course not found',
            ], 404);
        }

        return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'course'=> $course
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $course = Course::find($id);

        if(!$course){
            return response()->json([
                'success'=> false,
                'message'=> 'Course not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            
        ]);

       try{
            $course->update([
                'name'=> $request->name,
                'workshop_id'=> $request->workshop_id
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Course updated',
                'courses'=> $course,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Course failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $course = Course::find($id);

        if(!$course){
            return response()->json([
                'success'=> false,
                'message'=> 'Course not found',
            ], 404);
        }

       try{
            $course->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'Course deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Course failed to be deleted',
            ], 500);
        }
    }
}
