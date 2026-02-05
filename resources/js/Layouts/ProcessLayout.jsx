export default function ProcessLayout(  dataHome ){
    const sampleCheck =  [1, 2, 3, 4, 5];
    const timeRotation = [1,2,3];
    const modelDetails = {
        'maximum':1.7,
        'minimum':1.0,
        'target':1.5
    }

   const [notificationMessage, setNotificationMessage] = useState(null);
   const [modelIsExist , setModelIsExist] = useState(LotData);
   const [updateData ,setUpdate] = useState(null);
   console.log(modelIsExist ,updateData);
    useEffect(()=>{
        if (!flash) return;
        Object.entries(flash).map(([key, value]) => {

            setNotificationMessage({
                title: key,
                message: value,
            });

            setTimeout(()=>{
                setNotificationMessage(null);
            },2000);

        });

    },[flash]);

    const {data,setData,post, processing, errors} = useForm({
        model:'',
        process:'',
        lot:'',
        total_lot:'',
        qty_lot:'',
        wt_lot:'',
        media_size:'',
        media_weight:'',
        coolant:'',
        styrenre:'',
        gc_powder:'',
        magnet_wt:'',
        chamfer_type:'',
        date:'',
        shift:'',
        operator:'',
        checker:'',
        staff_eng:'',
    });

    const { data: StatusData, setData: setStatusData} = useForm({
        staffDetails: 0,
        barrellingProcss:0,
        pointsDetails:0,
        timerDetails:0
    });
    const { data: LotContainer , setData: setLotContainer}  = useForm({
        lot:'',
    });
    const {data: timerData , setData: setTimerData } = useForm({
        time_1:'',
        rotation_1:'',
        time_2:'',
        rotation_2:'',
        time_3:'',
        rotation_3:'',
        addtime_1:'',
        addrotation_1:'',
        addtime_2:'',
        addrotation_2:'',
        addtime_3:'',
        addrotation_3:'',
    });
    const {data:barrellingProcss ,setData:setBarrelingProcess} = useForm({
        machine_no:'',
        machinesample_1:'',
        machinesample_2:'',
        machinesample_3:'',
        machinesample_4:'',
        machinesample_5:''
    });
    const {data:passwordContainer ,setData:setPasswordContainer }=useForm({
        password:'',
        isCorrect:''
    });
    const {data: points_pt, setData: setPoints}=useForm(
    {
        pt1_1:'',
        pt1_2:'',
        pt1_3:'',
        pt1_4:'',
        pt1_5:'',
        pt2_1:'',
        pt2_2:'',
        pt2_3:'',
        pt2_4:'',
        pt2_5:'',
        pt3_1:'',
        pt3_2:'',
        pt3_3:'',
        pt3_4:'',
        pt3_5:'',
        pt4_1:'',
        pt4_2:'',
        pt4_3:'',
        pt4_4:'',
        pt4_5:'',
        pt5_1:'',
        pt5_2:'',
        pt5_3:'',
        pt5_4:'',
        pt5_5:'',
    });
    const exclude = ['model','date','process']
    const dataClear = ['data','points_pt','timerData','barrellingProcss'];
    const formState = { data,points_pt,timerData,barrellingProcss};
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;
    function clearAllInput(){
        dataClear.forEach((name) => {
        Object.entries(formState[name])
            .filter(([key]) => !exclude.includes(key))
            .forEach(([key]) => {

                if(name === 'data'){
                    setData(key, '');
                }else if(name === 'points_pt'){
                    setPoints(key,'');
                }else if(name === 'timerData'){
                    setTimerData(key,'');
                }else if(name === 'barrellingProcss'){
                    setBarrelingProcess(key,'');
                }
            });
        });
    }
    useEffect(()=>{
        setData('date',currentDate);
    },[currentDate]);
    useEffect(()=>{

        if(!LotContainer) return;

        if(!LotContainer.lot){
            setUpdate(null);
            clearAllInput();
        }
        setUpdate(null);
        const lostSend = LotContainer.lot;
        const handler = setTimeout(() => {
            router.post('/machining-checklist', {
                lot:lostSend,
                model:data.model
            },{preserveScroll:true});
        }, 2000); // 2 seconds
        return () => clearTimeout(handler);


    },[LotContainer]);
    useEffect(()=>{
        if(!data)return;

        const countEmptyData=  Object.values(data).filter(value => value === '').length;
        const countEmptyBarrelingProcess =  Object.values(barrellingProcss).filter(value => value === '').length;
        const countEmptyPoints =  Object.values(points_pt).filter(value => value === '').length;
        const countEmptyTimer=  Object.entries(timerData).reduce(
                                                    (acc, [key, value]) =>
                                                        value === '' && !key.includes("add") ? acc + 1 : acc,
                                                    0
                                                );
        setStatusData('staffDetails',countEmptyData);
        setStatusData('barrellingProcss' , countEmptyBarrelingProcess);
        setStatusData('pointsDetails' , countEmptyPoints);
        setStatusData('timerDetails' , countEmptyTimer);
    },[data , barrellingProcss,points_pt,timerData]);

    useEffect(()=>{
        if(!detailsLot)return;
        setModelIsExist(detailsLot.lot);
    },[detailsLot]);
    // const [display , setDiFsplay] = useState(null);
    const handleClose=()=>{
       setData('lot','');
       setLotContainer('lot','');
       setPasswordContainer('password','');
       setPasswordContainer('isCorrect','');
       setModelIsExist(false);
       setUpdate(null);
      clearAllInput();


    }
    const handleSave = () => {
        // Convert Proxy objects to plain JS objects
        if(data && !data.lot) return;
        router.post('/machining-checklist', {
            ...data,
            pt_data:points_pt,
            barrelling:barrellingProcss,
            timer:timerData,

        },{preserveScroll:true});
        clearAllInput();

    };

    const handleUpdate=()=>{
        if(data && !data.lot) return;
        router.post('/machining-checklist/update', {
            ...data,
            pt_data:points_pt,
            barrelling:barrellingProcss,
            timer:timerData,

        },{preserveScroll:true});
    }
    const handlePICAllow =(keydown)=>{
        if(!keydown) return;

        if(passwordContainer.password === 'improvement'){
              setUpdate(true);
              setModelIsExist(false);
              setPasswordContainer('password','');
              dataClear.forEach((items)=>{
                Object.entries(formState[items]).map(([key,value])=>{
                    if(items === 'data'){
                        setData( key,detailsLot[key]);
                    }
                });
              });

              const convertToJSON = ["timer","barrelling","pt_data"];

              convertToJSON.forEach((toJson)=>{
                if(!detailsLot[toJson])return;
                Object.entries(detailsLot[toJson]).map(([key,value])=>{
                    if(toJson === 'timer'){
                        setTimerData(key,value);
                    }else if(toJson === 'barrelling'){
                        setBarrelingProcess(key,value);
                    }else if(toJson === 'pt_data'){
                        setPoints(key,value);
                    }
                })
              });

        }else{
            setPasswordContainer('isCorrect', 'Wrong password contact PIC!');
            setTimeout(()=>{
                setPasswordContainer('isCorrect','')
            },2000);
        }

    }
    const desicionStatus =(value)=>{
        //return status and color
        const numberConvert = Number(value);

        if (numberConvert > modelDetails.minimum && numberConvert < modelDetails.maximum){
            return { color:'green' , status:'GOOD'}
        }
         return { color:'red' , status:'NG'}
    }

    const goToNextInput = (pointData,name,data,e) => {

        if(pointData === 'point'){
            setPoints(name,data);
        }else if(pointData === 'sample'){
            setBarrelingProcess(name,data);
        }
        else{
            setData(name,data);
        }

        setTimeout(() => {
            const inputs = Array.from(
                    document.querySelectorAll("input, select, textarea, button")
                ).filter(el => !el.disabled && el.tabIndex !== -1);
            const index = inputs.indexOf(e.target);
            inputs[index + 1]?.focus();
        }, 300);

    };

    return(
        <>
        {
                !updateData && modelIsExist &&
                <div className='pic-password'>
                   <div className='enter-password'>
                    <button onClick={(e)=>handleClose()}><CrossIcon color={'red'}/></button>
                     <h4>NOTICE</h4>
                     <p>{detailsLot.model}&nbsp;Lot No.&nbsp;<strong>{detailsLot.lot}</strong>&nbsp;already&nbsp;exist&nbsp;update data!</p>
                     <div className='password-container'>
                        <input type="password"  placeholder='Enter password' className='admin-pic' onKeyDown={(e)=> e.key === "Enter" && handlePICAllow(e.target.value.toUpperCase())} onChange={(e)=>setPasswordContainer('password',e.target.value)}></input>
                        <button onClick={()=>{handlePICAllow(passwordContainer.password)}} >ENTER</button>
                     </div>
                     <p className='error-theme' style={{ fontStyle:'italic', fontWeight:'bold' }}>{passwordContainer.isCorrect}</p>
                   </div>
                </div>
            }
            {notificationMessage && <div className='notif-container' style={{ background:notificationMessage.title === 'success-container' ? 'green':'red' }}>
                <div className="notification-message">
                    <p>{notificationMessage.message}</p>
                </div>
            </div>}
        {
                data.model && data.process === 'inprocess' &&
                    <div className='inprocess-container'>
                        <div className='inprocess-details'>
                            <h1>IN-PROCESS INSPECTION SHEET</h1>
                            <div className='mode-container'>
                                <h3>MODEL:</h3>
                                <p>{data.model}</p>
                            </div>
                            <div className='selector-container'>
                                <div className='data-container'>
                                    <div className='data-input'>
                                        <label>Lot&nbsp;No:</label>
                                        <input  value={data.lot ?? null}  onChange=
                                            {
                                                (e)=>
                                                {
                                                    setData('lot',e.target.value.toUpperCase());
                                                    setLotContainer('lot',e.target.value.toUpperCase());
                                                }
                                            } disabled={modelIsExist && !updateData } ></input>
                                    </div>
                                    <div className='data-input' >
                                        <label>Total&nbsp;Batch/Lot:</label>
                                        <input type="number" value={data.total_lot ?? null} onChange={(e)=>setData('total_lot',e.target.value.toUpperCase())}  ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Total&nbsp;Qty/Lot:</label>
                                        <input type="number" value={data.qty_lot ?? null} onChange={(e)=>setData('qty_lot',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Total&nbsp;Wt./Lot:</label>
                                        <input type="number" value={data.wt_lot ?? null}  onChange={(e)=>setData('wt_lot',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Media&nbsp;Size:</label>
                                        <input  value={data.media_size ?? null}   onChange={(e)=>setData('media_size',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Media&nbsp;Weight:</label>
                                        <input  value={data.media_weight ?? null}   onChange={(e)=>setData('media_weight',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Coolant&nbsp;Level:</label>
                                        <input  value={data.coolant ?? null}   onChange={(e)=>setData('coolant',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Styrene&nbsp;Powder:</label>
                                        <input  value={data.styrenre ?? null}   onChange={(e)=>setData('styrenre',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>GC&nbsp;Powder:</label>
                                        <input  value={data.gc_powder ?? null}   onChange={(e)=>setData('gc_powder',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Magnet&nbsp;wt/pc.:</label>
                                        <input  value={data.magnet_wt ?? null}   onChange={(e)=>setData('magnet_wt',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Chamfer&nbsp;Type:</label>
                                        <input  value={data.chamfer_type ?? null}   onChange={(e)=>setData('chamfer_type',e.target.value.toUpperCase())} ></input>
                                    </div>
                                </div>
                                <div className='data-container'>
                                    <div className='data-input'>
                                        <label>Date:</label>
                                       <input value={currentDate} disabled={true} />
                                    </div>
                                    <div className='data-input'>
                                        <label>Shift:</label>
                                        <select  value={data.shift ?? null}   onChange={(e)=>setData('shift',e.target.value.toUpperCase())} >
                                            <option value=""></option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                    <div className='data-input'>
                                        <label>Operator:</label>
                                        <input  value={data.operator ?? null}   onChange={(e)=>setData('operator',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Checker:</label>
                                        <input   value={data.checker ?? null}   onChange={(e)=>setData('checker',e.target.value.toUpperCase())} ></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Staff/Engr:</label>
                                        <input  value={data.staff_eng ?? null}   onChange={(e)=>setData('staff_eng',e.target.value.toUpperCase())} ></input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='data-table'>
                            <div className='title-center'>
                                <h1>BARRELING MAGNET DATA TABLE</h1>
                            </div>
                             <div className='specs-table'>
                                <div>
                                    <div className='specs-details'>
                                        <h2>SPECS</h2>
                                        <div className='specs-max-data'>
                                            <h2>Maximum:</h2>
                                            <p>{modelDetails.maximum}</p>
                                        </div>
                                        <div className='specs-target-data'>
                                            <h2>Target:</h2>
                                            <p>{modelDetails.target}</p>
                                        </div>
                                        <div className='specs-min-data'>
                                            <h2>Minimum:</h2>
                                            <p>{modelDetails.minimum}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <table className='barreling-table' border={1}>
                                            <thead>
                                                <tr>
                                                    <th  colSpan={5}>Barreling Time:</th>

                                                </tr>
                                                <tr>
                                                    <th  colSpan={3}>Setting:</th>
                                                    <th colSpan={2}>Total/Final</th>

                                                </tr>
                                                <tr>
                                                    <th  colSpan={3}></th>
                                                    <th>Actual</th>
                                                    <th >Additional</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    timeRotation.map((i)=>{
                                                        return(
                                                            <tr>
                                                                <td>T{i}</td>
                                                                <td>
                                                                    <div className='input-container'>
                                                                        <p><strong>Time</strong></p>
                                                                        <p><strong>Rotation</strong></p>
                                                                    </div>
                                                                </td>
                                                                 <td>
                                                                    <div className='input-container'>
                                                                        <input type="number" value={timerData[`time_${i}`] ?? null} className='time-data'  onChange={(e)=>setTimerData(`time_${i}`,Number(e.target.value.toUpperCase()))}/>
                                                                        <input type="number" value={timerData[`rotation_${i}`] ?? null} className='rotation-data' onChange={(e)=>setTimerData(`rotation_${i}`,Number(e.target.value.toUpperCase()))}/>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='input-container'>
                                                                        <p ><strong>{timerData[`time_${i}`] && Number(timerData[`time_${i}`]) + Number(timerData[`addtime_${i}`]) +" hr/s"}</strong></p>
                                                                        <p ><strong>{timerData[`rotation_${i}`] && Number(timerData[`rotation_${i}`])+Number(timerData[`addrotation_${i}`])+" RPM"}</strong></p>
                                                                    </div>
                                                                </td>
                                                                <td>
                                                                    <div className='input-container'>
                                                                        <input type="number" value={timerData[`addtime_${i}`] ?? null} className='time-data'  onChange={(e)=>setTimerData(`addtime_${i}`,Number(e.target.value.toUpperCase()))}/>
                                                                        <input type="number" value={timerData[`addrotation_${i}`] ?? null}  className='rotation-data' onChange={(e)=>setTimerData(`addrotation_${i}`,Number(e.target.value.toUpperCase()))}/>
                                                                    </div>
                                                                </td>
                                                            </tr>

                                                        );
                                                    })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div>
                                    <table className='barreling-process' border={1}>
                                        <thead>
                                            <tr>
                                                <th colSpan={12} className='titletables'> BARRELING PROCESS</th>
                                            </tr>
                                            <tr>
                                                <th colSpan={7} className='titlesubtables'>MAGNET SAMPLES</th>
                                                <th colSpan={5} className='titlesubtables'>JUDGEMENT PER PIECE</th>
                                            </tr>
                                            <tr>
                                                <th></th>
                                                <th>No.</th>
                                                <th>Magnet 1</th>
                                                <th>Magnet 2</th>
                                                <th>Magnet 3</th>
                                                <th>Magnet 4</th>
                                                <th>Magnet 5</th>
                                                <th>Magnet 1</th>
                                                <th>Magnet 2</th>
                                                <th>Magnet 3</th>
                                                <th>Magnet 4</th>
                                                <th>Magnet 5</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Machine</th>
                                                <td><input  value={barrellingProcss.machine_no ?? null} onChange={(e)=>goToNextInput('sample','machine_no',e.target.value.toUpperCase())} className='specs-input'/></td>
                                                <td><input  type='number' value={barrellingProcss.machinesample_1 ?? null} onChange={(e)=>goToNextInput('sample','machinesample_1',e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                <td><input  type='number' value={barrellingProcss.machinesample_2 ?? null}  onChange={(e)=>goToNextInput('sample','machinesample_2',e.target.value.toUpperCase(),e)}  className='specs-input'/></td>
                                                <td><input  type='number' value={barrellingProcss.machinesample_3 ?? null}  onChange={(e)=>goToNextInput('sample','machinesample_3',e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                <td><input  type='number' value={barrellingProcss.machinesample_4 ?? null}  onChange={(e)=>goToNextInput('sample','machinesample_4',e.target.value.toUpperCase(),e)}  className='specs-input'/></td>
                                                <td><input  type='number' value={barrellingProcss.machinesample_5 ?? null}  onChange={(e)=>goToNextInput('sample','machinesample_5',e.target.value.toUpperCase(),e)}  className='specs-input'/></td>

                                                {
                                                    //return Judgement Barreling process
                                                   sampleCheck.map((i) => {
                                                        const sample = barrellingProcss[`machinesample_${i}`];
                                                        if (!sample) {
                                                            return <td key={i} style={{ background:'#F09189' , color:'white'}}>No data</td>;
                                                        }
                                                        const result = desicionStatus(sample);
                                                        return (
                                                            <td
                                                            key={i}
                                                            style={{ color: "white", background: result.color }}
                                                            >
                                                            {result.status}
                                                            </td>
                                                        );
                                                    })
                                                }


                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className='specs-table'>
                                <div>
                                     <table className='barreling-process' border={1}>
                                        <thead>
                                            <tr>
                                                <th colSpan={15} className='titletables'>ACTUAL DIMENSION</th>
                                            </tr>
                                            <tr>
                                                <th>No</th>
                                                <th className='pt-color'>Pt. 1</th>
                                                <th className='pt-color'>Pt. 2</th>
                                                <th className='pt-color'>Pt. 3</th>
                                                <th className='pt-color'>Pt. 4</th>
                                                <th className='pt-color'>Pt. 5</th>
                                                <th className='max-color'>Max</th>
                                                <th className='max-color'>Min</th>
                                                <th className='worst-color'>Worst</th>
                                                <th>Maximum</th>
                                                <th>Minimum</th>
                                                <th className='worst-color'>Target</th>
                                                <th>Max Diff</th>
                                                <th>Min Diff</th>
                                                <th>Average</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                                {
                                                    sampleCheck.map((i)=>{
                                                        let maxShow = 0;
                                                        let minShow = 0;
                                                         let currentMin = 0;


                                                        sampleCheck.map((j)=>{
                                                            currentMin = Number(points_pt[`pt${i}_${j}`]);
                                                            maxShow  = j > 0 &  Number(points_pt[`pt${i}_${j}`]) > maxShow ? Number(points_pt[`pt${i}_${j}`]) :  maxShow;
                                                            minShow =  minShow <= 0 ? currentMin : currentMin < minShow ? currentMin:minShow;
                                                        });


                                                        return(
                                                                <tr>
                                                                    <td>{i}</td>
                                                                    <td><input  type="number" value={points_pt[`pt${i}_1`] ?? null} id={`pt${i}_1`} onChange={(e)=>goToNextInput('point',`pt${i}_1`,e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                                    <td><input  type="number" value={points_pt[`pt${i}_2`] ?? null}  id={`pt${i}_2`} onChange={(e)=>goToNextInput('point',`pt${i}_2`,e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                                    <td><input  type="number" value={points_pt[`pt${i}_3`] ?? null}  id={`pt${i}_3`} onChange={(e)=>goToNextInput('point',`pt${i}_3`,e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                                    <td><input  type="number" value={points_pt[`pt${i}_4`] ?? null}  id={`pt${i}_4`} onChange={(e)=>goToNextInput('point',`pt${i}_4`,e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                                    <td><input  type="number" value={points_pt[`pt${i}_5`] ?? null}  id={`pt${i}_5`} onChange={(e)=>goToNextInput('point',`pt${i}_5`,e.target.value.toUpperCase(),e)} className='specs-input'/></td>
                                                                    <td>{maxShow > 0 && maxShow}</td>
                                                                    <td>{minShow}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td>5.600</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
                                                                </tr>
                                                        );
                                                    })
                                                }
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <table className='barreling-process' border={1}>
                                        <thead>
                                            <tr>
                                                <th>THICKNESS</th>
                                                <th>MAGNET 1</th>
                                                <th>MAGNET 2</th>
                                                <th>MAGNET 3</th>
                                                <th>MAGNET 4</th>
                                                <th>MAGNET 5</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan={6}>LT</td>
                                            </tr>
                                            <tr>
                                                <td>5.570 - 5.575</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.576 - 5.581</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.582 - 5.587</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.588 - 5.593</td>
                                               <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.594 - 5.599</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.600 - 5.605</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.606 - 5.611</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.612 - 5.617</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.618 - 5.623</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>5.624 - 5.630</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6}>HT</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='specs-bottom'>
                            <div className='specs-remarks'>
                                <div className='specs-remarks-container'>
                                    {StatusData.staffDetails > 1?
                                        <div  className="specs-requirements">
                                            <p className='error-theme'><strong>- Please Complete Details!</strong></p>
                                            <CrossIcon color="red"/>
                                        </div>:<p className='success-theme'><strong>- All Lot Details Compelted!</strong></p>}
                                    {StatusData.barrellingProcss > 0 ?
                                        <div className="specs-requirements">
                                            <p className='error-theme'><strong>- Measure Samples!</strong></p>
                                            <CrossIcon color="red"/>
                                        </div>:<p className='success-theme'><strong>- Read All Judgement!</strong></p>}
                                    {StatusData.pointsDetails > 0 ?
                                        <div className="specs-requirements">
                                            <p className='error-theme'><strong>- Measure Actual Samples!</strong></p>
                                            <CrossIcon color="red"/>
                                        </div>:<p className='success-theme'><strong>- Check All Points!</strong></p>}
                                    {StatusData.timerDetails > 0 ?
                                        <div className="specs-requirements">
                                            <p className='error-theme'><strong>- Input Timer & Rotation!</strong></p>
                                            <CrossIcon color="red"/>
                                        </div>:<p className='success-theme'><strong>- Check All Timer , Rotation and Additional!</strong></p>}
                                </div>
                                <label>REMARKS:</label><input value={data.remarks ??null} onChange={(e)=>setData('remarks',e.target.value.toUpperCase())}  className='specs-remarks' />
                            </div>
                            {
                                StatusData.staffDetails === 0 && StatusData.barrellingProcss === 0 && StatusData.pointsDetails === 0 && data && data.lot &&
                                <div className='specs-remarks'>
                                   {updateData ?
                                     <button onClick={()=>handleUpdate()} disabled={!(StatusData.staffDetails <= 1 && StatusData.barrellingProcss <= 0  )}>UPDATE</button>
                                    :<button onClick={()=>handleSave()} disabled={!(StatusData.staffDetails <= 1 && StatusData.barrellingProcss <= 0  )}>SAVE</button>}
                                </div>
                            }
                        </div>
                    </div>
            }
            </>
    )
}
