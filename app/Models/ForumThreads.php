<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ForumThreads extends Model
{
    //
    protected $table = "forum_threads";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'session_id',
        'user_id',
        'title',
        'description',
        'created_at'
    ];

    public function session(){
        return $this->belongsTo(CourseSessions::class, 'session_id');
    }

    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function replies(){
        return $this->hasMany(ForumReplies::class, 'thread_id');
    }

}
