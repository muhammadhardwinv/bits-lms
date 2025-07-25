<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth; 

class AttendanceController extends Controller
{
    public function index($courseId)
    {
        $user = Auth::user();

        // Dummy student list (replace with DB later)
        // $students = [
        //     ['id' => 1, 'name' => 'Ali'],
        //     ['id' => 2, 'name' => 'Budi'],
        //     ['id' => 3, 'name' => 'Citra'],
        // ];

        return Inertia::render('Attendance/Index', [
            'user' => $user,
            'courseId' => $courseId
            // 'students' => $students,
        ]);
    }
}
