<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AttendanceController;

// Static Pages
Route::get('/', fn () => Inertia::render('login'))->name('login');
Route::get('/login', fn () => Inertia::render('login'))->name('login');
Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
Route::get('/courses', fn () => Inertia::render('courses'))->name('courses');
Route::get('/events', fn () => Inertia::render('events'))->name('events');
Route::get('/lecturer-dashboard', fn () => Inertia::render('lecturerdashboard'))->name('lecturerdashboard');
Route::get('/dummytest', fn () => Inertia::render('try-dummy'))->name('dummytest');

// Gradebook
Route::get('/gradebook', function () {
    return Inertia::render('gradebook'); // All courses page
})->name('gradebook.index');  // rename to gradebook.index

Route::get('/gradebook/{courseId}', function ($courseId) {
    return Inertia::render('course-grade', [
        'courseId' => $courseId,
    ]);
})->name('gradebook.show');

// Selected Course View (used for "Session")
Route::get('/selected-course/{courseId}', fn ($courseId) => Inertia::render('selected-Course', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('course.selected');
Route::get('/current-session/{courseId}', function ($courseId) {
    return Inertia::render('selected-Course', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]);
})->name('course.session');

// Lecturer Mode

Route::get('/select-class', function () {
    return Inertia::render('lecturerSelectPage');
})->name('select-class');
Route::get('/assignment/new/{courseName}', function ($courseName) {
    return Inertia::render('newAssignment');
})->name('assignment.new');



// Discussion & Forum
Route::get('/forum/{courseId}', fn ($courseId) => Inertia::render('Forum', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('forum.show');

Route::get('/discussion/{courseId}', fn ($courseId) => Inertia::render('discussion', [
    'courseId' => $courseId,
    'user' => [
        'name' => 'Guest Viewer',
        'role' => 'student'
    ],
]))->name('discussion');

// People
Route::get('/people/{courseId}', fn($courseId) => Inertia::render('people', [
    'courseId' => $courseId,
]))->name('people');

// Attendance
Route::get('/attendance/{courseId}', [AttendanceController::class, 'index'])->name('attendance.index');

// Assignments
Route::get('/assignment', fn () => Inertia::render('assignment'))->name('assignment');
Route::get('/assignment/{courseId}', fn($courseId) => Inertia::render('per-assignment', [
    'courseId' => $courseId,
]))->name('assignment.view');

Route::prefix('assignment')->group(function () {
    Route::get('/{course}/{courseId}/quiz', fn ($course, $courseId) => Inertia::render('assignmentPage/assignmentQuiz', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.quiz');

    Route::get('/{course}/{courseId}/slideshow', fn ($course, $courseId) => Inertia::render('assignmentPage/assignmentSlideshow', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.slideshow');

    Route::get('/{course}/{courseId}', fn ($course, $courseId) => Inertia::render('per-assignment', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.show');
});

// Slideshow (old course prefix route)
Route::prefix('courses')->group(function () {
    Route::get('/{course}/slideshow', fn ($course) => Inertia::render('slideshow', [
        'course' => $course,
    ]))->name('courses.slideshow');
});

// New Assignment Page
Route::get('/{courseName}/new-assignment', fn ($courseName) => Inertia::render('NewAssignmentContent', [
    'courseName' => $courseName,
]))->name('assignment.new');

// Auth
Route::post('/logout', function () {
    Auth::logout();
    return redirect('/')->route('login');
})->name('logout');
