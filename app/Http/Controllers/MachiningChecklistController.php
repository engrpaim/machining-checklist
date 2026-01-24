<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Data;
use Exception;

class MachiningChecklistController extends Controller
{
    public function inprocess(Request $request)
    {


        $validated = $request->validate([
            'model' => 'required|string',
            'lot'   => 'required|string',
            'date'  => 'required|date',
        ]);

        try{

            Data::create([
                ...$request->except(['pt_data', 'magnet_thickness']),
                'magnet_thickness' => json_encode($request->magnet_thickness),
                'pt_data' => json_encode($request->pt_data),
                ]);
        }catch(Exception $e){
            dd($e);
        }


        return redirect()->back()->with('success', 'Saved successfully');
    }
}
