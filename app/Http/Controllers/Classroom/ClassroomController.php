<?php

namespace App\Http\Controllers\Classroom;

use App\Models\Classes;
use App\Models\CourseSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Http\Controllers\HelperController;

class ClassroomController extends Controller
{
    public function fetch(Request $request)
    {
        $classroom = Classes::all();

        return Inertia::render('classroom/classroom', [
            'allClassrooms' => $classroom,
            'user' => $request->user(),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('classroom/newclassroom', [
            'role' => $request->user()->role,
        ]);
    }

public function store(Request $request)
    {
        $validated = $request->validate([
            // 'id'         => 'required|string|max:10',  // since your PK is string
            'name'       => 'required|string|max:100',
            'grade_level'=> 'nullable|string|max:20',
            'capacity'   => 'required|integer',
            'course_id'  => 'required|exists:courses,id',
            'teacher_id' => 'required|exists:users,id',
        ]);

        $classroom = Classes::create([
            // 'id'         => $validated['id'],         // manual string PK
            'name'       => $validated['name'],
            'grade_level'=> $validated['grade_level'] ?? null,
            'capacity'   => $validated['capacity'],
            'course_id'  => $validated['course_id'],  // dynamic
            'teacher_id' => $validated['teacher_id'], // dynamic
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
        'message' => 'Class created successfully!',
        'data'    => $classroom->load(['course', 'teacher'])
        ]);
    }


    public function edit($id)
    {
        $classroom = Classes::findOrFail($id);

        return Inertia::render('classroom/editClassroom', [
            'classroom' => $classroom,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function update(Request $request, $id)
{
    // $data = $request->validate([
    //     'name' => ['required', 'max:64'],
    //     'course_id' => ['required', 'exists:courses,id'],
    //     'teacher_id' => ['required', 'exists:users,id'],
    // ]);
        $data = $request->validate([
        'name' => ['required', 'max:64'],
        'course_id' => ['required', 'exists:courses,id'],
        'teacher_id' => ['required', 'exists:users,id'], // works if teacher_id is string
    ]);

    $classroom = Classes::findOrFail($id);
    $classroom->update($data);

    return redirect('/classroom')
    ->with('success', 'Classroom updated successfully.');

}
    public function index()
{
    $classrooms = Classes::with(['course','teacher','sessions'])->get();

    return Inertia::render('classroom/classroom', [
        'allClassrooms' => $classrooms,
        'auth' => ['user' => Auth::user()],
    ]);
}
    // Show one specific classroom

    public function show(string $id)
{
    $classroom = Classes::with(['course', 'sessions', 'teacher'])->findOrFail($id);

    // Fetch schedule_date only for this classes's sessions
    $scheduleDates = CourseSession::where('course_id', $classroom->course_id)
    ->pluck('start_datetime');



                            //  dd($classroom->toArray());
    return Inertia::render('classroom/selectedClassroom', [
        'classroomId' => $classroom->id,
        'classroom' => $classroom,
        'auth' => ['user' => Auth::user()],
        'schedule_dates' => $scheduleDates,
    ]);
}

public function slideshow($courseId)
{
    $classroom = Classes::with(['teacher', 'sessions', 'assignments'])
        ->where('course_id', $courseId)
        ->get();

    return Inertia::render('slideshow', [
        'courseId'   => $courseId,
        'classroom' => $classroom,
    ]);
}

    public function destroy(string $id): RedirectResponse{
        $classroom = Classes::findOrFail($id);
        $classroom->sessions()->delete();
        $classroom->delete();

        return redirect('classroom') ->with('success', 'Classroom deleted successfully.');
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Sessions::class, 'classroom_id');
    }
}
