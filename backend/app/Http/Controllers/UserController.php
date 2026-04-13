<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller

{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        // $teacher = User::where('role', 'teacher')->get();
        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'users'=> $users
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email'=> 'required|email',
            'password'=> 'required|min:6',
            'role'=> 'required',
        ]);

        try{
            $user = User::create([
                'email'=> $request->email,
                'password'=> bcrypt($request->email),
                'role'=> $request->role
            ]);
    
            return response()->json([
                'success'=> true,
                'message'=> 'User created',
                'data'=> $user
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed to create user',
            ],500);
        }
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'message'=> 'User not found'
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'user'=> $user
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'message'=> 'User not found'
            ], 404);
        }

        $request->validate([
            'email'=> 'required',
            'password'=> 'required',
            'role'=> 'required',
        ]);

        try{
            $user->update([
                'email'=> $request->email,
                'password'=> Hash::make($request->email),
                'role'=> $request->role
            ]);
    
            return response()->json([
                'success'=> true,
                'message'=> 'User updated',
                'data'=> $user
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed to update user',
            ],500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if(!$user){
            return response()->json([
                'message'=> 'User not found'
            ], 404);
        }

        try{
            $user->delete();
    
            return response()->json([
                'success'=> true,
                'message'=> 'User deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Failed to delete user',
            ],500);
        }
    }
}
