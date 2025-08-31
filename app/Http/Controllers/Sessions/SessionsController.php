<?php

namespace App\Http\Controllers\Sessions;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HelperController;
use App\Models\Classes;
use App\Models\CourseSession;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionsController extends Controller
{
    /**
     * Show the form to create a new session.
     */
    public function create(Request $request, $courseId)
{
    // Find the classroom associated with the courseId
    $classes = Classes::where('course_id', $courseId)->firstOrFail();

    return Inertia::render('sessions/createSessions', [
        'auth' => [
            'user' => $request->user(),
        ],
        'courseId' => $courseId,
        'classroomId' => $classroom->id,
        'teacher_id' => $classroom->teacher_id,
    ]);
}

    /**
     * Fetch all sessions (debugging only).
     */
    public function fetch()
    {
        $allSessions = CourseSession::all();
        return $allSessions;
    }

    /**
     * Store a new session in database.
     */
    public function store(Request $request, $classroomId)
    {
        $data = $request->validate([
            'title' => ['required', 'max:64'],
            'description' => ['required', 'max:256'],
            'schedule_date' => ['required', 'date'],
            'course_id' => ['required', 'exists:courses,id'],
        ]);

        $newSessionId = HelperController::createUniqueId();

        CourseSession::create([
            'id' => $newSessionId,
            'title' => $data['title'],
            'description' => $data['description'],
            'schedule_date' => $data['schedule_date'],
            'course_id' => $data['course_id'],
            'classroom_id' => $classroomId,
        ]);

        return back()->with('success', 'Session added successfully.');
    }

    /**
     * Delete a session.
     */
    public function destroy($id): RedirectResponse
    {
        $courseSession = CourseSession::findOrFail($id);
        $courseSession->delete();

        return redirect('/sessions')->with('success', 'Session deleted successfully.');
    }

    /**
     * Show form to edit a session.
     */
    public function edit($id)
    {
        $courseSession = CourseSession::findOrFail($id);
        return Inertia::render('sessions/editSessions', [
            'session' => $courseSession,
        ]);
    }

    /**
     * Update session data.
     */
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:64',
            'description' => 'nullable|string',
        ]);

        $courseSession = CourseSession::findOrFail($id);
        $courseSession->update($validated);

        return back()->with('success', 'Session updated successfully.');
    }

    /**
     * Show a single session.
     */
    public function show($id)
    {
        $courseSession = CourseSession::findOrFail($id);

        return Inertia::render('sessions/showSession', [
            'sessionId' => $courseSession->id,
            'session' => [
                'id' => (string) $courseSession->id,
                'title' => $courseSession->title,
                'description' => $courseSession->description,
                'teacher_id' => (string) $courseSession->teacher_id,
            ],
            'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
        ]);
    }
}
