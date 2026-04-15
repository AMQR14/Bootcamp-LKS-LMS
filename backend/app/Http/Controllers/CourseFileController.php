<?php

namespace App\Http\Controllers;

use App\Models\CourseFile;
use Illuminate\Http\Request;

class CourseFileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $coursefiles = CourseFile::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'course_files'=> $coursefiles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'file_name'=> 'required',
            'file_path'=> 'required',
            'is_available'=> 'required|boolean',
        ]);

        try{
            $coursefile = CourseFile::create([
                'file_name'=> $request->file_name,
                'file_path'=> $request->file_path,
                'is_available'=> $request->is_available,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'Course File created',
                'course_files'=> $coursefile,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Course file failed to be created',

            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $coursefile = CourseFile::find($id);

        if(!$coursefile){
            return response()->json([
                'success'=> false,
                'message'=> 'Course file not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'course_file'=> $coursefile,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $coursefile = CourseFile::find($id);

        if(!$coursefile){
            return response()->json([
                'success'=> false,
                'message'=> 'Course file not found',
            ], 404);
        }

        $request->validate([
            'file_name'=> 'required',
            'file_path'=> 'required',
            'is_available'=> 'required|boolean',
        ]);

        try{
            $coursefile->update([
                'file_name'=> $request->file_name,
                'file_path'=> $request->file_path,
                'is_available'=> $request->is_available,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'Course File updated',
                'course_files'=> $coursefile,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Course file failed to be updated',

            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $coursefile = CourseFile::find($id);

        if(!$coursefile){
            return response()->json([
                'success'=> false,
                'message'=> 'Course file not found',
            ], 404);
        }

        try{
            $coursefile->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'Course File deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Course file failed to be deleted',

            ], 500);
        }
    }
}
