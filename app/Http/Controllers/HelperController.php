<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Str;

class HelperController extends Controller
{
    public static function createUniqueId($length = 10){
      return Str::random($length);
    }
    
}
