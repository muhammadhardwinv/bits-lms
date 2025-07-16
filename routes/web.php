<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AttendanceController;



Route::get('/', fn () => Inertia::render('login'))->name('login');
Route::get('/login', fn () => Inertia::render('login'))->name('login');
Route::get('/dashboard', fn () => Inertia::render('dashboard'))->name('dashboard');
Route::get('/courses', fn () => Inertia::render('courses'))->name('courses');
Route::get('/events', fn () => Inertia::render('events'))->name('events');
Route::get('/lecturer-dashboard', fn () => Inertia::render('lecturerdashboard'))->name('lecturerdashboard');
Route::get('/dummytest', fn () => Inertia::render('try-dummy'))->name('dummytest');

Route::get('/gradebook', fn () => Inertia::render('gradebook'))->name('gradebook.index');
Route::get('/gradebook/{courseId}', fn ($courseId) => Inertia::render('course-grade', [
    'courseId' => $courseId,
]))->name('gradebook.show');

Route::get('/selected-course/{courseId}', fn ($courseId) => Inertia::render('selected-Course', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('course.selected');

Route::get('/current-session/{courseId}', fn ($courseId) => Inertia::render('selected-Course', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('course.session');

Route::get('/select-class', fn () => Inertia::render('lecturerSelectPage'))->name('select-class');

Route::get('/forum/{courseId}', fn ($courseId) => Inertia::render('Forum', [
    'auth' => ['user' => Auth::user()],
    'courseId' => $courseId,
]))->name('forum.show');

Route::get('/discussion', fn () => Inertia::render('baseDiscussion'))->name('base.discussion');

Route::get('/discussion/{courseId}', fn ($courseId) => Inertia::render('discussion', [
    'courseId' => $courseId,
    'user' => [
        'name' => 'Guest Viewer',
        'role' => 'student'
    ],
]))->name('discussion');

Route::get('/people/{courseId}', fn($courseId) => Inertia::render('people', [
    'courseId' => $courseId,
]))->name('people');

Route::get('/attendance/{courseId}', [AttendanceController::class, 'index'])->name('attendance.index');

Route::get('/assignment/new/{courseId}', fn ($courseId) => Inertia::render('assignment-form', [
        'courseId' => $courseId,
    ])
)->name('assignment.new');

Route::get('/assignment', fn () => Inertia::render('assignment'))->name('assignment');

Route::get('/assignment/{courseId}', fn($courseId) => Inertia::render('per-assignment', [
    'courseId' => $courseId,
]))->name('assignment.view');

Route::get('/{courseId}/quiz', function ($courseId) {
    return Inertia::render('courseQuiz', [
        'courseId' => $courseId,
    ]);
})->name('course.quiz');

Route::prefix('assignment')->group(function () {
    Route::get('/{course}/{courseId}/slideshow', fn ($course, $courseId) => Inertia::render('assignmentPage/assignmentSlideshow', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.slideshow');

    Route::get('/{course}/{courseId}', fn ($course, $courseId) => Inertia::render('per-assignment', [
        'course' => $course,
        'courseId' => $courseId,
    ]))->name('assignment.show');
});

Route::prefix('courses')->group(function () {
    Route::get('/{course}/slideshow', fn ($course) => Inertia::render('slideshow', [
        'course' => $course,
    ]))->name('courses.slideshow');
});

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/')->route('login');
})->name('logout');

// require __DIR__.'/database.php';