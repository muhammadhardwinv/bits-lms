<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Grades extends Model
{
    //
    protected $table = "grades";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'submission_id',
        'student_id',
        'grade'
    ];

    public function submission(){
        return $this->belongsTo(Submission::class, 'submission_id');
    }

    public function student(){
                return $this->belongsTo(User::class, 'student_id');
    }
}
