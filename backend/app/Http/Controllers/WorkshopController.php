<?php

namespace App\Http\Controllers;

use App\Models\Workshop;
use Illuminate\Http\Request;

class WorkshopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $workshops = Workshop::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'classes'=> $workshops
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'description=> required'
        ]);

        try{
            $workshop = Workshop::create([
                'name'=> $request->name,
                'description'=> $request->description
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Class created',
                'class'=> $workshop,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed to create class',
            ], 500);
        }     
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workshop = Workshop::find($id);

        if(!$workshop){
            return response()->json([
                'success'=> false,
                'message'=> 'Class not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> "Success",
            'class'=> $workshop,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $workshop = Workshop::find($id);

        if(!$workshop){
            return response()->json([
                'success'=> false,
                'message'=> 'Class not found',
            ], 404);
        }

        try{
            $workshop->update([
                'name'=> $request->name,
                'description'=> $request->description
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Class updated',
                'class'=> $workshop,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed to update class',
            ], 500);
        }  
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $workshop = Workshop::find($id);

        if(!$workshop){
            return response()->json([
                'success'=> false,
                'message'=> 'Class not found',
            ], 404);
        }

        try{
            $workshop->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'Class deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed to delete class',
            ], 500);
        }  
    }
}
