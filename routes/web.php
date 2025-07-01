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

Route::get('assignment', function(){
    return Inertia::render('assignment');
})->name('assignment');
Route::prefix('assignment')->group(function () {
    Route::get('/{course}/{courseId}', function ($course, $courseId) {
        return Inertia::render('perAssignment', [
    'assignment' => [
        'title' => 'Final Project Report',
        'description' => 'Write and submit your final project report in detail.',
        'courseId' => 'CSCI-4321',
        'classId' => 'XII-Science-1',
        'type' => 'Essay',
        'dueDate' => '2025-07-10',
    ],
    'user' => [
        'name' => 'Michael',
        'role' => 'student',
    ],
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
