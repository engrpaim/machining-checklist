<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Data;
use Exception;
use Inertia\Inertia;
use Inertia\Response;
class MachiningChecklistController extends Controller
{
    public function inprocess(Request $request)
    {
        $lot =  $request->input('lot');
        $model = $request->input('model');
        $total_lot =  $request->input('total_lot');
        $isLotExist = Data::where('lot' ,$lot)->first();

        if( $lot && !$total_lot ){
            $theme =  !$isLotExist ? 'success-container':'error-container';
            $isExist = !$isLotExist ? ' not  exist save data':' exist update data';
            $message = $model . ' Lot No.: '. $lot  .$isExist;
            return Inertia::render('Home', [
                'flash' => [  $theme => $message],
                'LotData' => $isLotExist ? true:false,
                'detailsLot' =>$isLotExist
            ]);
        }

        $validated = $request->validate([
            'model' => 'required|string',
            'lot'   => 'required|string',
            'date'  => 'required|date',
        ]);


        try{

            Data::create([
                ...$request->except(['pt_data', 'barrelling', 'timer']),
                'pt_data'    => $request->pt_data,
                'barrelling'=> $request->barrelling,
                'timer'     => $request->timer,
            ]);

            return Inertia::render('Home', [
                'flash' => ['success-container' => $request->input('model') . ' Lot No.: '. $lot  . ' saved successfully!']
            ]);
        }catch(Exception $e){
            dd($e);
        }

    }

    public function update(Request $request){

        $validated = $request->validate([
            'model' => 'required|string',
            'lot'   => 'required|string',
            'date'  => 'required|date',
        ]);

        $lot = $request->input('lot');
        $model = $request->input('model');
        if(!$validated){
            return Inertia::render('Home', [
                'flash' => [  'error-container' => 'Update fail please Complete all details for the update'],
            ]);
        }
        try{
           $updated = Data::where('lot', $lot)->update([
                ...$request->except(['pt_data', 'barrelling', 'timer']),
                'barrelling' => json_encode($request->barrelling, JSON_UNESCAPED_UNICODE),
                'pt_data'    => json_encode($request->pt_data, JSON_UNESCAPED_UNICODE),
                'timer'      => json_encode($request->timer, JSON_UNESCAPED_UNICODE),
            ]);

            $newUpdatedLot = [];
            $isLotExist = Data::where('lot' ,$lot)->first();


            $theme =  $updated ? 'success-container':'error-container';
            $isExist = $updated ? ' updated successfully!':' update failed!';
            $message = $model . ' Lot No.: '. $lot  .$isExist;

            return Inertia::render('Home', [
                'flash' => [  $theme => $message],
                'LotData' => $isLotExist ? true:false,
                'detailsLot' =>$isLotExist->getAttributes()
            ]);


        }catch(Exception $e){
             return Inertia::render('Home', [
                'flash' => ['error-container' =>'Cannot update please contact automation!']
            ]);
        }
    }
}
