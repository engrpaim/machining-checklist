<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Users extends Model
{
     protected $table = 'user';
      protected $fillable= [
        "area",
        "ip_address",
        "name",
        "surname",
        "permission",
        "id_number",
    ];
}
