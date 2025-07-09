<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Inertia::share([
            'user' => fn () => Auth::check() ? [
                'name' => Auth::user()->name,
                'role' => Auth::user()->role,
            ] : null,
        ]);
    }
}
