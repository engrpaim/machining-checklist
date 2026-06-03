<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class lappingModel extends Model
{
    protected $table= "lapping";

    protected $fillable = [
        'datalist_id',
        'datalist_lot_number',
        'batch_number',
        'shift',
        'operator_name',
        'checker',
        'staff_engineer',
        'comparator_serial',
        'mass_pro',
        'histogram_point'
    ];

    protected $casts = [
        'mass_pro' => 'array',
        'histogram_point' => 'array'
    ];
}
