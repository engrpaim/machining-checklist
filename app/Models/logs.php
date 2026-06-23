<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class logs extends Model
{
    protected $table = 'logs';

    protected $fillable = [ 
        "page",
        "data",
        "ip_address",
        "area",
        "user_id",
        "action",
        "model",
        "process",
        "lot_number"
    ];

    protected $casts = [
        "data" => 'array',
    ];
}
