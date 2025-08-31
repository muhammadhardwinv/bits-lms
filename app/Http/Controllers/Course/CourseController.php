<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HelperController;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
  // Show all courses page with Inertia
  public function fetch(Request $request)
  {
    $courses = Course::all();

    return Inertia::render('courses', [
      'allCourse' => $courses,
      'user' => $request->user(),
    ]);
  }

  public function fetchTeacherCourses()
{
    $user = auth()->user();

    $courses = Course::where('teacher_id', $user->id)->get();

    return Inertia::render('teacher/dashboard', [
        'allCourse' => $courses,
    ]);
}



  // Show form to create new course
  public function create(Request $request)
  {
    return Inertia::render('courses/newcourses', [
      'role' => $request->user()->role,
    ]);
  }

  // Store new course in DB
  public function store(Request $request): RedirectResponse
  {
    $data = $request->validate([
    'name'        => ['required', 'max:64'],
    'description' => ['required', 'max:256'],
    'course_code' => ['nullable', 'max:16'],    // optional
    'credits'     => ['nullable', 'integer'],  // optional
    'schedule'    => ['nullable', 'max:64'],   // optional
    'max_students'=> ['nullable', 'integer'],  // optional
    'status'      => ['nullable', 'in:active,inactive'], // optional, example
]);

$newCourseId = 'CO' . HelperController::createUniqueId();

// Create the course
Course::create([
    'id'          => $newCourseId,
    'name'        => $data['name'],
    'description' => $data['description'],
    'teacher_id'  => $request->user()->id,
    'course_code' => $data['course_code'] ?? null,
    'credits'     => $data['credits'] ?? 0,
    'schedule'    => $data['schedule'] ?? null,
    'max_students'=> $data['max_students'] ?? 30,
    'status'      => $data['status'] ?? 'active',
]);


    return back()->with('success', 'Course added successfully.');
  }

  // Show single course with sessions and auth user info
  public function show(string $id)
  {
    $course = Course::with('course_sessions')->findOrFail($id);

    return Inertia::render('sessions', [
      'courseId' => $course->id,
      'course' => [
        'id' => (string) $course->id,
        'name' => $course->name,
        'description' => $course->description,
        'teacher_id' => (string) $course->teacher_id,
      ],
      'sessions' => $course->courseSessions,
      'auth' => ['user' => Auth::user()],
    ]);
  }

  // Show edit form for course
  public function edit(string $id)
  {
    $course = Course::findOrFail($id);

    return Inertia::render('courses/editcourses', [
      'course' => $course,
    ]);
  }

  // Update course info
  public function update(Request $request, string $id): RedirectResponse
  {
    $validated = $request->validate([
      'name' => 'required|string|max:64',
      'description' => 'nullable|string|max:256',
    ]);

    $course = Course::findOrFail($id);
    $course->update($validated);

    return back()->with('success', 'Course updated successfully.');
  }

  // Delete course by ID
  public function destroy($id)
{
    $course = Course::findOrFail($id);

if (method_exists($course, 'classrooms')) {
    try {
        $course->classrooms()->delete();
    } catch (\Exception $e) {
        // Ignore if relation/column doesn’t exist
    }
}

$course->delete();
    // Now delete the course
    $course->delete();

    return redirect()->back()->with('success', 'Course and its classrooms deleted successfully.');
}


  // Static helper method to get course by ID
  public static function getCourseByCourseId(string $courseId): Course
  {
    return Course::where('id', $courseId)->firstOrFail();
  }
}
