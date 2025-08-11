<?php

namespace App\Http\Controllers\Classroom;

use App\Models\Classroom;
use App\Models\Sessions;
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
        $classroom = Classroom::all();

        return Inertia::render('classroom/classroom', [
            'allClassroom' => $classroom,
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
    $classroomId = HelperController::createUniqueId();

    $data = $request->validate([
        'name' => ['required', 'max:64'],
        'course_id' => ['required', 'exists:courses,id'],
        'teacher_id' => ['required', 'exists:users,id'],
    ]);

    $data['id'] = $classroomId;

    Classroom::create($data);

    return redirect()->route('admin.classroom.index')->with('success', 'Classroom created successfully.');
}

    
    public function edit($id)
    {
        $classroom = Classroom::findOrFail($id);

        return Inertia::render('classroom/editClassroom', [
            'classroom' => $classroom,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'name' => ['required', 'max:64'],
            'course_id' => ['required', 'exists:courses,id'],
            'teacher_id' => ['required', 'exists:users,id'],
        ]);

        $classroom = Classroom::findOrFail($id);
        $classroom->update($data);

        return Inertia::render('classroom/classroom', [
            'classroom' => $classroom,
        ]);
    }

    public function index()
    {
        $classrooms = Classroom::all();

        return Inertia::render('classroom/classroom', [
            'allClassrooms' => $classrooms,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    // Show one specific classroom
    public function show($id)
    {
        $classroom = Classroom::with(['course', 'sessions'])->findOrFail($id);

        return Inertia::render('classroom/selectedClassroom', [
            'classroomId' => $classroom->id,
            'classroom' => $classroom,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function sessions(): HasMany
    {
        return $this->hasMany(Sessions::class, 'classroom_id');
    }
}
