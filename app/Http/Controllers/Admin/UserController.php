<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\HelperController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    public function showPeople()
    {
        $users = User::all(); // should return actual data

        return Inertia::render('users/userpage', [
            'users' => $users,
            // dd($users),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('users/newusers', [
            'role' => $request->user()->role,
        ]);
    }

    public function fetch()
    {
        $allUsers = User::all();
        return $allUsers;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'      => ['required', 'max:64'],
            'email'     => ['required', 'max:64'],
            'password'  => ['required', 'max:64'],
            'role'      => ['required'],
        ]);

        $newUserId = HelperController::createUniqueId();
        User::create([
            'id' => $newUserId,
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => $data['password'],
            'role' => $data['role'],
        ]);
        return back()->with('Success', 'UserAdded');
    }

    public function destroy(string $id)
    {
        $user = User::where('id', $id)->firstOrFail();
        $user->delete();

        return redirect()->back();
    }

    public function edit($id)
    {
        $user = User::findOrFail($id);
        return Inertia::render('users/editusers', [
            'user' => $user,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name'  => 'required|string|max:64',
            'email' => 'nullable|string',
        ]);
        $user = User::findOrFail($id);
        $user->update($validated);

        return back()->with('Success', 'User data updated successfully');
    }
}
