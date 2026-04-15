<?php

namespace App\Http\Controllers;

use App\Models\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $questions = Question::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'questions'=> $questions,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'question'=> 'required',
        ]);

        try{
            $question = Question::create([
                'question'=> $request->question,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'question created',
                'question'=> $question,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'question failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $question = Question::find($id);

        if(!$question){
            return response()->json([
                'success'=> false,
                'message'=> 'question not found',
            ], 404);
        }

        return response()->json([
                'success'=> true,
                'message'=> 'Success',
                'question'=> $question,
            ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $question = Question::find($id);

        if(!$question){
            return response()->json([
                'success'=> false,
                'message'=> 'question not found',
            ], 404);
        }

        $request->validate([
            'question'=> 'required',
        ]);

        try{
            $question->update([
                'question'=> $request->question,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'question updated',
                'question'=> $question,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'question failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $question = Question::find($id);

        if(!$question){
            return response()->json([
                'success'=> false,
                'message'=> 'question not found',
            ], 404);
        }

        try{
            $question->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'question deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'question failed to be deleted',
            ], 500);
        }
    }
}
