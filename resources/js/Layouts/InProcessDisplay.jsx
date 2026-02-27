import { CrossIcon } from "../Icons/SVG";

export default function InProcessDisplay({
            data,modelIsExist,setData,
            setLotContainer,currentDate,
            modelDetails,timerData,setTimerData,goToNextInput,
            sampleCheck,StatusData,updateData,handleUpdate,handleSave,timeRotation,barrellingProcss,points_pt,desicionStatus,modelListState,setBarrelingProcess}){

        const subdivition = (min, max) => {
            let currentMax;
            let currentStart = min;
            const range = [];

            for (let x = 0; x < 9; x++) {
                currentMax = currentStart + 0.005;
                range.push({
                            min: Number(currentStart.toFixed(3)),max: Number(currentMax.toFixed(3)),

                });
                currentStart = currentMax + 0.001;
                if(x === 8 ) range.push({min:Number((currentMax+0.001).toFixed(3)),max:Number(max.toFixed(3))} , {lt:min,ht:max})
            }

            return range;
        };

        const themeColor =(max, min,value)=>{
            if(value <= 0) return;
            const maxLimit = max - 0.012
            const minLimit = min + 0.012
            console.log('theme',max,min, value)
            if( value < minLimit || value > maxLimit) return {theme:'range-adjust-td',value:value}
            if( value > minLimit  &&  value < maxLimit  ) return {theme:'range-success-td',value:value}
            return {theme:'range-reject-td',value:value}
        }
        const averagePerMagnet = []
        const rangeDisplay =subdivition(modelListState[data.model].barelling_min,modelListState[data.model].barelling_max);
        console.log('Ranggeee: ',rangeDisplay);
    return(
        <>
            {
                data.model && data.process === 'inprocess' &&

                    <div className='inprocess-container'>
                        <div className='inprocess-details'>
                            <h1>{data.model} IN-PROCESS INSPECTION SHEET</h1>
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
                                        <input  value={modelListState[data.model].chamfer_type ?? 'not found'}  disabled={true} ></input>
                                    </div>
                                </div>
                                <div className='data-container'>
                                    <div className='data-input'>
                                        <label>Date:</label>
                                       <input value={currentDate} disabled={true} />
                                    </div>
                                    <div className='data-input'>
                                        <label>Shift:</label>
                                        <input  value={data.shift ?? null}  disabled={true} />

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
                            <div className='specs-table'>
                                <div className='specs-details'>
                                    <h2>CHAMFER SPECS</h2>
                                    <div className='specs-max-data'>
                                        <h2>Maximum:</h2>
                                        <p>{modelListState[data.model].chamfer_barelling_max??'Not Found'}</p>
                                    </div>
                                    <div className='specs-target-data'>
                                        <h2>Target:</h2>
                                        <p>{modelListState[data.model].chamfer_barelling_target??'Not Found'}</p>
                                    </div>
                                    <div className='specs-min-data'>
                                        <h2>Minimum:</h2>
                                        <p>{modelListState[data.model].chamfer_barelling_min??'Not Found'}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='title-center'>
                                <h1>BARRELING MAGNET DATA TABLE</h1>
                            </div>
                             <div className='specs-table'>
                                <div>

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
                                                   timeRotation && timeRotation.map((i)=>{
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
                                                <td><input  value={barrellingProcss.machine_no ?? null} onChange={(e)=>setBarrelingProcess('machine_no',e.target.value.toUpperCase())} className='specs-input'/></td>
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
                                                        const target = modelListState[data.model].chamfer_barelling_target ?? 0;
                                                        const min = modelListState[data.model].chamfer_barelling_min ?? 0;
                                                        const max = modelListState[data.model].chamfer_barelling_max ?? 0;
                                                        const result = desicionStatus(sample,target,min,max,2.415);
                                                        return (
                                                            <td
                                                            key={i}
                                                            style={{ color: "white", background: result.color }}
                                                            >
                                                            ({result.status})&nbsp;{result.computed}
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
                                <div className='specs-details'>
                                    <h2>SPECS</h2>
                                    <div className='specs-max-data'>
                                        <h2>Maximum:</h2>
                                        <p>{modelListState[data.model].barelling_max??'Not Found'}</p>
                                    </div>
                                    <div className='specs-target-data'>
                                        <h2>Target:</h2>
                                        <p>{modelListState[data.model].barelling_target??'Not Found'}</p>
                                    </div>
                                    <div className='specs-min-data'>
                                        <h2>Minimum:</h2>
                                        <p>{modelListState[data.model].barelling_min??'Not Found'}</p>
                                    </div>
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
                                                        let current = 0;
                                                        let avarage = 0;

                                                        sampleCheck.map((j)=>{
                                                            current= Number(points_pt[`pt${i}_${j}`]);
                                                            avarage +=  Number(points_pt[`pt${i}_${j}`])/5;
                                                            maxShow  = maxShow > current ? maxShow :  current;
                                                            minShow =  minShow <= 0 ? current : current < minShow ? current:minShow;

                                                            if(!averagePerMagnet[j-1]) averagePerMagnet[j-1] = {};

                                                            averagePerMagnet[j-1][i-1] = Number(points_pt[`pt${i}_${j}`]);
                                                        });


                                                        const currentTarget = modelListState[data.model].barelling_target;
                                                        const currentMax = current ? Math.abs(maxShow - currentTarget).toFixed(2):0;
                                                        const currentMin = current !== 0 ? Math.abs(minShow - currentTarget).toFixed(2):0;


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
                                                                    <td>{currentMax ? currentMax :currentMin}</td>
                                                                    <td>{maxShow > 0 && maxShow}</td>
                                                                    <td>{minShow}</td>
                                                                    <td>{currentTarget}</td>
                                                                    <td>{currentMax}</td>
                                                                    <td>{currentMin}</td>
                                                                    <td>{avarage.toFixed(2)}</td>
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

                                            {

                                                Object.entries(rangeDisplay).map(([key,values])=>{
                                                        const maxRange = rangeDisplay[10].ht
                                                        const minRange = rangeDisplay[10].lt
                                                                    console.log('AVERRAHGGGEE: ',averagePerMagnet ,key);
                                                        if(!values.max || !values.min) return

                                                        let point1,point2,point3,point4,point5 = 0;
                                                        let ht1,ht2,ht3,ht4,ht5 = 0;
                                                        let lt1, lt2 , lt3 ,lt4 ,lt5 = 0
                                                        // x is the magnet number vertically
                                                        for(let x = 0 ; x < 6 ;x++ ){

                                                            averagePerMagnet[x] && averagePerMagnet[x][0] &&  averagePerMagnet[x][0] >= values.min && averagePerMagnet[x][0] <= values.max ? point1=averagePerMagnet[x][0]:null
                                                            averagePerMagnet[x] && averagePerMagnet[x][1] &&  averagePerMagnet[x][1] >= values.min && averagePerMagnet[x][1] <= values.max ? point2=averagePerMagnet[x][1]:null
                                                            averagePerMagnet[x] && averagePerMagnet[x][2] &&  averagePerMagnet[x][2] >= values.min && averagePerMagnet[x][2] <= values.max ? point3=averagePerMagnet[x][2]:null
                                                            averagePerMagnet[x] && averagePerMagnet[x][3] &&  averagePerMagnet[x][3] >= values.min && averagePerMagnet[x][3] <= values.max ? point4=averagePerMagnet[x][3]:null
                                                            averagePerMagnet[x] && averagePerMagnet[x][4] &&  averagePerMagnet[x][4] >= values.min && averagePerMagnet[x][4] <= values.max ? point5=averagePerMagnet[x][4]:null



                                                            averagePerMagnet[x] && averagePerMagnet[x][0] && averagePerMagnet[x][0] > maxRange ? ht1 =averagePerMagnet[x][0]:  averagePerMagnet[x] && averagePerMagnet[x][0] && averagePerMagnet[x][0]  < minRange ? lt1 = averagePerMagnet[x][0] :null
                                                            averagePerMagnet[x] && averagePerMagnet[x][1] && averagePerMagnet[x][1] > maxRange ? ht2 =averagePerMagnet[x][1]:  averagePerMagnet[x] && averagePerMagnet[x][1] && averagePerMagnet[x][1]  < minRange ? lt2 = averagePerMagnet[x][1] :null
                                                            averagePerMagnet[x] && averagePerMagnet[x][2] && averagePerMagnet[x][2] > maxRange ? ht3 =averagePerMagnet[x][2]:  averagePerMagnet[x] && averagePerMagnet[x][2] && averagePerMagnet[x][2]  < minRange ? lt3 = averagePerMagnet[x][2] :null
                                                            averagePerMagnet[x] && averagePerMagnet[x][3] && averagePerMagnet[x][3] > maxRange ? ht4 =averagePerMagnet[x][3]:  averagePerMagnet[x] && averagePerMagnet[x][3] && averagePerMagnet[x][3]  < minRange ? lt4 = averagePerMagnet[x][3] :null
                                                            averagePerMagnet[x] && averagePerMagnet[x][4] && averagePerMagnet[x][4] > maxRange ? ht5 =averagePerMagnet[x][4]:  averagePerMagnet[x] && averagePerMagnet[x][4] && averagePerMagnet[x][4]  < minRange ? lt5 = averagePerMagnet[x][4] :null


                                                        }

                                                        const theme1 =  themeColor(maxRange,minRange,point1);
                                                        const theme2 =  themeColor(maxRange,minRange,point2);
                                                        const theme3 =  themeColor(maxRange,minRange,point3);
                                                        const theme4 =  themeColor(maxRange,minRange,point4);
                                                        const theme5 =  themeColor(maxRange,minRange,point5);


                                                        return(
                                                        <>
                                                            {
                                                                //LT in first row
                                                                Number(key) === 0 &&
                                                                <tr>
                                                                    <td>LT</td>
                                                                    <td className={lt1 !== 0 && lt1 < values.min ? 'range-reject-td':null}></td>
                                                                    <td className={lt2 !== 0 && lt2 < values.min ? 'range-reject-td':null}></td>
                                                                    <td className={lt3 !== 0 && lt3 < values.min ? 'range-reject-td':null}></td>
                                                                    <td className={lt4 !== 0 && lt4 < values.min ? 'range-reject-td':null}></td>
                                                                    <td className={lt5 !== 0 && lt5 < values.min ? 'range-reject-td':null}></td>
                                                                </tr>
                                                            }
                                                            <tr>
                                                                <td>{values.min}-{values.max}</td>
                                                                <td className={point1 ? theme1.theme:null}></td>
                                                                <td className={point2 ? theme2.theme:null}></td>
                                                                <td className={point3 ? theme3.theme:null}></td>
                                                                <td className={point4 ? theme4.theme:null}></td>
                                                                <td className={point5 ? theme5.theme:null}></td>
                                                            </tr>
                                                            {
                                                                //HTT in first row
                                                                Number(key) === 9 &&
                                                                <tr>
                                                                    <td>HT</td>
                                                                    <td className={ht1 !== 0 && ht1 > values.max ? 'range-reject-td':null}></td>
                                                                    <td className={ht2 !== 0 && ht2 > values.max ? 'range-reject-td':null}></td>
                                                                    <td className={ht3 !== 0 && ht3 > values.max ? 'range-reject-td':null}></td>
                                                                    <td className={ht4 !== 0 && ht4 > values.max ? 'range-reject-td':null}></td>
                                                                    <td className={ht5 !== 0 && ht5 > values.max ? 'range-reject-td':null}></td>
                                                                </tr>
                                                            }
                                                        </>
                                                        )
                                                })
                                            }

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
