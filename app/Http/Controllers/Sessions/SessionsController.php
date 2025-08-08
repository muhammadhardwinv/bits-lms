<?php

namespace App\Http\Controllers\Sessions;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HelperController;
use App\Models\Sessions;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SessionsController extends Controller
{
    /**
     * Show the form to create a new session.
     */
    public function create(Request $request)
    {
        return Inertia::render('sessions/createSessions', [
            'role' => $request->user()->role,
            'courseId' => $request->query('course_id'),
        ]);
    }

    /**
     * Fetch all sessions (debugging only).
     */
    public function fetch()
    {
        $allSessions = Sessions::all();
        // Remove dd() in production
        dd($allSessions[0]);
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

    Sessions::create([
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
        $session = Sessions::findOrFail($id);
        $session->delete();

        return redirect('/sessions')->with('success', 'Session deleted successfully.');
    }

    /**
     * Show form to edit a session.
     */
    public function edit($id)
    {
        $session = Sessions::findOrFail($id);
        return Inertia::render('sessions/editSessions', [
            'session' => $session,
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

        $session = Sessions::findOrFail($id);
        $session->update($validated);

        return back()->with('success', 'Session updated successfully.');
    }

    /**
     * Show a single session.
     */
    public function show($id)
    {
        $session = Sessions::findOrFail($id);

        return Inertia::render('sessions/showSession', [
            'sessionId' => $session->id,
            'session' => [
                'id' => (string) $session->id,
                'title' => $session->title,
                'description' => $session->description,
                'teacher_id' => (string) $session->teacher_id,
            ],
            'auth' => ['user' => \Illuminate\Support\Facades\Auth::user()],
        ]);
    }
}
