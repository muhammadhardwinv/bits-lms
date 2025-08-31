<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Classes extends Model
{
    use HasFactory;

    protected $table = "classes";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false; // change to true if you want Laravel to auto-manage

    protected $fillable = [
        'id',
        'name',
        'grade_level',
        'capacity',
        'course_id',
        'teacher_id',
        'created_at',
        'updated_at'
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'id');
    }

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id', 'id');
    }

    public function sessions()
    {
        return $this->hasMany(CourseSession::class, 'course_id', 'course_id');
    }

    // Optional: refine later if you have pivot table
    public function students()
    {
        return $this->hasMany(User::class);
    }

    protected $casts = [
        'teacher_id' => 'string',
        'course_id' => 'string',
    ];
}
