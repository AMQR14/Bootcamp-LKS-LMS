<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use Illuminate\Http\Request;

class StatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $stats = [
            'users' => User::count(),
            'teachers' => Teacher::count(),
            'students' => Student::count(),
            'courses' => Course::count(),
        ];

        return response()->json([
            'stats'=> $stats
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function studentsByYear()
    {
        $data = Student::whereBetween('joined_at', ['2022-01-01', '2026-12-31'])
            ->selectRaw('YEAR(joined_at) as year, COUNT(*) as total')
            ->groupBy('year')
            ->orderBy('year')
            ->get();

        return response()->json($data);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
