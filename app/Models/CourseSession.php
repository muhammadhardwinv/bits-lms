<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CourseSession extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $table = "course_sessions";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'course_id',
        'title',
        'description',
        'learning_outcome',
        'start_datetime',
        'delivery_type',
        'end_datetime',
        'session_number',
        'created_at',
        'updated_at'
    ];

    protected $casts = [
        'start_datetime' => 'datetime',
        'end_datetime'=> 'datetime',
    ];

    public function assignments()
    {
        return $this->hasMany(Assignment::class, 'session_id');
    }

    public function attendances(){
        return $this->hasMany(Attendance::class,'session_id');
    }

    public function forumThreads(){
        return $this->hasMany(ForumThread::class,'session_id');
    }

    // public function getScheduleDateAttribute()
    // {
    //     return $this->start_datetime?->toDateString();
    // }

    public function getScheduleDateAttribute()
{
    return \Carbon\Carbon::parse($this->start_datetime)->toDateString();
}

}
