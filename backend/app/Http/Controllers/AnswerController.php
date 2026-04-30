<?php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\AnswerMultipleChoice;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $answers = Answer::all();
        
        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'answers'=> $answers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'answer'=> 'required', // {} itu pass
            'answer.*'=> 'required', // {} itu error
            'question_id'=> 'required',
            'student_id'=> 'required',
            // 'is_correct'=> 'required|boolean',
        ]);

        try{
            $answer = Answer::create([
                'answer'=> $request->answer,
                'question_id'=> $request->question_id,
                'student_id'=> $request->student_id,
                'is_correct'=> $request->is_correct,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'Answer created',
                'answers'=> $answer,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer failed to be created',
            ]);
        }
    }

    public function bulkStore(Request $request)
    {
        $request->validate([
            'student_id'=> 'required',
            'essays'=> 'array',
            'essays.*.question_id'=> 'required',
            'essays.*.answer'=> 'required',
            'muls'=> 'array',
            'muls.*.question_id'=> 'required',
            'muls.*.multiple_choice_id'=> 'required',
        ]);

        try{
            foreach ($request->essays as $essay) {
                Answer::create([
                    'question_id'=> $essay['question_id'],
                    'answer'=> $essay['answer'],
                    'student_id'=> $request->student_id,
                ]);
            }

            foreach ($request->muls as $muls) {
                AnswerMultipleChoice::create([
                    'question_id'=> $muls['question_id'],
                    'multiple_choice_id'=> $muls['multiple_choice_id'],
                    'student_id'=> $request->student_id
                ]);
            }

            return response()->json([
                'success'=> true,
                'Message'=> 'Answer successfully stored',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'Message'=> 'Failed to store answer',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $answer = Answer::find($id);

        if(!$answer){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'answer'=> $answer,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $answer = Answer::find($id);

        if(!$answer){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer not found',
            ], 404);
        }

        $request->validate([
            'answer'=> 'required',
            'question_id'=> 'required',
            'student_id'=> 'required',
            'is_correct'=> 'required|boolean',
        ]);

        try{
            $answer->update([
                'answer'=> $request->answer,
                'question_id'=> $request->question_id,
                'student_id'=> $request->student_id,
                'is_correct'=> $request->is_correct,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'Answer updated',
                'answers'=> $answer,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer failed to be updated',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $answer = Answer::find($id);

        if(!$answer){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer not found',
            ], 404);
        }

        try{
            $answer->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'Answer deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Answer failed to be deleted',
            ]);
        }
    }
}
