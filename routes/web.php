<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('login');
})->name('login');

Route::get('/login', function () {
    return Inertia::render('login');
})->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/courses', function () {
    return Inertia::render('courses');
})->name('courses');

// ✅ Inserted here — for /courses/{course}/slideshow
Route::prefix('courses')->group(function () {
    Route::get('/{course}/slideshow', function ($course) {
        return Inertia::render('slideshow', [
            'course' => $course,
        ]);
    })->name('courses.slideshow');
});

Route::prefix('/{courseName}')->group(function () {
    Route::get('/new-assignment', function ($courseName) {
        return Inertia::render('NewAssignmentContent', [
            'courseName' => $courseName,
        ]);
    })->name('assignment.new');
});

Route::get('/forum/{courseId}', function ($courseId) {
    return Inertia::render('Forum', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]);
})->name('forum.show');

Route::get('/selected-course/{courseId}', function ($courseId) {
    return Inertia::render('selected-Course', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]);
})->name('course.selected');

Route::get('/discussion/{courseId}', function ($courseId) {
    return Inertia::render('discussion', [
        'courseId' => $courseId,
        'user' => [
            'name' => 'Guest Viewer',
            'role' => 'student'
        ],
    ]);
})->name('discussion');

// 🔁 Duplicate route (already above), you can remove this:
Route::get('/selected-course/{courseId}', function ($courseId) {
    return Inertia::render('selected-Course', [
        'auth' => ['user' => Auth::user()],
        'courseId' => $courseId,
    ]);
})->name('course.selected');

Route::get('/assignment/{courseId}', function($courseId){
    return Inertia::render('per-assignment', [
        'courseId' => $courseId,
    ]);
})->name('assignment.view');

Route::get('assignment', function(){
    return Inertia::render('assignment');
})->name('assignment');

Route::prefix('assignment')->group(function () {
    Route::get('/{course}/{courseId}/quiz', function ($course, $courseId) {
        return Inertia::render('assignmentPage/assignmentQuiz', [
            'course' => $course,
            'courseId' => $courseId,
        ]);
    })->name('assignment.quiz');

    Route::get('/{course}/{courseId}/slideshow', function ($course, $courseId) {
        return Inertia::render('assignmentPage/assignmentSlideshow', [
            'course' => $course,
            'courseId' => $courseId,
        ]);
    })->name('assignment.slideshow');

    Route::get('/{course}/{courseId}', function ($course, $courseId) {
        return Inertia::render('per-assignment', [
            'course' => $course,
            'courseId' => $courseId,
        ]);
    })->name('assignment.show');
});

Route::get('/dummytest', function (){
    return Inertia::render('try-dummy');
})->name('dummytest');

// 🔁 Duplicate of route inside prefix above (optional to remove):
Route::get('/{courseName}/new-assignment', function ($courseName) {
    return Inertia::render('NewAssignmentContent', [
        'courseName' => $courseName,
    ]);
})->name('assignment.new');

Route::get('/lecturer-dashboard', function () {
    return Inertia::render('lecturerdashboard');
})->name('lecturerdashboard');

Route::post('/logout', function () {
    Auth::logout();
    return redirect('/')->route('login');
})->name('logout');
