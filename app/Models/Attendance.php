<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Attendance extends Model
{
    //
    use HasFactory;

    protected $table = "attendance";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'session_id',
        'student_id',
        'status',
        'recorded_at',
    ];

    public function session(){
        return $this->belongsTo(CourseSessions::class, 'session_id');
    }

    public function student(){
        return $this->belongsTo(User::class,'student_id');
    }
}
