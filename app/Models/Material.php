<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

// class Materials extends Model
// {
//     use HasFactory;

//     protected $fillable = [
//         'title',
//         'description',
//         'file_path',
//     ];

//     protected $casts = [
//         'created_at' => 'datetime',
//         'updated_at' => 'datetime',
//     ];
// }


class Materials extends Model
{
    use HasFactory;

    protected $table = "materials";
    protected $primaryKey = 'id';
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'title',
        'description',
        'file_path',
        'created_at',
        'updated_at'
    ];

    public function course(){
        return $this->belongsTo(Courses::class);
    }
}