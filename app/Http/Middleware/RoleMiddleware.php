<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string ...$roles): Response
    {
        // Check if user is authenticated
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $user = Auth::user();

        // Check if user has any of the required roles
        if (!in_array($user->role, $roles)) {
            // Redirect to appropriate dashboard based on user's actual role
            $dashboardRoute = match ($user->role) {
                'student' => 'student.dashboard',
                'teacher' => 'teacher.dashboard',
                'admin' => 'admin.dashboard',
                default => 'dashboard',
            };

            return redirect()->route($dashboardRoute)->with('error', 'You do not have permission to access this page.');
        }

        return $next($request);
    }
}
