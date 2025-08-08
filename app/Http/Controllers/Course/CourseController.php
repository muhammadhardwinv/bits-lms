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
    ]);

    $newCourseId = 'CO' . HelperController::createUniqueId();

    Course::create([
      'id' => $newCourseId,
      'name' => $data['name'],
      'description' => $data['description'],
      'teacher_id' => $request->user()->id,
    ]);

    return back()->with('success', 'Course added successfully.');
  }

  // Show single course with sessions and auth user info
  public function show(string $id)
  {
    $course = Course::with('sessions')->findOrFail($id);

    return Inertia::render('sessions', [
      'courseId' => $course->id,
      'course' => [
        'id' => (string) $course->id,
        'name' => $course->name,
        'description' => $course->description,
        'teacher_id' => (string) $course->teacher_id,
      ],
      'sessions' => $course->sessions,
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
  public function destroy(string $id): RedirectResponse
  {
    $course = Course::findOrFail($id);

    // Delete related sessions and assignments manually
    // $course->sessions()->delete();
    // $course->assignments()->delete();

    $course->delete();

    return redirect('/courses')->with('success', 'Course deleted successfully.');
  }

  // Static helper method to get course by ID
  public static function getCourseByCourseId(string $courseId): Course
  {
    return Course::where('id', $courseId)->firstOrFail();
  }
}
