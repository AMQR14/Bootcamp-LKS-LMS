<?php

namespace App\Http\Controllers;

use App\Models\AnswerMultipleChoice;
use Illuminate\Http\Request;

class AnswerMulController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $answermul = AnswerMultipleChoice::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'answer'=> $answermul,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'question_id'=> 'required',
            'student_id'=> 'required',
            'multiple_choice_id'=> 'required'
        ]);

        try{
            $answermul = AnswerMultipleChoice::create([
                'question_id'=> $request->question_id,
                'student_id'=> $request->student_id,
                'multiple_choice_id'=> $request->multiple_choice_id,
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Answer mul created successfully ',
                'answer'=> $answermul,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer mul failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $answermul = AnswerMultipleChoice::find($id);

        if(!$answermul){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'answer'=> $answermul,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $answermul = AnswerMultipleChoice::find($id);

        if(!$answermul){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer not found',
            ], 404);
        }

        $request->validate([
            'question_id'=> 'required',
            'student_id'=> 'required',
            'multiple_choice_id'=> 'required'
        ]);

        try{
            $answermul->update([
                'question_id'=> $request->question_id,
                'student_id'=> $request->student_id,
                'multiple_choice_id'=> $request->multiple_choice_id,
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Answer mul updated successfully ',
                'answer'=> $answermul,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer mul failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $answermul = AnswerMultipleChoice::find($id);

        if(!$answermul){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer not found',
            ], 404);
        }

        try{
            $answermul->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'Answer mul deleted successfully',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer mul failed to be deleted',
            ], 500);
        }
    }
}
