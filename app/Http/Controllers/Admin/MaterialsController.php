<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Material;

class MaterialsController extends Controller
{

    public function create()
    {
        return Inertia::render('admin/materials/newmaterials');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file' => 'required|file|max:10240',
        ]);

        $path = $request->file('file')->store('materials');

        Material::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'file_path' => $path,
        ]);

        return redirect()->route('admin.add.materials')->with('success', 'Material uploaded.');
    }
}
