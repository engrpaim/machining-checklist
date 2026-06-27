<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class slicingModel extends Model
{
    protected $table = "slicing";
    protected $fillable = [
        'datalist_id',
        'datalist_lot_number',
        'batch_number',
        'shift',
        'model',
        'operator_name',
        'checker',
        'staff_engineer',
        'machine_number',
        'pattern',
        'cutting_speed',
        'no_of_pass',
        'motor_load',
        'micrometer_serial_number',
        'checking_condition',
        'no_of_tb_cycle',
        'perpern_serial_number',
        'comparator_serial_number',
        'perpendicularity',
        'parallelism',
        'mass_pro',
        'process_number',
        'om_specs'
    ];

    protected $casts = [
        'perpendicularity' => 'array',
        'parallelism' => 'array',
        'mass_pro' => 'array'
    ];
}
