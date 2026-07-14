<?php
/**
 * 
 * @copy_batch Copy batch return copy batch objects not included
 * 
 */
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Data;
use Exception;
use Inertia\Inertia;
use App\Models\Users;
use App\Models\Datalist;
use App\Models\ModelDetails;
use App\Models\cghModel;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\ProcessController;
use App\Models\Barelling;
use App\Models\lappingModel;
use App\Models\slicingModel;
use App\Models\logs;
use App\Models\AdjustmentModels;
use GuzzleHttp\Handler\Proxy;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Process;

class MachiningChecklistController  extends ProcessController
{
    public $finalModel;

    public function dataBaseBank(string $process)
    {
        $bank = [
            'barelling' => Barelling::class,
            'models' => ModelDetails::class,
            'cghl' => cghModel::class,
            'lapping' => lappingModel::class,
            'slicing' => slicingModel::class,
            'adjustment' => AdjustmentModels::class
        ];

        return $bank[$process];
    }

    public function saveToLogs(
                                string $page,
                                array $data,
                                string $ip_address, 
                                string $area,
                                string $userId,
                                string $lotnumber,
                                string $action,
                                string $model,
                                string $process,
                                string $shift
                              ){
        try{

            $lotSave = logs::create([
                'page' => $page ?? null,
                'data' => $data ?? null,
                'ip_address' => $ip_address ?? null,
                'area' => $area  ?? null,
                'user_id' => $userId ?? null,
                'action' => $action ?? null,
                'model' => $model ?? null,
                'process' => $process?? null,
                'lot_number' => $lotnumber ?? null,
                'shift' => $shift ?? null
            ]);
         
            return true;

        }catch(Exception $e){

            return false;

        }
    }

    public function otherJSON(string $process)
    {
        $jsonData = [
            'barelling' => ['timer']
        ];
        return $jsonData[$process];
    }

    public function goTo(Request $request)
    {
        
        $lot = $request->input('lot_number') ?? null;
        $process = $request->input('process') ?? null;
        $id = $request->input('id') ?? null;
        $model = $request->input('model') ?? null;
        

        if (!$lot || !$process  || !$id) return redirect()->back()->with('error', 'Incomplete data! Please contact PIC.');

        $dbUse = $this->dataBaseBank($process);
        $processGet = new ProcessController;
        $dbAdjust = $this->dataBaseBank('adjustment');

        $getData = $processGet->checkBatch1($id, $lot, $dbUse)->toArray();
        $getAdjust = $processGet->checkBatch3($id, $dbAdjust,$process, $getData["batch_number"] ,  $getData["process_number"])->toArray();

        if (!$getData) return redirect()->back()->with('error', 'Cannot find data!');

        $getModelDetails = ModelDetails::where('model', $model)->first()->toArray();

        if (!$getModelDetails) return redirect()->back()->with('error', 'Model not found please update!');

        return redirect('/machining-checklist/measure')->with([
            'success' => 'Successfully found data!',
            'GoToProcess' => $process,
            'model' => $getModelDetails,
            'GoToModel' => $model,
            'current_lot' => $getData,
            'adjustment' => $getAdjust
        ]);

        dd($getData, $request->all());
    }

    public function store(Request $request)
    {
      
        //array for value exist checking
        $preparedItems = [];
        $ip = $request->ip();
        
        $toBecheked = [
            'measure' => ['lot_number' => 'required|string', 'process' => 'required|string'],
        ];
        //class bank @return model
        $classBank = [
            'measure' => Datalist::class,
            'barelling' => Barelling::class,
            'cghl' => cghModel::class,
            'lapping' => lappingModel::class,
            'slicing' => slicingModel::class
        ];
        //check if valid page
        $processingDetails = $request->input('page');

        $page = $processingDetails['processing']['page'] ?? null;
        if (!$page) return redirect()->back()->with('error', 'Page does not exist!');

        //check & validate required data
        $toValidate = $toBecheked[$page] ?? null;

        if (!$toValidate) return redirect()->back()->with('error', 'Invalid page!');

        $isExist = Validator::make($processingDetails['processing'], $toValidate);
        if ($isExist->fails())  return redirect()->back()->with('error', 'Please complete data!');

        $isTableExist =  $classBank[$page] ?? null;
        if (!$isTableExist) return redirect()->back()->with('error', 'Table not exist!');


        // Saving data
        //First Save in datalsit
        $lotNumber = $processingDetails['processing']['lot_number'];
        $shift = $processingDetails['processing']['shift'];
        $om_specs =$processingDetails['processing']['om_specs'];
        $process_number =$processingDetails['processing']['process_number'];
        $process = $processingDetails['processing']['process'];
        $modelProcessing = $processingDetails['model'];
        $processListCurrent = [];
        array_push($processListCurrent, $process);
        $preparing = $processListCurrent;
        $checkIfexist  =  $isTableExist::where('lot_number', $lotNumber)->where('model',$modelProcessing)->first();

        $insertProcessDetails = new ProcessController();

        //Get model data
        $modelDb = $this->dataBaseBank('models');
        $currentModel =   $processingDetails["model"];
        $models = $insertProcessDetails->getModel($modelDb, $currentModel);
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();
        
        
        //hanle om specs exist
        $omExist = null;
        if($checkIfexist){
            $omExist = $classBank[$process]::where('datalist_lot_number', $lotNumber)->where('model',$modelProcessing)->where('om_specs','=',$om_specs)->first();


            if(!$omExist){
                    $omData = $classBank[$process]::where('datalist_lot_number', $lotNumber)->where('model',$modelProcessing)->where('om_specs','!=',$om_specs)->first();
                    
                    if($omData){
                        $data = $processingDetails['processing'];
                        $creatBatch = $insertProcessDetails->Batching($process, $omData->datalist_id, $omData->datalist_lot_number, $data);

                        $this->saveToLogs($page , $request->all(), $ip,'','',$lotNumber,'store['.$om_specs.']',$modelProcessing,$process,$shift );

                        $dbAdjust = $this->dataBaseBank('adjustment');
                        $getAdjust = $insertProcessDetails->checkBatch3($omData->datalist_id, $dbAdjust,$process,$creatBatch["batch_number"],$creatBatch["process_number"] )->toArray();

                        if ($creatBatch) return redirect()->back()->with(
                            [
                                'success' => 'Saved Successfully[OM-SPECS]!',
                                'current_lot' => $creatBatch,
                                'model' => $convertModel,
                                'adjustment' => $getAdjust
                            ]
                        );
                    }
                    
                }
        }
        //Batching returns the new batch
        if (!$checkIfexist) {
            try {

                
                    $isSaved = $isTableExist::create([
                        'lot_number' => $lotNumber,
                        'shift' => $shift,
                        'preparing' => $preparing,
                        'ip_address' => $ip,
                        'model' => $modelProcessing,
                        'om_specs' => $om_specs,
                        'process_number' => $process_number
                    ]);
                
                
                $data = $processingDetails['processing'];
                $creatBatch = $insertProcessDetails->Batching($process, $isSaved->id, $isSaved->lot_number, $data);
                   
                $this->saveToLogs($page , $request->all(), $ip,'','',$lotNumber,'store',$modelProcessing,$process,$shift );

                $dbAdjust = $this->dataBaseBank('adjustment');
                $getAdjust = $insertProcessDetails->checkBatch3($isSaved->id, $dbAdjust,$process,1
                
                ,$process_number)->toArray();
          
                if ($isSaved) return redirect()->back()->with(
                    [
                        'success' => 'Saved Successfully[Datalist-NW]!',
                        'current_lot' => $creatBatch,
                        'model' => $convertModel,
                        'adjustment' => $getAdjust
                    ]
                );

            } catch (Exception $e) {
                $this->saveToLogs($page , [ 'error' => $e->getMessage()], $ip,'','',$lotNumber,'error',$modelProcessing,$process,$shift );
                return redirect()->back()->with('error', `Failed:` . $e->getMessage());
            }
        }


        if ($checkIfexist->model !== $modelProcessing) return redirect()->back()->with('error', 'Model must be ' . $checkIfexist->model);
     
        if ($checkIfexist && $process) {

            //update datalist process
            if (!in_array($process, $checkIfexist["preparing"])) {
                $processUpdatedList = [$process];
                $currentProcessList = $checkIfexist["preparing"];
                $combinedProcess =  array_merge($processUpdatedList,  $currentProcessList);
                $addProcess = json_encode($combinedProcess);
                $updateProcessList = Datalist::where('lot_number', $checkIfexist["lot_number"])->update(['preparing' => $addProcess]);
            }

            $getAllBatch = $classBank[$process];

            if (!$getAllBatch) return redirect()->back()->with('error', 'Process database not found!');
            $isGetDetails =  $getAllBatch::where('datalist_id', $checkIfexist->id)->where('om_specs','=', $om_specs)->get();

            
            if (!$isGetDetails->toArray()) {
                $data = $processingDetails['processing'];
                $creatBatch = $insertProcessDetails->Batching($process, $checkIfexist->id, $checkIfexist->lot_number, $data);
                $this->saveToLogs($page , $request->all(), $ip,'','',$lotNumber,'store',$modelProcessing,$process,$shift );
                
                if ($creatBatch) return redirect()->back()->with(
                    [
                        'success' => 'Saved Successfully[Datalist-NW]!',
                        'current_lot' => $creatBatch,
                        'model' => $convertModel,
                        
                    ]
                );
            }

            $allBatchLot = json_encode($isGetDetails->toArray());
            return redirect()->back()->with([
                'modal' => $lotNumber . ' already exist!',
                'batches' => $allBatchLot,
                'model' => $convertModel
            ]);
        }

        //Second save in process
        return redirect()->back()->with('error', 'No Saving function yet!');
    }

    public function lotBatching(Request $request)
    {
        //@copy_batch
        //return batches
        $pageData =  $request->input('page');
        if (!$pageData) return redirect()->back()->with('error', 'Cannot start batching!');

        $lot_number =  $pageData['processing']["lot_number"];
       
        //get id and created_at

        if (!$lot_number) return redirect()->back()->with('error', 'Lot number not found!');

        $isGetDetails = Datalist::where('lot_number', $lot_number)->first();
        if (!$isGetDetails) return redirect()->back()->with('error', 'Cannot create batch, 1st batch missing!');

        $reference_id = $isGetDetails->id;
        $reference_lot_number = $isGetDetails->lot_number;
        $process =  $pageData["processing"]["process"];
        $process_number =  $pageData["processing"]["process_number"];
        $om_specs =  $pageData["processing"]["om_specs"];
        $data = $pageData["processing"];

        $processControl  = new ProcessController();

        //Get model data
        $modelDb = $this->dataBaseBank('models');
        $currentModel =   $pageData["model"];
        $models = $processControl->getModel($modelDb, $currentModel);
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();
      
        $creatBatch =  $processControl->Batching($process,  $reference_id, $reference_lot_number, $data);
        $batchDetails = $creatBatch->toArray();
        unset($batchDetails['id']);
        
        $detailsBatchNumber = $batchDetails["batch_number"];
        $currentDBProcess = $this->dataBaseBank($process);


        if ($detailsBatchNumber  >  1) {
            $copyBatch =   $processControl->checkBatch2($batchDetails["datalist_id"], $batchDetails["datalist_lot_number"], $currentDBProcess,$om_specs,$process_number);
            $copyArray =  $copyBatch  ? $copyBatch->toArray() : null;
            
         
            //add object if not needed in copy batch
            $removeItems = ["perpendicularity","mass_pro",'points',"parallelism","histogram_point","magnet"];

            foreach ($removeItems as $notNeeded) {
                unset($copyArray[$notNeeded]);
            }
            $copyJSON =  $copyArray ? json_encode($copyArray) : null;
        }

        $dbAdjust = $this->dataBaseBank('adjustment');
        $getAdjust = $processControl->checkBatch3($reference_id, $dbAdjust,$process, $batchDetails["batch_number"],$process_number )->toArray();

        if ($creatBatch) return redirect()->back()->with([
            'success' => 'Successfully created new batch!',
            'current_lot' => $creatBatch,
            'model' => $convertModel,
            'copy_batch' => $copyJSON,
            'adjustment' =>$getAdjust
        ]);

        return redirect()->back()->with('error', 'Batch creation failed');
    }

    public function autosave(Request $request)
    {
        return redirect()->back();
        $form = $request->input('processForm');
        $process =  $form['data']['process'] ?? null;
        $page =  $form['data']['page'] ?? null;
        if (!$form || !$process && !$page) return redirect()->back()->with('error', 'Data not found!');
        $data = $form['details'];
        if (!$data)  return redirect()->back()->with('error', 'No data found!');


        foreach ($form as $key => $value) {
            if ($key !== 'data' && $key !== 'details') {
                $convertedData = json_encode($value);
                $data[$key] = $convertedData;
            }
        }

        $db = $this->dataBaseBank($process);
        $getSaving = new ProcessController();


        $udpateResult =  $getSaving->updateQuery($db, $data, $data['batch_number'], $data['datalist_id']);

        if (!$udpateResult)  return redirect()->back()->with('error', 'Update failed!');

        $convertedDetails = json_encode($udpateResult);
        if ($convertedDetails) return redirect()->back()->with(['success' => 'Saved Successfully[Datalist]!', 'existing' => $convertedDetails]);

        return redirect()->back()->with('error', 'Auto saving failed!');
    }

    public function finalizeProcess(Request $request)
    {
      
        $finalizeBank = [
            "preparing" => "prepared",
            "measuring" => "measured",
            "approved" => "approved"
        ];

        $form = $request->input('processForm') ?? null;
        $details = $form['details'];
        $data = $form['data'];
        $magnet = [];
  
        if (!$details) return redirect()->back()->with('error', 'Details not found! complete all data');
        // dd($request->all());

        $datalist_id = $details["datalist_id"] ?? null;
        $datalist_lot_number = $details["datalist_lot_number"] ?? null;
        $batch_number = $details["batch_number"] ?? null;
        $status = $details["status"] ?? 'preparing';
        $process = $data['process'] ?? null;

        /** slicing update , no useEffect  */
        $data['lot_number']  ? $details["datalist_lot_number"] = $data['lot_number'] : null;        
        $data['shift']  ? $details["shift"] = $data['shift'] : null;
        $data['operator_name']  ? $details["operator_name"] = $data['operator_name'] : null;
        $data['checker']  ? $details["checker"] = $data['checker'] : null;
        $data['staff_engineer']  ? $details["staff_engineer"] = $data['staff_engineer'] : null;
        $data['om_specs']  ? $details["om_specs"] = $data['om_specs'] : null;
        $data['process_number']  ? $details["process_number"] = $data['process_number'] : null;        

        $checkPointForm = $form["points"] ?? null;
        if ($checkPointForm && $process === 'barelling') {
            if (($form["points"]["chamfer1"] || $form["points"]["chamfer2"])) {
                $form["points"]["chamfer1"] ? $magnet["chamfer1"] = $form["points"]["chamfer1"] : null;
                $form["points"]["chamfer2"] ? $magnet["chamfer2"] = $form["points"]["chamfer2"] : null;
            }
        }

        if ($status === 'preparing') unset($form["points"]);
       
        if (!$datalist_id || !$datalist_lot_number || !$batch_number || !$status || !$process ||  !$details["process_number"] ||  !$details["om_specs"]) return redirect()->back()->with('error', 'Finalize:Details not found![missing data!]');

        //merge all data
        foreach ($form as $key => $value) {
            if ($key !== 'data' && $key !== 'details' && $key !== 'model') {
                $details[$key] = $value;
            }
        }
        $details['status'] =  $finalizeBank[$status];
        unset($details['created_at']);
        unset($details['updated_at']);

        $db = $this->dataBaseBank($process);
        $databaseProcess = new ProcessController;

        //measuring points
        if ($process === 'barelling') {
            $details["magnet"] = $magnet;
        }

        //Get model data
        $modelDb = $this->dataBaseBank('models');

        $currentModel =   $form["model"];
        $models = $databaseProcess->getModel($modelDb, $currentModel);

       
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();
        $result = $databaseProcess->updateQuery($db, $details, $details["batch_number"], $details["datalist_id"], $details["process_number"], $details["om_specs"]);
    
        if (!$result) return redirect()->back()->with('error', 'Finalized not updated!');

        

        $convertData = json_encode($result);
        $page = $data["page"];
        $shift = $data["shift"];
        $ip = $request->ip();
        $lot_number = $data["lot_number"];

        $modelProcessing =  $form['model'] ??null;
        $this->saveToLogs($page , $request->all(), $ip,'','',$lot_number,'finalize',$modelProcessing,$process,$shift );

        //get adjustment 
        $dbAdjust = $this->dataBaseBank('adjustment');
        $getAdjust = $databaseProcess->checkBatch3($datalist_id, $dbAdjust,$process,$details["batch_number"] ,$details["process_number"])->toArray();

        if ($result) return redirect()->back()->with([
            'success' => 'Finalized successfully status updated!',
            'existing' => $convertData,
            'model' => $convertModel,
            'adjustment' => $getAdjust  
        ]);
        return redirect()->back()->with('success', 'All details found!');
    }


    public function proceedToNext(Request $request)
    {
        $form = $request->input('processForm');
        $data = $form["data"] ?? null;
        $details = $form["details"] ?? null;

        if (!$form || !$details || !$data) return redirect()->back()->with('error', 'Data Missing![Proceed]');

        $bankStatus = [
            "prepared" => "measuring",
            "measured" => "approved"
        ];
        
        $dataUpdate = [];
        if (!$details["status"]) return redirect()->back()->with('error', 'Status not find![Proceed]');

        $dataUpdate["status"] =   $bankStatus[$details["status"]];
        $id =  $details["datalist_id"] ?? null;
        $batch_number = $details["batch_number"] ?? null;
        $lot_number = $details["datalist_lot_number"] ?? null;
        $process_number = $details["process_number"] ?? null;
        $om_specs = $details["om_specs"] ?? null;

        $process = $data["process"] ?? null;
        if (!$dataUpdate || !$id || !$batch_number || !$process || !$lot_number) return redirect()->back()->with('error', 'Incomplete data cannot be updated![Proceed]');
        $db = $this->dataBaseBank($process);
        $processQuery = new ProcessController;

        //Get model data
        $modelDb = $this->dataBaseBank('models');

        $currentModel =   $form["model"];
        $models = $processQuery->getModel($modelDb, $currentModel);
        //Get adjustment 

        $dbAdjust = $this->dataBaseBank('adjustment');
        $getAdjust = $processQuery->checkBatch3($id, $dbAdjust,$process, $batch_number ,$process_number)->toArray();
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();
       
        $updateData = $processQuery->updateQuery($db, $dataUpdate, $batch_number, $id , $process_number ,$om_specs);

        if (!$updateData) return redirect()->back()->with('error', "Failed proceeding to " . $bankStatus[$details["status"]] . "! ");
     
        $convertData = json_encode($updateData);
        $ip = $request->ip();
        $page = $data['page'] ?? null ;
        $modelProcessing =  $form["model"];
        $shift = $data['shift'] ?? null;

        $this->saveToLogs($page , $request->all(), $ip,'','',$lot_number,'proceed[ '.$bankStatus[$details["status"]].']',$modelProcessing,$process,$shift);

        if (!$convertData) return redirect()->back()->with('error', " " . $lot_number . " not exist!");

        return redirect()->back()->with([
            'success' => " " . $lot_number . " proceeds to " . $bankStatus[$details["status"]] . " exist!",
            "existing" => $convertData,
            "model" => $convertModel,
            "adjustment" =>  $getAdjust
        ]);
    }

    public function getDetails(Request $request)
    {
        $process = $request->input('process');
        $batch = $request->input('batch');
        $id = $request->input('id');
        $model = $request->input('model');
        $process_number = $request->input('process_number');
        $om_specs = $request->input('om_specs');

        if (!$process && !$batch && !$id && !$model && !$process_number  && !$om_specs) return redirect()->back()->with('error', '[Updating]Failed: Missing Data!');
    
        $bank = $this->dataBaseBank($process);

        if (!$bank) return redirect()->back()->with('error', '[Updating]Failed: Process database not found!');
        // dd($process_number,$om_specs);
        /* get details of all pages */
        $isGetDetails = $bank::where('datalist_id', $id)->where('batch_number', $batch)->where('process_number',$process_number)->where('om_specs',$om_specs)->first();

        $processQuery = new ProcessController;

        //Get model data
        $modelDb = $this->dataBaseBank('models');
        $models = $processQuery->getModel($modelDb, $model);
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();

        //get adjustment
        $dbAdjust = $this->dataBaseBank('adjustment');
        $getAdjust = $processQuery->checkBatch3($id, $dbAdjust,$process, $batch ,$process_number)->toArray();
        if ($isGetDetails) {
            $convertedDetails = json_encode($isGetDetails->toArray());
            return redirect()->back()->with([
                'success' => $isGetDetails->datalist_lot_number . ' for update data exist!!',
                'existing' => $convertedDetails,
                'model' => $convertModel,
                "adjustment" =>  $getAdjust
            ]);
        }
        dd($request->all(), $bank, $isGetDetails->toArray());
    }

    //save partial data (perpendicularity histogram)

    public function updateData(Request $request)
    {
      
        $form = $request->input('processForm') ?? null;
        if (!$form) return redirect()->back()->with('error', "Data not found!");
        $data =  $form["details"];
        $identifyData =   $form["data"];

        if (!$identifyData) return redirect()->back()->with('error', "Process not found!");
        foreach ($form as $key => $value) {
            if ($key !== 'data' && $key !== 'details') {
                $data[$key] = $value;
            }
        }

     
        $process =  $identifyData['process'] ?? null;
        $batch_number = $data['batch_number'] ?? null;
        $model = $data["model"] ?? null;
        $db = $this->dataBaseBank($process);
        $id = $data['datalist_id'] ?? null;
        
        $updateData  = new ProcessController;

        //get model 

        $modelDb = $this->dataBaseBank('models');
        $models = $updateData->getModel($modelDb, $model);
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();

        if (!$process || !$batch_number || !$db || !$id) return redirect()->back()->with('error', '[Updating]Failed: Missing data!');
        $page = $identifyData["page"];
        $shift = $identifyData["shift"];
        $lotNumber = $identifyData["lot_number"];
         $om_specs = $identifyData["om_specs"];
        $process_number = $identifyData["process_number"];
        $ip = $request->ip();
        $result = $updateData->updateQuery($db, $data, $batch_number, $id,$process_number,$om_specs );
        $this->saveToLogs($page , $request->all(), $ip,'','',$lotNumber,'update',$model,$process,$shift );
        if ($result) return redirect()->back()->with(['success'=> '[Updating--]Pic updated successfully!','model'=> $convertModel ]);

        return redirect()->back()->with('error', '[Updating]Error 404!');
    }


    public function partSave(Request $request)
    {
        $data = $request->input('data');
        $points =  $data['points'] ?? null;
        $process = $data['process'] ?? null;
        $details = $data['details'] ?? null;
        $om_specs = $data['om_specs'] ?? null;
        $process_number = $data['process_number'];

        if (!$points || !$process) return redirect()->back()->with('error', '[Part Updating]Missing Data!');
        $updateData =  new ProcessController;
        $dbuse = $this->dataBaseBank($process);
        $batch_number = $details["batch_number"];
        $id = $details["datalist_id"];
       
        $result = $updateData->updateQuery($dbuse, $points, $batch_number, $id, $process_number, $om_specs);

        if ($result) return redirect()->back()->with('success', 'Updated successfully!');

        return redirect()->back()->with('error', '[Part Updating]Error 404!');
    }

    public function adjustmentForm(Request $request)
    {
       
        $data = $request->all();
        $adjustment = $data['adjustment'] ? $data['adjustment']:null;
        $details = $data['details'] ? $data['details']:null;
        $specs = $data['specs'] ? $data['specs']:[];

        $batch_number = $details["batch_number"] ?? null;
        $process_number = $details["process_number"] ?? null;
        $process = $details["process"] ?? null;
        $model_name = $details["model_name"] ?? null;
        $lot_number = $details["lot_number"] ?? null;
        $datalist_id = $details["id"] ?? null;

        $machine = $adjustment["machine"] ?? null;
        $operator = $adjustment["operator"] ?? null;
        $checked_by = $adjustment["checked_by"] ?? null;
        $deffect = $adjustment["deffect"] ?? null;
        $adjustment_made = $adjustment["adjustment_made"] ?? null;
        $tb_no = $adjustment["tb_no"] ?? null;
        $pt_1 = $adjustment["pt_1"] ?? null;
        $pt_2 = $adjustment["pt_2"] ?? null;
        $pt_3 = $adjustment["pt_3"] ?? null;
        $pt_4 = $adjustment["pt_4"] ?? null;
        $pt_5 = $adjustment["pt_5"] ?? null;
        $appearance_checking = $adjustment["appearance_checking"] ?? null;
        $final_result = $adjustment["final_result"] ?? null;
     
        //details
        $date = $details['date'] ?? null;
        $width = key_exists("width" , $specs) && $specs["width"] &&  key_exists("width" , $adjustment) ? $adjustment["width"] : null;
        $length = key_exists("length" , $specs) && $specs["length"] && key_exists("length" , $adjustment) ? $adjustment["length"] : null;
        $thickness = key_exists("thickness" , $specs) && $specs["thickness"] && key_exists("thickness" , $adjustment) ? $adjustment["thickness"] : null;
        $height = key_exists("height" , $specs) && $specs["height"] &&  key_exists("height" , $adjustment) ? $adjustment["height"] : null;
        $chamfer = key_exists("chamfer" , $specs) && $specs["chamfer"] &&  key_exists("chamfer" , $adjustment) ? $adjustment["chamfer"] : null;
        $center_off = key_exists("center_off" , $specs) && $specs["center_off"]  &&  key_exists("center_off" , $adjustment) ? $adjustment["center_off"] : null;
        $angularity = key_exists("angularity" , $specs) && $specs["angularity"] &&  key_exists("angularity" , $adjustment) ? $adjustment["angularity"] : null;
        $perpen = key_exists("perpen" , $specs) && $specs["perpen"] &&  key_exists("perpen" , $adjustment) ? $adjustment["perpen"] : null;
        $flatness = key_exists("flatness" , $specs) && $specs["flatness"] &&  key_exists("flatness" , $adjustment) ? $adjustment["flatness"] : null;
        $chamfer_point = $adjustment["chamfer_point"] ?? null;
        $center_off_point = $adjustment["center_off_point"] ?? null;
        $angularity_point = $adjustment["angularity_point"] ?? null;
        $perpen_point = $adjustment["perpen_point"] ?? null;
        $flatness_point = $adjustment["flatness_point"] ?? null;
        
        $bank = $this->dataBaseBank($process);
        $isGetDetails = $bank::where('datalist_id', $datalist_id)->where('batch_number', $batch_number)->where('process_number',$process_number)->first();
        $convertedDetails = json_encode($isGetDetails->toArray());
        $processQuery = new ProcessController;

        //Get model data
        $modelDb = $this->dataBaseBank('models');
        $models = $processQuery->getModel($modelDb, $model_name);
        if (!$models) return redirect()->back()->with('error', 'Model database not found!');
        $convertModel = $models->toArray();

        if
        (
            !$batch_number || !$lot_number || !$process_number || !$process || !$model_name || !$machine || !$operator  || 
            !$checked_by || !$deffect || !$adjustment_made || ! $appearance_checking || !$final_result || !$tb_no || 
            !$pt_1 || !$pt_2 || !$pt_3 || ! $pt_4 || !$pt_5 || !$datalist_id
        ) return redirect()->back()->with([
                'error' => 'Incomplete data!',
                'existing' => $convertedDetails,
                'model' => $convertModel
            ]);

        $checkAdjustmentNumber = AdjustmentModels::where('datalist_id',$datalist_id)
                                                   ->where('process_number',$process_number)
                                                   ->where('batch_number',$batch_number)
                                                   ->where('process',$process)
                                                   ->orderBy('adjustment','desc')->first();
      

        $adjustment_number = $checkAdjustmentNumber && $checkAdjustmentNumber->adjustment ? intval($checkAdjustmentNumber->adjustment)  + 1 : 1;
        
        try{
            $result = AdjustmentModels::create([
                                                    'datalist_id' => $datalist_id ,
                                                    'adjustment' => $adjustment_number,
                                                    'date' => $date,
                                                    'batch_number' => $batch_number,
                                                    'process_number' =>$process_number ,
                                                    'process' => $process,
                                                    'machine' => $machine,
                                                    'model_name' => $model_name,
                                                    'lot_number' => $lot_number,
                                                    'operator'=>$operator ,
                                                    'checked_by' =>$checked_by,
                                                    'width' => $width,
                                                    'length'=> $length,
                                                    'thickness'=> $thickness,
                                                    'height'=> $height,
                                                    'chamfer'=> $chamfer,
                                                    'center_off'=> $center_off,
                                                    'angularity'=> $angularity,
                                                    'perpen'=> $perpen,
                                                    'flatness'=> $flatness,
                                                    'deffect'=> $deffect,
                                                    'adjustment_made' => $adjustment_made,
                                                    'tb_no'=>$tb_no,
                                                    'pt_1'=>$pt_1,
                                                    'pt_2'=>$pt_2,
                                                    'pt_3'=>$pt_3,
                                                    'pt_4'=>$pt_5,
                                                    'pt_5'=>$pt_1,
                                                    'chamfer_point'=>$chamfer_point,
                                                    'center_off_point'=>$center_off_point,
                                                    'angularity_point'=>$angularity_point,
                                                    'perpen_point'=>$perpen_point,
                                                    'flatness_point'=>$flatness_point,
                                                    'appearance_checking'=>$appearance_checking,
                                                    'final_result'=>$final_result,
                                                    'created_at' => Carbon::now(),
                                                    'updated_at' => Carbon::now(),
                                            ]);
            
                                            
            if($result){
                
                $getallDetails = AdjustmentModels::where('datalist_id', $datalist_id)
                                                    ->where('process_number',$process_number)
                                                    ->where('batch_number',$batch_number)
                                                    ->where('process',$process)
                                                    ->orderBy('adjustment','desc')->paginate(15);
                                                   
                return redirect()->back()->with([
                    'success' => 'Adjustment added!.',
                    'adjustment' => $getallDetails ? $getallDetails->toArray():null,
                    'existing' => $convertedDetails,
                    'model' => $convertModel
                ]);
                
            }
        }catch(Exception $e){
            dd($e);
            return redirect()->back()->with('error','Error saving adjustment!.');
        }
        
        dd($request->all());
    }   
//     ///oldd stufffffffffffffffff
//     public function loadModels()
//     {
//         $models = ModelDetails::all('*');
//         $modified = [];

//         foreach ($models as  $key => $values) {
//             $data = $values->toArray();
//             $modified[$data["model"]] =    $data;
//         }

//         $this->finalModel = json_encode($modified);
//     }

//     public function inprocess(Request $request)
//     {
//         $this->loadModels();

//         $lot =  $request->input('lot');
//         $model = strtoupper($request->input('model'));
//         $total_lot =  $request->input('total_lot');
//         $isLotExist = Data::where('lot', $lot)->first();

//         if ($lot && !$total_lot) {
//             //detect changes in lot only
//             $theme =  !$isLotExist ? 'success-container' : 'error-container';
//             $isExist = !$isLotExist ? ' not  exist save data' : ' exist update data';
//             $message = $model . ' Lot No.: ' . $lot  . $isExist;
//             return Inertia::render('Home', [
//                 'flash' => [$theme => $message],
//                 'LotData' => $isLotExist ? true : false,
//                 'detailsLot' => $isLotExist,
//                 'modelsList' => $this->finalModel
//             ]);
//         }

//         $validated = $request->validate([
//             'model' => 'required|string',
//             'lot'   => 'required|string',
//             'date'  => 'required|date',
//         ]);


//         try {

//             Data::create([
//                 ...$request->except(['pt_data', 'barrelling', 'timer']),
//                 'pt_data'    => $request->pt_data,
//                 'barrelling' => $request->barrelling,
//                 'timer'     => $request->timer,
//             ]);

//             return Inertia::render('Home', [
//                 'flash' => ['success-container' => $request->input('model') . ' Lot No.: ' . $lot  . ' saved successfully!'],
//                 'modelsList' => $this->finalModel
//             ]);
//         } catch (Exception $e) {
//             dd($e);
//         }
//     }

//     // public function update(Request $request)
//     // {
//     //     $this->loadModels();
//     //     $validated = $request->validate([
//     //         'model' => 'required|string',
//     //         'lot'   => 'required|string',
//     //         'date'  => 'required|date',
//     //     ]);

//     //     $lot = $request->input('lot');
//     //     $model = strtoupper($request->input('model'));
//     //     if (!$validated) {
//     //         return Inertia::render('Home', [
//     //             'flash' => ['error-container' => 'Update fail please Complete all details for the update'],
//     //             'modelsList' => $this->finalModel
//     //         ]);
//     //     }
//     //     try {
//     //         $updated = Data::where('lot', $lot)->update([
//     //             ...$request->except(['pt_data', 'barrelling', 'timer']),
//     //             'barrelling' => json_encode($request->barrelling, JSON_UNESCAPED_UNICODE),
//     //             'pt_data'    => json_encode($request->pt_data, JSON_UNESCAPED_UNICODE),
//     //             'timer'      => json_encode($request->timer, JSON_UNESCAPED_UNICODE),
//     //         ]);

//     //         $newUpdatedLot = [];
//     //         $isLotExist = Data::where('lot', $lot)->first();


//     //         $theme =  $updated ? 'success-container' : 'error-container';
//     //         $isExist = $updated ? ' updated successfully!' : ' update failed!';
//     //         $message = $model . ' Lot No.: ' . $lot  . $isExist;

//     //         return Inertia::render('Home', [
//     //             'flash' => [$theme => $message],
//     //             'LotData' => $isLotExist ? true : false,
//     //             'detailsLot' => $isLotExist->getAttributes(),
//     //             'modelsList' => $this->finalModel
//     //         ]);
//     //     } catch (Exception $e) {
//     //         return Inertia::render('Home', [
//     //             'flash' => ['error-container' => 'Cannot update please contact automation!'],
//     //             'modelsList' => $this->finalModel
//     //         ]);
//     //     }
//     // }

//     public function saveManage(Request $request)
//     {
//         $this->loadModels();
//         //User
//         $process = $request->input('process') ?? null;
//         $area = $request->input('area') ?? null;
//         $ip_address = $request->input('ip_address') ?? null;
//         $name = $request->input('name') ?? null;
//         $surname = $request->input('surname') ?? null;
//         $permission = $request->input('permission') ?? null;
//         $id_number = $request->input('id_number') ?? null;


//         //Model
//         $chamfer_barelling_max = $request->input('chamfer_barelling_max') ?? null;
//         $chamfer_barelling_min = $request->input('chamfer_barelling_min') ?? null;
//         $chamfer_barelling_target = $request->input('chamfer_barelling_target') ?? null;
//         $chamfer_type = $request->input('chamfer_type') ?? null;
//         $barelling_max = $request->input('barelling_max') ?? null;
//         $barelling_min = $request->input('barelling_min') ?? null;
//         $barelling_target = $request->input('barelling_target') ?? null;
//         $cghl_max = $request->input('cghl_max') ?? null;
//         $cghl_min = $request->input('cghl_min') ?? null;
//         $cghl_target = $request->input('cghl_target') ?? null;
//         $flatness_lapping = $request->input('flatness_lapping') ?? null;
//         $height_lapping = $request->input('height_lapping') ?? null;
//         $lappingt_max = $request->input('lappingt_max') ?? null;
//         $lappingt_min = $request->input('lappingt_min') ?? null;
//         $lappingt_target = $request->input('lappingt_target') ?? null;
//         $parallelism_lapping = $request->input('parallelism_lapping') ?? null;
//         $slicing_max = $request->input('slicing_max') ?? null;
//         $slicing_min = $request->input('slicing_min') ?? null;
//         $slicing_target = $request->input('slicing_target') ?? null;
//         $model = strtoupper($request->input('model')) ?? null;

//         $modelData = [
//             "chamfer_barelling_max" => $chamfer_barelling_max,
//             "chamfer_barelling_min" => $chamfer_barelling_min,
//             "chamfer_barelling_target" => $chamfer_barelling_target,
//             "chamfer_type" =>  $chamfer_type,
//             "barelling_max" => $barelling_max,
//             "barelling_min" => $barelling_min,
//             "barelling_target" => $barelling_target,
//             "cghl_max" => $cghl_max,
//             "cghl_min" => $cghl_min,
//             "cghl_target" => $cghl_target,
//             "flatness_lapping" => $flatness_lapping,
//             "height_lapping" => $height_lapping,
//             "lappingt_max" => $lappingt_max,
//             "lappingt_min" => $lappingt_min,
//             "lappingt_target" => $lappingt_target,
//             "parallelism_lapping" => $parallelism_lapping,
//             "slicing_max" => $slicing_max,
//             "slicing_min" => $slicing_min,
//             "slicing_target" => $slicing_target,
//             "model" => $model,
//         ];

//         $userData = [
//             "area" => $area,
//             "ip_address" => $ip_address,
//             "name" => $name,
//             "surname" => $surname,
//             "permission" => $permission,
//             "id_number" => floatval($id_number),
//         ];

//         $validateUser = [
//             "area" => 'required',
//             "ip_address" => 'required',
//             "name" => 'required',
//             "surname" => 'required',
//             "id_number" => 'required',
//         ];

//         $validateModel = [
//             'model' => 'required',
//             "barelling_max" => 'required',
//             "barelling_min" => 'required',
//             "barelling_target" => 'required',
//             "chamfer_barelling_max" => 'required',
//             "chamfer_barelling_min" => 'required',
//             "chamfer_barelling_target" => 'required',
//             "chamfer_type" => 'required',
//             "cghl_max" => 'required',
//             "cghl_min" => 'required',
//             "cghl_target" => 'required',
//             "flatness_lapping" => 'required',
//             "height_lapping" => 'required',
//             "lappingt_max" => 'required',
//             "lappingt_min" => 'required',
//             "lappingt_target" => 'required',
//             "parallelism_lapping" => 'required',
//             "slicing_max" => 'required',
//             "slicing_min" => 'required',
//             "slicing_target" => 'required',


//         ];

//         $validateBeforeUpdate =  $process === 'User' ? $validateUser : $validateModel;

//         $CompleteData =  $request->validate($validateBeforeUpdate);

//         if (!$CompleteData) {
//             return Inertia::render('Home', ['flash' => ['error-container' => "Incomplete Data!"], 'modelsList' => $this->finalModel]);
//         };

//         try {

//             $isSaved = false;
//             if ($process === 'Model') {
//                 $isExist = models::where('model', $model)->first();

//                 if (!$isExist) {
//                     $isSaved = models::create($modelData);
//                 }
//             } else if ($process === 'User') {
//                 $isExist = Users::where('id_number', $id_number)->first();
//                 if (!$isExist) {
//                     $isSaved = Users::create($userData);
//                 }
//             }
//             if ($isSaved) {
//                 $data = $process === 'Model' ? $model : $id_number;
//                 return Inertia::render('Home', [
//                     'flash' => ['success-container' => " " . $process . " " . $data . " Successfully saved!"],
//                     'modelsList' => $this->finalModel
//                 ]);
//             }
//             // if duplicate
//             return Inertia::render('Home', [
//                 'flash' => ['error-container' => " " . $process . " already exist!"],
//                 'dataExist' => [$process => $isExist],
//                 'modelsList' => $this->finalModel
//             ]);
//         } catch (Exception $e) {
//             dd($e->getMessage());
//         }
//     }

//     public function allDataDisplay()
//     {
//         $this->loadModels();
//         $allUser = Users::paginate(10, ['*'], 'user_page');
//         return Inertia::render('Home', [
//             'allUser' => $allUser,
//             'modelsList' => $this->finalModel
//         ]);
//     }

//     public function updateManager(Request $request)
//     {
//         $this->loadModels();


//         $isProcessString = $request->validate([
//             "process" => 'string|required'
//         ]);

//         if (!$isProcessString) return Inertia::render('Home', ['flash' => ['error-container' => "Invalid process type"], 'modelsList' => $this->finalModel]);

//         //User
//         $process = $request->input('process') ?? null;
//         $area = $request->input('area') ?? null;
//         $ip_address = $request->input('ip_address') ?? null;
//         $name = $request->input('name') ?? null;
//         $surname = $request->input('surname') ?? null;
//         $permission = $request->input('permission') ?? null;
//         $id_number = $request->input('id_number') ?? null;


//         //Model
//         $chamfer_barelling_max = $request->input('chamfer_barelling_max') ?? null;
//         $chamfer_barelling_min = $request->input('chamfer_barelling_min') ?? null;
//         $chamfer_barelling_target = $request->input('chamfer_barelling_target') ?? null;
//         $chamfer_type = $request->input('chamfer_type') ?? null;
//         $barelling_max = $request->input('barelling_max') ?? null;
//         $barelling_min = $request->input('barelling_min') ?? null;
//         $barelling_target = $request->input('barelling_target') ?? null;
//         $cghl_max = $request->input('cghl_max') ?? null;
//         $cghl_min = $request->input('cghl_min') ?? null;
//         $cghl_target = $request->input('cghl_target') ?? null;
//         $flatness_lapping = $request->input('flatness_lapping') ?? null;
//         $height_lapping = $request->input('height_lapping') ?? null;
//         $lappingt_max = $request->input('lappingt_max') ?? null;
//         $lappingt_min = $request->input('lappingt_min') ?? null;
//         $lappingt_target = $request->input('lappingt_target') ?? null;
//         $parallelism_lapping = $request->input('parallelism_lapping') ?? null;
//         $slicing_max = $request->input('slicing_max') ?? null;
//         $slicing_min = $request->input('slicing_min') ?? null;
//         $slicing_target = $request->input('slicing_target') ?? null;
//         $model = strtoupper($request->input('model')) ?? null;

//         $modelData = [
//             "barelling_max" => $barelling_max,
//             "barelling_min" => $barelling_min,
//             "barelling_target" => $barelling_target,
//             "chamfer_barelling_max" => $chamfer_barelling_max,
//             "chamfer_barelling_min" => $chamfer_barelling_min,
//             "chamfer_barelling_target" => $chamfer_barelling_target,
//             "chamfer_type" => $chamfer_type,
//             "cghl_max" => $cghl_max,
//             "cghl_min" => $cghl_min,
//             "cghl_target" => $cghl_target,
//             "flatness_lapping" => $flatness_lapping,
//             "height_lapping" => $height_lapping,
//             "lappingt_max" => $lappingt_max,
//             "lappingt_min" => $lappingt_min,
//             "lappingt_target" => $lappingt_target,
//             "parallelism_lapping" => $parallelism_lapping,
//             "slicing_max" => $slicing_max,
//             "slicing_min" => $slicing_min,
//             "slicing_target" => $slicing_target,
//             "model" => $model,
//         ];

//         $userData = [
//             "area" => $area,
//             "ip_address" => $ip_address,
//             "name" => $name,
//             "surname" => $surname,
//             "permission" => $permission,
//             "id_number" => floatval($id_number),
//         ];

//         $process = $request->input('process');
//         $id_number = $request->input('id_number') ?? null;
//         $model = strtoupper($request->input('model')) ?? null;

//         $checkIfexist =  $process === 'User' ? Users::where('id_number', $id_number)->update($userData) : models::where('model', $model)->update($modelData);
//     }

//     public function checkExist(Request $request)
//     {

//         $this->loadModels();
//         $isProcessExist = $request->validate(['process' => "string|required"]);

//         if (!$isProcessExist && $isProcessExist === '') return Inertia::render('Home', ["flash" => "Invalid process type", 'modelsList' => $this->finalModel]);

//         $process = $request->input('process') ?? null;

//         if ($process === 'User') {
//             $idNumber = $request->input('id_number');
//             $isExist = Users::where('id_number', $idNumber)->first();

//             if ($isExist)  return Inertia::render(
//                 'Home',
//                 [
//                     'flash' => ['success-container' => 'Already exist , Please Update Data'],
//                     'dataExist' => [$process => $isExist],
//                     'availabilty' => $process,
//                     'modelsList' => $this->finalModel
//                 ]
//             );
//         } else if ($process === 'Model') {

//             $idNumber = $request->input('model');

//             $isExist = models::where('model', $idNumber)->first();
//             if ($isExist)  return Inertia::render(
//                 'Home',
//                 [
//                     'flash' => ['success-container' => 'Already exist , Please Update Data'],
//                     'dataExist' => [$process => $isExist],
//                     'availabilty' => $process,
//                     'modelsList' => $this->finalModel,

//                 ]
//             );
//         }

//         return Inertia::render('Home', [
//             'flash' => ['success-container' => 'Not exist , Please Create ' . $process . ' Data'],
//             'availabilty' => $idNumber,
//             'modelsList' => $this->finalModel
//         ]);
//     }


//     public function destroy(Request $request)
//     {
//         $this->loadModels();

//         $isValid = $request->validate([
//             "process" => "string|required",
//             "id" => "int|required"
//         ]);

//         if (!$isValid) return Inertia::render('Home', [
//             "flash" => ["error-container" => "Invalid data type!"],
//             'availabilty' => null,
//             'modelsList' => $this->finalModel
//         ]);

//         $process = $request->input('process');
//         $id = $request->input('id');
//         if ($process === 'User') {
//             $delete = Users::find($id);

//             if (!$delete) {
//                 return  Inertia::render('Home', [
//                     "flash" => ["error-container" => "Data Not Found!"],
//                     'availabilty' => null,
//                     'modelsList' => $this->finalModel
//                 ]);
//             }

//             $delete->delete();

//             if ($delete) return Inertia::render('Home', [
//                 "flash" => ["error-container" => "Data Already deleted permanently!"],
//                 'availabilty' => null,
//                 'modelsList' => $this->finalModel
//             ]);
//         } else if ($process === 'Model') {
//             $delete = models::find($id);

//             if (!$delete) {
//                 return  Inertia::render('Home', [
//                     "flash" => ["error-container" => "Data Not Found!"],
//                     'availabilty' => null,
//                     'modelsList' => $this->finalModel
//                 ]);
//             }

//             $delete->delete();

//             if ($delete) return Inertia::render('Home', [
//                 "flash" => ["error-container" => "Data Already deleted permanently!"],
//                 'availabilty' => null,
//                 'modelsList' => $this->finalModel
//             ]);
//         }
//     }
// }
}