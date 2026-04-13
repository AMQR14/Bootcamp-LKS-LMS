<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teachers = Teacher::all();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'teachers'=> $teachers,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name'=> 'required',
            'nip' => 'required',
            'nik' => 'required',
            'nidn' => 'required',
            'email' => 'required|email',
            'date_of_birth' => 'required|date',
        ]);

        try{
            $teacher = Teacher::create([
                'name' => $request->name,
                'nip' => $request->nip,
                'nik' => $request->nik,
                'nidn' => $request->nidn,
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
                'joined_at'=> now()
            ]);

            $user = User::create([
                'email' => $request->email,
                'password' => bcrypt($request->email),
                'role'=> 'teacher'
            ]);
            
            $teacher->update([
                'user_id' => $user->id 
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Teacher created',
                'teachers'=> $teacher,
            ]);  
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher failed to be created',
            ], 500);  
        }      
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $teacher = Teacher::find($id);

        if(!$teacher){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'teacher'=> $teacher,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $teacher = Teacher::find($id);

        if(!$teacher){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher not found',
            ], 404);
        }

        $request->validate([
            'name'=> 'required',
            'nip' => 'required',
            'nik' => 'required',
            'nidn' => 'required',
            'email' => 'required|email',
            'date_of_birth' => 'required|date',
        ]);

        try{
            $teacher->update([
                'name' => $request->name,
                'nip' => $request->nip,
                'nik' => $request->nik,
                'nidn' => $request->nidn,
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
            ]);

            $teacher->user()->update([
                'email' => $request->email
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Teacher updated',
                'teachers'=> $teacher,
            ]);

        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $teacher = Teacher::find($id);

        if(!$teacher){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher not found',
            ], 404);
        }

        try{
            $teacher->delete();
            $teacher->user()->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'Teacher deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Teacher failed to be deleted',
            ]);
        }
            
        
    }
}
