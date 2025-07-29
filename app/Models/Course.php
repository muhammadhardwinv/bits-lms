<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use Illuminate\Database\Eloquent\Model;
// use Illuminate\Foundation\Auth\User as Authenticatable;
// use Illuminate\Notifications\Notifiable;

class Course extends Model
{
    // /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     */
    protected $table = "courses";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;
    
    protected $fillable = [
        'id',
        'name',
        'description',
        'teacher_id',
    ];
}
