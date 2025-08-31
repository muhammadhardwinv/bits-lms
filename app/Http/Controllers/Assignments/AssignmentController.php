<?php

namespace App\Http\Controllers\Assignments;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\CourseSession;
use App\Models\Assignment;
use App\Http\Controllers\HelperController;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\RedirectResponse;


class AssignmentController extends Controller
{

  public function create(Request $request)
  {
    return Inertia::render('assignment-form', [
      'role' => $request->user()->role,
      'courses' => Course::all(),
      'sessions' => CourseSession::all(),
    ]);
  }

  public function fetch()
  {
    return Assignment::with(['course', 'session'])->get();
  }
public function store(Request $request)
{
    // dd('halo');
    $data = $request->validate([
        'session_id'    => ['required', 'string'],
        'course_id'     => ['required', 'string', 'max:10'],
        'title'         => ['required', 'max:150'],
        'description'   => ['nullable', 'string'],
        'type'          => ['nullable', 'in:Essay,Written Report,Short Answer,True/False,Fill in the Blank'],
        'due_date'      => ['nullable', 'date'],
        'attempt_limit' => ['nullable', 'integer', 'min:1', 'max:3'],
        'max_points'    => ['nullable', 'string', 'min:1'],
        'instructions'  => ['nullable', 'string'],
        'attachment_file' => ['nullable', 'file', 'max:15360', 'mimes:pdf,doc,docx,ppt,pptx,jpg,png'],
    ]);

    $attachmentUrl = null;
    if ($request->hasFile('attachment_file')) {
        $path = $request->file('attachment_file')->store('assignments', 'public');
        $attachmentUrl = '/storage/' . $path;
    }

    $assignment = Assignment::create([
        'session_id'    => $data['session_id'],
        'course_id'     => $data['course_id'],
        'title'         => $data['title'],
        'description'   => $data['description'] ?? null,
        'type'          => $data['type'] ?? null,
        'due_date'      => $data['due_date'] ?? now()->addDays(7),
        'attempt_limit' => $data['attempt_limit'] ?? 1,
        'max_points'    => $data['max_points'] ?? 100,
        'instructions'  => $data['instructions'] ?? null,
        'attachment_url'=> $attachmentUrl,
    ]);

    /**
     * ✅ Append log to JSON file
     */
    $reportFile = storage_path('reports/assignment_reports.json');
    $reports = [];

    if (file_exists($reportFile)) {
        $reports = json_decode(file_get_contents($reportFile), true) ?: [];
    }

    $reports[] = [
        'id'           => $assignment->id,
        'session_id'   => $assignment->session_id,
        'course_id'    => $assignment->course_id,
        'title'        => $assignment->title,
        'created_at'   => now()->toDateTimeString(),
        'status'       => 'created',
    ];

    // Ensure directory exists
    if (!file_exists(dirname($reportFile))) {
        mkdir(dirname($reportFile), 0755, true);
    }

    file_put_contents($reportFile, json_encode($reports, JSON_PRETTY_PRINT));

    return redirect()->route('assignments.index')
        ->with('success', 'Assignment created successfully!');
}


  public function destroy($id): RedirectResponse
  {
    $assignment = Assignment::findOrFail($id);
        $assignment->delete();

        return redirect()->route('assignments.index')
            ->with('success', 'Assignment deleted successfully');
  }

  public function edit($id)
  {
    $assignment = Assignment::findOrFail($id);
        return Inertia::render('assignments/editassignments', [
            'assignment' => $assignment,
        ]);
  }

  public function update(Request $request, $id)
  {
    $validated = $request->validate([
            'title'         => 'required|string|max:150',
            'description'   => 'nullable|string',
            'attempt_limit' => 'nullable|integer|min:1|max:3',
            'due_date'      => 'nullable|date',
        ]);

        $assignment = Assignment::findOrFail($id);
        $assignment->update($validated);

        return back()->with('success', 'Assignment updated successfully.');
  }

  // 'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
  public function show()
  {
return Inertia::render('assignments', [
            'auth'        => ['user' => Auth::user()],
            'assignments' => Assignment::with(['course', 'session'])->get(),
            'allCourse'   => Course::all(),
        ]);
  }
}
