<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // ✅ THIS LINE IS REQUIRED

class AttendanceController extends Controller
{
    public function index($courseId)
    {
        // Dummy student list (replace with DB later)
        $students = [
            ['id' => 1, 'name' => 'Ali'],
            ['id' => 2, 'name' => 'Budi'],
            ['id' => 3, 'name' => 'Citra'],
        ];

        return Inertia::render('Attendance/Index', [
            'courseId' => $courseId,
            'students' => $students,
        ]);
    }
}
