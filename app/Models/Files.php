<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Files extends Model
{
    //
    use HasFactory;
    protected $table = 'files';
    public $incrementing = false;
    protected $keyType = 'string';
    protected $fillable = [
        'id',
        'file_path',
        'upload_date',
        'upload_by',
        'related_tables',
        'related_id'
    ];
    public function uploader(){
        return $this->belongsTo(User::class,'upload_by');
    }
}
