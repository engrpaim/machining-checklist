<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Data;
use Exception;

class MachiningChecklistController extends Controller
{
    public function inprocess(Request $request)
    {
        // 1️⃣ Validate (basic example)
        $validated = $request->validate([
            'model' => 'required|string',
            'lot'   => 'required|string',
            'date'  => 'required|date',
        ]);

        // 2️⃣ Save ALL data (mass assignment)
        try{

            Data::create([
                ...$request->except(['pt_data', 'magnet_thickness']), // all other fields
                'magnet_thickness' => json_encode($request->magnet_thickness), // manually encode
                'pt_data' => json_encode($request->pt_data), // manually encode
            ]);
        }catch(Exception $e){
            dd($e);
        }

        // 3️⃣ Redirect back
        return redirect()->back()->with('success', 'Saved successfully');
    }
}
