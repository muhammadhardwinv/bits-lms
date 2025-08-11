<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessions extends Model
{

    use HasFactory;


    protected $table = 'sessions';
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'course_id',
        'title',
        'description',
        'schedule_date',
        'teacher_id',
        'classroom_id'
    ];

    public $timestamps = false;
    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
