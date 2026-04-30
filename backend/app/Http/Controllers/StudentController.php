<?php

namespace App\Http\Controllers;

use App\Models\Exam;
use App\Models\Student;
use App\Models\User;
use App\Models\Workshop;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $students = Student::all();
        $students = Student::with('workshop')->get();

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'students'=> $students,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'nis' => 'required',
            'nisn' => 'required', 
            'nik' => 'required',
            'email' => 'required|email|unique:users',
            'date_of_birth' => 'required|date',
            'workshop_id' => 'required',
        ]);

        try{
            $student = Student::create([
                'name' => $request->name,
                'nis' => $request->nis,
                'nisn' => $request->nisn,
                'nik' => $request->nik,
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
                'workshop_id' => $request->workshop_id,
                'joined_at' => now(),
            ]);

            $user = User::create([
                'email'=> $request->email,
                'password'=> bcrypt($request->password),
                'role'=> 'student',
            ]);

            $student->update([
                'user_id'=> $user->id
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Student created',
                'students'=> $student,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Student failed to be created',
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $student = Student::with('workshop')->find($id);

        if(!$student){
            return response()->json([
                'success'=> false,
                'message'=> 'Student not found',
            ], 404);
        }

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'student'=> $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $student = Student::find($id);

        if(!$student){
            return response()->json([
                'success'=> false,
                'message'=> 'Student not found',
            ], 404);
        }

        $request->validate([
            'name' => 'required',
            'nis' => 'required', 
            'nisn' => 'required', 
            'nik' => 'required',
            'email' => 'required|email|unique:students,email,' . $student->id,
            'date_of_birth' => 'required|date',
            'workshop_id' => 'required',
        ]);

        try{
            $student->update([
                'name' => $request->name,
                'nis' => $request->nis,
                'nisn' => $request->nisn,
                'nik' => $request->nik,
                'email' => $request->email,
                'date_of_birth' => $request->date_of_birth,
                'workshop_id' => $request->workshop_id,
                'joined_at' => now(),
            ]);

            $student->user()->update([
                'email'=> $request->email
            ]);

            return response()->json([
                'success'=> true,
                'message'=> 'Student updated',
                'students'=> $student,
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Student failed to be updated',
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $student = Student::find($id);

        if(!$student){
            return response()->json([
                'success'=> false,
                'message'=> 'Student not found',
            ], 404);
        }

        try{
            $student->delete();
            $student->user()->delete();

            return response()->json([
                'success'=> true,
                'message'=> 'Student deleted',
            ]);
        }catch(\Exception $e){
            return response()->json([
                'success'=> false,
                'message'=> 'Student failed to be deleted',
            ], 500);
        }
    }

    public function examData(Request $request, string $id)
    {
        $exams = [];
        //Cek answer dari siswa (kalau udah ada answer HARUSNY sudah selesai examnya well harusnya)
        $examId = Student::with(['answer.question','answer_mul.question'])
        ->whereHas('answer.question')
        ->orWhereHas('answer_mul.question')
        ->find($id);
        foreach ($examId->answer as $key => $value) {
            $exams[] = $value->question->exam_id ; // ambil exam idnya
        }

        foreach ($examId->answer_mul as $key => $value) {
            $exams[] = $value->question->exam_id ; // ambil exam idnya
        }
        
        $exams = Exam::whereIn('id', $exams)->get(); // ambil data exam

        return response()->json([
            'success'=> true,
            'message'=> 'Success',
            'answer'=> $exams,
        ]);

    }
}
