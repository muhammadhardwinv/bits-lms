<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\UserIdGeneratorService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserManagementController extends Controller
{
    // Middleware is applied in routes/web.php instead of constructor in Laravel 11

    protected $userIdGenerator;

    public function __construct(UserIdGeneratorService $userIdGenerator)
    {
        $this->userIdGenerator = $userIdGenerator;
    }

    /**
     * Display a listing of users
     */
    public function index(Request $request)
    {
        $query = User::query();

        // Filter by role
        if ($request->filled('role')) {
            $query->where('role', $request->role);
        }

        // Search by name or email
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                  ->orWhere('email', 'like', '%' . $request->search . '%');
            });
        }

        // Filter by status
        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        }

        $users = $query->orderBy('created_at', 'desc')
                      ->paginate(15)
                      ->withQueryString();

        $stats = [
            'total' => User::count(),
            'students' => User::where('role', 'student')->count(),
            'teachers' => User::where('role', 'teacher')->count(),
            'admins' => User::where('role', 'admin')->count(),
            'active' => User::where('is_active', true)->count(),
            'inactive' => User::where('is_active', false)->count(),
        ];

        return Inertia::render('admin/users/index', [
            'users' => $users,
            'stats' => $stats,
            'filters' => $request->only(['role', 'search', 'status']),
        ]);
    }

    /**
     * Show the form for creating a new user
     */
    public function create()
    {
        // Get role statistics for preview
        $roleStats = $this->userIdGenerator->getRoleStatistics();

        return Inertia::render('admin/users/create', [
            'roleStats' => $roleStats,
            'supportedRoles' => $this->userIdGenerator->getSupportedRoles(),
        ]);
    }

    /**
     * Store a newly created user
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:admin,teacher,student',
            'status' => 'sometimes|in:active,on-leave,perm-leave,suspended',
        ]);

        // Generate auto-incremented ID based on role
        $generatedId = $this->userIdGenerator->generateNextIdSafe($request->role);

        $user = User::create([
            'id' => $generatedId,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'status' => $request->status ?? 'active',
        ]);

        // Check if this is an AJAX request (from modal)
        if ($request->expectsJson() || $request->ajax()) {
            return response()->json([
                'success' => true,
                'message' => "User created successfully with ID: {$generatedId}",
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $user->role,
                    'status' => $user->status,
                ],
                'generated_id' => $generatedId
            ], 201);
        }

        // Traditional form submission (redirect)
        return redirect()->route('admin.users.index')
                        ->with('success', "User created successfully with ID: {$generatedId}");
    }

    /**
     * Display the specified user
     */
    public function show(User $user)
    {
        $user->load(['courses', 'assignments']); // Load relationships if they exist

        return Inertia::render('admin/users/show', [
            'user' => $user,
        ]);
    }

    /**
     * Show the form for editing the specified user
     */
    public function edit(User $user)
    {
        return Inertia::render('admin/users/edit', [
            'user' => $user,
        ]);
    }

    /**
     * Update the specified user
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'role' => 'required|in:admin,teacher,student,parent',
            'is_active' => 'boolean',
            'password' => 'nullable|string|min:8|confirmed',
        ]);

        $updateData = [
            'name' => $request->name,
            'email' => $request->email,
            'role' => $request->role,
            'is_active' => $request->is_active ?? true,
        ];

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $user->update($updateData);

        return redirect()->route('admin.users.index')
                        ->with('success', 'User updated successfully.');
    }

    /**
     * Remove the specified user
     */
    public function destroy(User $user)
    {
        // Prevent admin from deleting themselves
        if ($user->id === auth()->id()) {
            return redirect()->route('admin.users.index')
                           ->with('error', 'You cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')
                        ->with('success', 'User deleted successfully.');
    }

    /**
     * Toggle user active status
     */
    public function toggleStatus(User $user)
    {
        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activated' : 'deactivated';
        
        return redirect()->back()
                        ->with('success', "User {$status} successfully.");
    }

    /**
     * Bulk actions for users
     */
    public function bulkAction(Request $request)
    {
        $request->validate([
            'action' => 'required|in:activate,deactivate,delete',
            'user_ids' => 'required|array',
            'user_ids.*' => 'exists:users,id',
        ]);

        $userIds = $request->user_ids;
        
        // Prevent admin from performing bulk actions on themselves
        if (in_array(auth()->id(), $userIds)) {
            return redirect()->back()
                           ->with('error', 'You cannot perform bulk actions on your own account.');
        }

        switch ($request->action) {
            case 'activate':
                User::whereIn('id', $userIds)->update(['is_active' => true]);
                $message = 'Users activated successfully.';
                break;
            case 'deactivate':
                User::whereIn('id', $userIds)->update(['is_active' => false]);
                $message = 'Users deactivated successfully.';
                break;
            case 'delete':
                User::whereIn('id', $userIds)->delete();
                $message = 'Users deleted successfully.';
                break;
        }

        return redirect()->back()->with('success', $message);
    }

    /**
     * Get next available ID for a specific role (AJAX endpoint)
     */
    public function getNextId(Request $request)
    {
        $request->validate([
            'role' => 'required|in:admin,teacher,student'
        ]);

        try {
            $nextId = $this->userIdGenerator->previewNextId($request->role);
            $roleFormat = $this->userIdGenerator->getRoleFormat($request->role);

            return response()->json([
                'success' => true,
                'next_id' => $nextId,
                'format' => $roleFormat,
                'example' => sprintf($roleFormat['pattern'], 1)
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * Get role statistics for dashboard
     */
    public function getRoleStatistics()
    {
        $stats = $this->userIdGenerator->getRoleStatistics();

        return response()->json([
            'success' => true,
            'statistics' => $stats
        ]);
    }
}
