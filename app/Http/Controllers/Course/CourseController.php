<?php
namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Course;
use App\Http\Controllers\HelperController;

class CourseController extends Controller
{

    public function fetch(){
      $allCourse = Course::all();
      // dd($allCourse[0]);
      return $allCourse;
    }

    public function store(Request $request){

      
      // dd($request);
      $data = $request->validate([
        'name' => ['required', 'max:64' ],
        'description' => ['required', 'max:128'],
      ]);
      // dd($data);

      $newCourseId = HelperController::createUniqueId();
      Course :: create([
        'id' => $newCourseId,
        'name' => $data['name'],
        'description' => $data['description'],
        'teacher_id' => 1,
      ]);
    return back()->with('Success', 'CourseAdded ');
    }
}
