<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdjustmentModels extends Model
{
    protected $table = 'adjustment';

    public $timestamps = false;

    protected $fillable = [
        'datalist_id',
        'adjustment',
        'date',
        'batch_number',
        'process_number',
        'process',
        'machine',
        'model_name',
        'lot_number',
        'operator',
        'checked_by',
        'width',
        'length',
        'thickness',
        'height',
        'chamfer',
        'center_off',
        'angularity',
        'perpen',
        'flatness',
        'deffect',
        'adjustment_made',
        'tb_no',
        'pt_1',
        'pt_2',
        'pt_3',
        'pt_4',
        'pt_5',
        'chamfer_point',
        'center_off_point',
        'angularity_point',
        'perpen_point',
        'flatness_point',
        'appearance_checking',
        'final_result',
        'created_at',
        'updated_at',
    ];
}