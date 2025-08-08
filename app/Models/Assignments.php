<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;

class Assignments extends Model
{
  // /** @use HasFactory<\Database\Factories\UserFactory> */
  use HasFactory;

  /**
   * The attributes that are mass assignable.
   *
   */
  protected $table = "assignments";
  protected $primaryKey = 'id';
  protected $keyType = 'string';
  public $timestamps = false;

  protected $fillable = [
    'id',
    'session_id',
    'title',
    'description',
    'due_date',
    'attempt_limit',
  ];

  public function session()
  {
    return $this->belongsTo(Sessions::class, 'session_id', 'id');
  }

  // public function students()
  // {
  //   return $this->belongsToMany(User::class, 'course_student', 'course_id', 'student_id');
  // }
}
