<?php
namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

use App\Models\Course;

class CourseController extends Controller
{

    public function fetch(){
      $allCourse = Course::all();
      // dd($allCourse[0]);
      return $allCourse;
    }
}
