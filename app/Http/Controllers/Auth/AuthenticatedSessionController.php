<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        // Force logout any existing session first
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        // First, try standard Laravel authentication
        if (Auth::attempt($credentials, $remember)) {
            $request->session()->regenerate();

            // Get the authenticated user
            $user = Auth::user();
            // dd($user);

            // Redirect based on user role
            $dashboardRoute = match ($user->role ?? 'student') {
                'student' => 'student.dashboard',
                'teacher' => 'teacher.dashboard',
                'admin' => 'admin.dashboard',
                default => 'dashboard',
            };

            return redirect()->route($dashboardRoute);
        }

        // If standard auth fails, try legacy password authentication
        $user = User::where('email', $credentials['email'])->first();

        if ($user && $this->verifyLegacyPassword($credentials['password'], $user->password)) {
            // Update to bcrypt hash
            $user->password = bcrypt($credentials['password']);
            $user->save();

            // Now authenticate with the new hash
            Auth::login($user, $remember);
            $request->session()->regenerate();

            // Get the authenticated user
            $user = Auth::user();

            // Redirect based on user role
            $dashboardRoute = match ($user->role ?? 'student') {
                'student' => 'student.dashboard',
                'teacher' => 'teacher.dashboard',
                'admin' => 'admin.dashboard',
                default => 'dashboard',
            };

            return redirect()->route($dashboardRoute);
        }

        throw ValidationException::withMessages([
            'email' => trans('auth.failed'),
        ]);
    }

    /**
     * Verify legacy password formats
     */
    private function verifyLegacyPassword(string $password, string $hash): bool
    {
        // Check if it's already bcrypt
        if (password_verify($password, $hash)) {
            return true;
        }

        // Check for plain text (for development/testing)
        if ($password === $hash) {
            return true;
        }

        // Check for MD5 hash
        if (md5($password) === $hash) {
            return true;
        }

        // Check for SHA1 hash
        if (sha1($password) === $hash) {
            return true;
        }

        return false;
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
