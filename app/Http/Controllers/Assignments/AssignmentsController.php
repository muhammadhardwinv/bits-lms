<?php

namespace App\Http\Controllers\Assignments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Http\Controllers\HelperController;
use App\Models\Assignments;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\RedirectResponse;


class AssignmentsController extends Controller
{

  public function create(Request $request)
  {
    return Inertia::render('assignments/newAssignments', [
      'role' => $request->user()->role,
    ]);
  }

  public function fetch()
  {
    $allAssignments = Assignments::all();
    // dd($allCourse[0]);
    return $allAssignments;
  }

  public function store(Request $request)
  {

    // dd($request);
    $data = $request->validate([
      'title' => ['required', 'max:64'],
      'description' => ['required', 'max:256'],
      'course_id' => ['required'],
      'class_id' => ['required'],
      'type' => ['nullable'],
      'attempt_limit' => ['nullable', 'integer'],
    ]);

    // dd($data);
    $newAssignmentId = HelperController::createUniqueId();
    $newSessionId = HelperController::createSecondaryId();
    $datetime = now()->addDays(7);

    Assignments::create([
      'id' => $newAssignmentId,
      'session_id' => $newSessionId,
      'title' => $data['title'],
      'description' => $data['description'],
      'course_id' => $data['course_id'],
      'class_id' => $data['class_id'],
      'type' => $data['type'] ?? 'Assignment',
      'due_date' => $datetime,
      'attempt_limit' => $data['attempt_limit'],
    ]);
    return back()->with('Success', 'CourseAdded ');
  }

  public function destroy($id): RedirectResponse
  {
    $assignments = Assignments::findOrFail($id);
    $assignments->delete();

    return redirect()->route('assignments')->with('success', 'Course deleted successfully');
  }

  public function edit($id)
  {
    $assignment = Assignments::findOrFail($id);
    return Inertia::render('assignments/editassignments', [
      'assignment' => $assignment,
    ]);
  }

  public function update(Request $request, $id)
  {
    $validated = $request->validate([
      'title' => 'required|string|max:64',
      'description' => 'required|string|max:256',
      'attempt_limit' => 'nullable|integer|min:1',
      'due_date' => 'nullable|date',
    ]);
    $assignment = Assignments::findOrFail($id);
    $assignment->update($validated);

    return back()->with('Success', 'Assignment updated successfully.');
  }

  // 'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
  public function show()
  {

    // dd(Auth::user());

    return Inertia::render('assignments', [
      'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
      'assignments' => Assignments::all(),
      'allCourse' => Course::all(),
    ]);
  }
}
