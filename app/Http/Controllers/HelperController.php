<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

use Illuminate\Support\Str;

class HelperController extends Controller
{
  public static function createUniqueId($numericLength = 4)
  {
    return Str::random($numericLength);
  }

  public static function createSecondaryId($length = 6)
  {
    return Str::random($length);
  }

  public static function createStudentId($length = 10)
  {
    return (string) random_int(10 ** ($length - 1), (10 ** $length) - 1);
  }
}
