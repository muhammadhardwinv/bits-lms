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

Route::get('mathematics', function(){
    return Inertia::render('mathematics');
})->name('mathematics');

Route::get('forums', function(){
    return Inertia::render('forums');
})->name('forums');

Route::get('/assignment/{courseId}', function($courseId){
    return Inertia::render('per-assignment', [
        'courseId' => $courseId,
    ]);
})->name('assignment.view');

Route::get('assignment', function(){
    return Inertia::render('assignment');
})->name('assignment');
Route::prefix('assignment')->group(function () {

    // /assignment/{course}/{courseId}/quiz → assignmentPage/assignmentQuiz.jsx
    Route::get('/{course}/{courseId}/quiz', function ($course, $courseId) {
        return Inertia::render('assignmentPage/assignmentQuiz', [
            'course' => $course,
            'courseId' => $courseId,
        ]);
    })->name('assignment.quiz');
    // /assignment/{course}/{courseId}/slideshow → assignmentPage/assignmentSlideshow.jsx
    Route::get('/{course}/{courseId}/slideshow', function ($course, $courseId) {
        return Inertia::render('assignmentPage/assignmentSlideshow', [
            'course' => $course,
            'courseId' => $courseId,
        ]);
    })->name('assignment.slideshow');

    // /assignment/{course}/{courseId} → assignmentPage/perAssignment.jsx
    Route::get('/{course}/{courseId}', function ($course, $courseId) {
        return Inertia::render('per-assignment', [
            'course' => $course,
            'courseId' => $courseId,
        ]);
    })->name('assignment.show');

});
Route::prefix('/courses')->group(function () {
    Route::get('/mathematics/quiz', function(){
        return Inertia::render('mathquiz');
    })->name('mathquiz');
    
    Route::get('/{course}/slideshow', function ($course) {
        return Inertia::render('slideshow', [
            'course' => $course,
        ]);
    })->name('courses.slideshow');

    Route::get('mathematics', function(){
        return Inertia::render('mathematics');
    })->name('mathematics');

});

Route::get('/dummytest', function (){
    return Inertia::render('try-dummy');
})->name('dummytest');

Route::get('/lecturer-dashboard', function () {
    return Inertia::render('lecturerdashboard');
})->name('lecturerdashboard');


Route::post('/logout', function () {
    Auth::logout();
    return redirect('/')->route('login');
})->name('logout');
// Route::middleware(['auth', 'verified'])->group(function () {
//     Route::get('dashboard', function () {
//         return Inertia::render('dashboard');
//     })->name('dashboard');
// });

// require __DIR__.'/settings.php';
// require __DIR__.'/auth.php';
