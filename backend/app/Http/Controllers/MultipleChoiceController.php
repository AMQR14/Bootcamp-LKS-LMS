<?php

namespace App\Http\Controllers;

use App\Models\MultipleChoice;
use Illuminate\Http\Request;

class MultipleChoiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $multipleChoices = MultipleChoice::all();
        
        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'multipleChoices'=> $multipleChoices,
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'choice_text'=> 'required',
            'is_correct'=> 'required|boolean',
        ]);

        try{
            $multipleChoice = MultipleChoice::create([
                'choice_text'=> $request->choice_text,
                'is_correct'=> $request->is_correct,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'multipleChoice created',
                'multipleChoices'=> $multipleChoice,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'multipleChoice failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $multipleChoice = MultipleChoice::find($id);

        if(!$multipleChoice){
            return response()->json([
                'success'=> false,
                'message'=> 'multipleChoice not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'multipleChoice'=> $multipleChoice,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $multipleChoice = MultipleChoice::find($id);

        if(!$multipleChoice){
            return response()->json([
                'success'=> false,
                'message'=> 'multipleChoice not found',
            ], 404);
        }

        $request->validate([
            'choice_text'=> 'required',
            'is_correct'=> 'required|boolean',
        ]);

        try{
            $multipleChoice->update([
                'choice_text'=> $request->choice_text,
                'is_correct'=> $request->is_correct,
            ]);
            return response()->json([
                'success'=> true,
                'message'=> 'multipleChoice updated',
                'multipleChoices'=> $multipleChoice,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'multipleChoice failed to be updated',
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $multipleChoice = MultipleChoice::find($id);

        if(!$multipleChoice){
            return response()->json([
                'success'=> false,
                'message'=> 'multipleChoice not found',
            ], 404);
        }

        try{
            $multipleChoice->delete();
            return response()->json([
                'success'=> true,
                'message'=> 'multipleChoice deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'multipleChoice failed to be deleted',
            ]);
        }
    }
}
