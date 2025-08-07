<?php
namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Course;
use App\Http\Controllers\HelperController;
use Illuminate\Http\RedirectResponse;


class CourseController extends Controller
{

  public function create(Request $request)
  {
    return Inertia::render('courses/newcourses', [
      'role' => $request->user()->role,
    ]);
  }

  public function fetch()
  {
      $allCourse = Course::all();
      // dd($allCourse[0]);
      return $allCourse;
    }

  public function store(Request $request)
  {
    // dd($request);
    $data = $request->validate([
      'name'        => ['required', 'max:64'],
      'description' => ['required', 'max:256'],
      ]);

    // dd($data);

    $newCourseId = HelperController::createUniqueId();
      Course :: create([
        'id' => $newCourseId,
        'name' => $data['name'],
        'description' => $data['description'],
        'teacher_id' => 1,
      ]);
    return back()->with('Success', 'CourseAdded ');
    }

  public function destroy($id): RedirectResponse
  {
    $course = Course::findOrFail($id);
    $course->delete();

    return redirect('/courses')->with('success', 'Course deleted successfully.');
  }

  public function edit($id)
  {
    $course = Course::findOrFail($id);
    return Inertia::render('courses/editcourses', [
      'course' => $course,
    ]);
  }

  public function update(Request $request, $id)
  {
    $validated = $request->validate([
      'name' => 'required|string|max:64',
      'description' => 'nullable|string',
    ]);
    $course = Course::findOrFail($id);
    $course->update($validated);

    return back()->with('Success', 'Course updated successfully.');
  }

  // 'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
  public function show($id)
  {
    $course = \App\Models\Course::findOrFail($id);

    return Inertia::render('selected-Course', [
      'courseId' => $course->id,
      'course' => [
        'id' => (string) $course->id,
        'name' => $course->name,
        'description' => $course->description,
        'teacher_id' => (string) $course->teacher_id,
      ],
      'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
    ]);
  }
}
