<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('login');
})->name('login');

Route::get('/dashboard', function () {
    return Inertia::render('dashboard');
})->name('dashboard');

Route::get('/courses', function () {
    return Inertia::render('courses');
})->name('courses');

Route::get('courses/mathematics', function(){
    return Inertia::render('mathematics');
})->name('mathematics');

Route::get('forums', function(){
    return Inertia::render('forums');
})->name('forums');

Route::get('courses/mathematics/quiz', function(){
    return Inertia::render('mathquiz');
})->name('mathquiz');

Route::get('/courses/{course}/slideshow', function ($course) {
    return Inertia::render('slideshow', [
        'course' => $course, // optional data
    ]);
})->name('courses.slideshow');

Route::get('/dummytest', function (){
    return Inertia::render('try-dummy');
})->name('dummytest');

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
