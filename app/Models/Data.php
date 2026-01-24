<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    protected $table = 'data';
    protected $fillable = [
        'model',
        'process',
        'lot',
        'total_lot',
        'qty_lot',
        'wt_lot',
        'media_size',
        'media_weight',
        'coolant',
        'styrenre',
        'gc_powder',
        'magnet_wt',
        'chamfer_type',
        'date',
        'shift',
        'operator',
        'checker',
        'staff_eng',
        'time_1',
        'rotation_1',
        'timetotal_1',
        'rotationtotal_1',
        'time_2',
        'rotation_2',
        'timetotal_2',
        'rotationtotal_2',
        'time_3',
        'rotation_3',
        'timetotal_3',
        'rotationtotal_3',
        'machine_no',
        'machinesample_1',
        'machinesample_2',
        'machinesample_3',
        'machinesample_4',
        'machinesample_5',
        'machinejudgement_1',
        'machinejudgement_2',
        'machinejudgement_3',
        'machinejudgement_4',
        'machinejudgement_5',
        'remarks',
        'magnet_thickness',
        'pt_data'
        // thickness + points (if columns exist)
        // magnethickness1_1, ...
        // pt1_1, ...
    ];
      protected $casts = [
        'magnet_thickness' => 'array',
        'pt_data' => 'array',
    ];
}
