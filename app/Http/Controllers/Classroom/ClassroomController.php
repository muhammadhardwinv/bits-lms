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
    \Log::info('Store method hit.');

    $classroomId = HelperController::createUniqueId(); 
    $classPrefix = 'CS';
    $classPostfix = 'LEC';
    $newClassroomId = $classPrefix . $classroomId . '-' . $classPostfix;

    \Log::info('Generated ID: ' . $newClassroomId);

    $data = $request->validate([
        'name' => ['required', 'max:64'],
        'course_id' => ['required', 'exists:courses,id'],
        'teacher_id' => ['required', 'exists:users,id'],
    ]);

    $data['id'] = $newClassroomId;

    try {
        $classroom = Classroom::create($data);

        \Log::info('Classroom created: ' . $classroom->id);

        return response()->json([
            'success' => true,
            'redirect_url' => route('classroom.show', ['id' => $classroom->id]),
        ]);
    } catch (\Exception $e) {
        \Log::error('Classroom creation failed: ' . $e->getMessage());

        return response()->json([
            'success' => false,
            'message' => 'Internal server error.',
            'error' => $e->getMessage(),
        ], 500);
    }
}

public function index()
{
    $classrooms = Classroom::all();

    // dd($classrooms);
    return Inertia::render('classroom/classroom', [
        'allClassrooms' => $classrooms,
        'auth' => ['user' => Auth::user()],
    ]);
}
// Show one specific classroom
public function show($id)
{
    $classroom = Classroom::with(['course', 'sessions'])->findOrFail($id);

    return Inertia::render('classroom/selectedClassroom', [ // ✅ changed here
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
