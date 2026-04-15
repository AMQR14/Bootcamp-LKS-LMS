<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use Illuminate\Http\Request;

class ExamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $exams = Exam::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'exams'=> $exams,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'start_time'=> 'required|date_format:H:i:s',
            'end_time'=> 'required|date_format:H:i:s'
        ]);

        try{
            $exam = Exam::create([
                'name'=> $request->name,
                'start_time'=> $request->start_time,
                'end_time'=> $request->end_time
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'exam created',
                'exam'=> $exam,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'exam failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $exam = Exam::find($id);

        if(!$exam){
            return response()->json([
                'success'=> false,
                'message'=> 'Exam not found',
            ], 404);
        }

        return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'exam'=> $exam,
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $exam = Exam::find($id);

        if(!$exam){
            return response()->json([
                'success'=> false,
                'message'=> 'Exam not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            'start_time'=> 'required|date_format:H:i:s',
            'end_time'=> 'required|date_format:H:i:s'
        ]);

        try{
            $exam->update([
                'name'=> $request->name,
                'start_time'=> $request->start_time,
                'end_time'=> $request->end_time
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'exam updated',
                'exam'=> $exam,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'exam failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $exam = Exam::find($id);

        if(!$exam){
            return response()->json([
                'success'=> false,
                'message'=> 'Exam not found',
            ], 404);
        }

        try{
            $exam->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'exam deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'exam failed to be deleted',
            ], 500);
        }
    }
}
