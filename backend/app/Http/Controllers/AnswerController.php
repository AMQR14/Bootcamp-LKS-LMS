<?php

namespace App\Http\Controllers;

use App\Models\Answer;
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
            'answer'=> 'required',
            'is_correct'=> 'required|boolean',
        ]);

        try{
            $answer = Answer::create([
                'answer'=> $request->answer,
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
            'is_correct'=> 'required|boolean',
        ]);

        try{
            $answer->update([
                'answer'=> $request->answer,
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
