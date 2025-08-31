<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ForumReplies extends Model
{
    //
    use HasFactory;

    protected $table = "forum_replies";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'thread_id',
        'user_id',
        'parent_reply_id',
        'content',
        'created_at'
    ];

    public function thread(){
        return $this->belongsTo(Thread::class,'thread_id');
    }
    public function user(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function parent(){
        return $this->belongsTo(ForumReplies::class, 'parent_reply_id');
    }

    public function children(){
        return $this->hasMany(ForumReplies::class,'parent_reply_id');
    }
}
