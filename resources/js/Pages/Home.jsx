import '../../css/app.css'
import { useEffect, useState} from 'react';
import { useForm , router } from '@inertiajs/react';

export default function Home({ message }) {

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
        time_1:'',
        rotation_1:'',
        timetotal_1:'',
        rotationtotal_1:'',
        time_2:'',
        rotation_2:'',
        timetotal_2:'',
        rotationtotal_2:'',
        time_3:'',
        rotation_3:'',
        timetotal_3:'',
        rotationtotal_3:'',
        machine_no:'',
        machinesample_1:'',
        machinesample_2:'',
        machinesample_3:'',
        machinesample_4:'',
        machinesample_5:'',
        machinejudgement_1:'',
        machinejudgement_2:'',
        machinejudgement_3:'',
        machinejudgement_4:'',
        machinejudgement_5:'',
        remarks:'',
    });
    const { data: thickness, setData: setThickness} = useForm({
        magnethickness1_1:'',
        magnethickness1_2:'',
        magnethickness1_3:'',
        magnethickness1_4:'',
        magnethickness1_5:'',
        magnethickness2_1:'',
        magnethickness2_2:'',
        magnethickness2_3:'',
        magnethickness2_4:'',
        magnethickness2_5:'',
        magnethickness3_1:'',
        magnethickness3_2:'',
        magnethickness3_3:'',
        magnethickness3_4:'',
        magnethickness3_5:'',
        magnethickness4_1:'',
        magnethickness4_2:'',
        magnethickness4_3:'',
        magnethickness4_4:'',
        magnethickness4_5:'',
        magnethickness5_1:'',
        magnethickness5_2:'',
        magnethickness5_3:'',
        magnethickness5_4:'',
        magnethickness5_5:'',
        magnethickness6_1:'',
        magnethickness6_2:'',
        magnethickness6_3:'',
        magnethickness6_4:'',
        magnethickness6_5:'',
        magnethickness7_1:'',
        magnethickness7_2:'',
        magnethickness7_3:'',
        magnethickness7_4:'',
        magnethickness7_5:'',
        magnethickness8_1:'',
        magnethickness8_2:'',
        magnethickness8_3:'',
        magnethickness8_4:'',
        magnethickness8_5:'',
        magnethickness9_1:'',
        magnethickness9_2:'',
        magnethickness9_3:'',
        magnethickness9_4:'',
        magnethickness9_5:'',
        magnethickness10_1:'',
        magnethickness10_2:'',
        magnethickness10_3:'',
        magnethickness10_4:'',
        magnethickness10_5:'',
    });

    const {data: points_pt, setData: setPoints}=useForm({
        pt1_1:'',
        pt1_2:'',
        pt1_3:'',
        pt1_4:'',
        pt1_5:'',
        max_1:'',
        min_1:'',
        worst_1:'',
        maximum_1:'',
        minimum_1:'',
        max_diff1:'',
        min_diff1:'',
        average_1:'',
        pt2_1:'',
        pt2_2:'',
        pt2_3:'',
        pt2_4:'',
        pt2_5:'',
        max_2:'',
        min_2:'',
        worst_2:'',
        maximum_2:'',
        minimum_2:'',
        max_diff2:'',
        min_diff2:'',
        average_2:'',
        pt3_1:'',
        pt3_2:'',
        pt3_3:'',
        pt3_4:'',
        pt3_5:'',
        max_3:'',
        min_3:'',
        worst_3:'',
        maximum_3:'',
        minimum_3:'',
        max_diff3:'',
        min_diff3:'',
        average_3:'',
        pt4_1:'',
        pt4_2:'',
        pt4_3:'',
        pt4_4:'',
        pt4_5:'',
        max_4:'',
        min_4:'',
        worst_4:'',
        maximum_4:'',
        minimum_4:'',
        max_diff4:'',
        min_diff4:'',
        average_4:'',
        pt5_1:'',
        pt5_2:'',
        pt5_3:'',
        pt5_4:'',
        pt5_5:'',
        max_5:'',
        min_5:'',
        worst_5:'',
        maximum_5:'',
        minimum_5:'',
        max_diff5:'',
        min_diff5:'',
        average_5:'',
    });
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    const currentDate = `${year}-${month}-${day}`;
    useEffect(()=>{
        setData('date',currentDate);
    },[currentDate]);
    const [display , setDisplay] = useState(null);
    const handleSave = () => {
        // Convert Proxy objects to plain JS objects
        router.post('/machining-checklist', {

            ...data,
            magnet_thickness:thickness,
            pt_data:points_pt
        });

    };



    return (
        <div className='main-container'>s
            <div className='machine-selector'>
                <h1>Machining Checklist</h1>
                <div className='selector-container'>
                    <div className='selector-data'>
                        <label>Model:</label>
                        <select  value={data.model} onChange={(e)=>setData('model',e.target.value)}>
                            <option value=""></option>
                            <option value="ROB">ROB</option>
                            <option value="HAS">HAS</option>
                        </select>
                    </div>
                    <div className='selector-data'>
                        <label>Process:</label>
                        <select value={data.process} onChange={(e)=>setData('process',e.currentTarget.value)}>
                            <option value=""></option>
                            <option value="inprocess">IN-PROCESS INSPECTION SHEET</option>
                        </select>
                    </div>
                </div>
            </div>
            {
                data.model && data.process === 'inprocess' &&
                    <div className='inprocess-container'>
                        <div>
                            <h1>IN-PROCESS INSPECTION SHEET</h1>
                            <div>
                                <h3>MODEL:</h3>
                                <p>{data.model}</p>
                            </div>
                            <div className='selector-container'>
                                <div className='data-container'>
                                    <div className='data-input'>
                                        <label>Lot No:</label>
                                        <input  onChange={(e)=>setData('lot',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Total Batch/Lot:</label>
                                        <input type="number" onChange={(e)=>setData('total_lot',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Total Qty/Lot:</label>
                                        <input type="number" onChange={(e)=>setData('qty_lot',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Total Wt./Lot:</label>
                                        <input type="number" onChange={(e)=>setData('wt_lot',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Media Size:</label>
                                        <input onChange={(e)=>setData('media_size',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Media Weight:</label>
                                        <input onChange={(e)=>setData('media_weight',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Coolant Level:</label>
                                        <input onChange={(e)=>setData('coolant',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Styrene Powder:</label>
                                        <input onChange={(e)=>setData('styrenre',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>GC Powder:</label>
                                        <input onChange={(e)=>setData('gc_powder',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Magnet wt/pc.:</label>
                                        <input onChange={(e)=>setData('magnet_wt',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Chamfer Type</label>
                                        <input onChange={(e)=>setData('chamfer_type',e.target.value)}></input>
                                    </div>
                                </div>
                                <div className='data-container'>
                                    <div className='data-input'>
                                        <label>Date:</label>
                                       <input value={currentDate} readOnly />
                                    </div>
                                    <div className='data-input'>
                                        <label>Shift:</label>
                                        <select value={data.shift} onChange={(e)=>setData('shift',e.target.value)}>
                                            <option value=""></option>
                                            <option value="E">E</option>
                                            <option value="F">F</option>
                                        </select>
                                    </div>
                                    <div className='data-input'>
                                        <label>Operator:</label>
                                        <input onChange={(e)=>setData('operator',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Checker:</label>
                                        <input onChange={(e)=>setData('checker',e.target.value)}></input>
                                    </div>
                                    <div className='data-input'>
                                        <label>Staff/Engr:</label>
                                        <input onChange={(e)=>setData('staff_eng',e.target.value)}></input>
                                    </div>
                                </div>
                                <div>
                                    <table className='barreling-table' border={1}>
                                        <thead>
                                            <tr>
                                                <th  colSpan={3}>Barreling Time:</th>
                                            </tr>
                                            <tr>
                                                <th  colSpan={3}>Setting:</th>
                                                <th>Total/Final</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>T1</td>
                                                <td>
                                                    <div className='input-container'>
                                                        <p><strong>Time</strong></p>
                                                        <p><strong>Rotation</strong></p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='input-container'>
                                                        <input className='time-data'  onChange={(e)=>setData('time_1',e.target.value)}/>
                                                        <input className='rotation-data' onChange={(e)=>setData('rotation_1',e.target.value)}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='input-container'>
                                                        <input className='time-data'  onChange={(e)=>setData('timetotal_1',e.target.value)}/>
                                                        <input className='rotation-data' onChange={(e)=>setData('rotationtotal_1',e.target.value)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>T2</td>
                                                <td>
                                                    <div className='input-container'>
                                                        <p><strong>Time</strong></p>
                                                        <p><strong>Rotation</strong></p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='input-container'>
                                                        <input className='time-data'  onChange={(e)=>setData('time_2',e.target.value)}/>
                                                        <input className='rotation-data' onChange={(e)=>setData('rotation_2',e.target.value)}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='input-container'>
                                                        <input className='time-data'  onChange={(e)=>setData('timetotal_2',e.target.value)}/>
                                                        <input className='rotation-data' onChange={(e)=>setData('rotationtotal_2',e.target.value)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>T3</td>
                                                <td>
                                                    <div className='input-container'>
                                                        <p><strong>Time</strong></p>
                                                        <p><strong>Rotation</strong></p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='input-container'>
                                                         <input className='time-data'  onChange={(e)=>setData('time_3',e.target.value)}/>
                                                        <input className='rotation-data' onChange={(e)=>setData('rotation_3',e.target.value)}/>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='input-container'>
                                                         <input className='time-data'  onChange={(e)=>setData('timetotal_3',e.target.value)}/>
                                                        <input className='rotation-data' onChange={(e)=>setData('rotationtotal_3',e.target.value)}/>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className='specs-table'>
                            <div>
                                <table className='barreling-process' border={1}>
                                    <thead>
                                        <tr>
                                            <th colSpan={12}> BARRELING PROCESS</th>
                                        </tr>
                                        <tr>
                                            <th colSpan={7}>MAGNET SAMPLES</th>
                                            <th colSpan={5}>JUDGEMENT PER PIECE</th>
                                        </tr>
                                        <tr>
                                            <th></th>
                                            <th>No.</th>
                                            <th>Machine 1</th>
                                            <th>Machine 2</th>
                                            <th>Machine 3</th>
                                            <th>Machine 4</th>
                                            <th>Machine 5</th>
                                            <th>Machine 1</th>
                                            <th>Machine 2</th>
                                            <th>Machine 3</th>
                                            <th>Machine 4</th>
                                            <th>Machine 5</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th>Machine</th>
                                            <td><input  onChange={(e)=>setData('machine_no',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinesample_1',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinesample_2',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinesample_3',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinesample_4',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinesample_5',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinejudgement_1',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinejudgement_2',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinejudgement_3',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinejudgement_4',e.target.value)} className='specs-input'/></td>
                                            <td><input  onChange={(e)=>setData('machinejudgement_5',e.target.value)} className='specs-input'/></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='specs-dual'>
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
                                                <td><input onChange={(e)=>setThickness('magnethickness1_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness1_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness1_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness1_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness1_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.576 - 5.581</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness2_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness2_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness2_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness2_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness2_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.582 - 5.587</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness3_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness3_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness3_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness3_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness3_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.588 - 5.593</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness4_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness4_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness4_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness4_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness4_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.594 - 5.599</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness5_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness5_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness5_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness5_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness5_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.600 - 5.605</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness6_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness6_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness6_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness6_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness6_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.606 - 5.611</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness7_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness7_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness7_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness7_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness7_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.612 - 5.617</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness8_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness8_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness8_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness8_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness8_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.618 - 5.623</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness9_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness9_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness9_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness9_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness9_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5.624 - 5.630</td>
                                                <td><input onChange={(e)=>setThickness('magnethickness10_1',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness10_2',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness10_3',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness10_4',e.target.value)} className='specs-input'/></td>
                                                <td><input onChange={(e)=>setThickness('magnethickness10_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td colSpan={6}>HT</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div>
                                    <table className='barreling-process' border={1}>
                                        <thead>
                                            <tr>
                                                <th colSpan={15}>ACTUAL DIMENSION</th>
                                            </tr>
                                            <tr>
                                                <th>No</th>
                                                <th>Pt. 1</th>
                                                <th>Pt. 2</th>
                                                <th>Pt. 3</th>
                                                <th>Pt. 4</th>
                                                <th>Pt. 5</th>
                                                <th>Max</th>
                                                <th>Min</th>
                                                <th>Worst</th>
                                                <th>Maximum</th>
                                                <th>Minimum</th>
                                                <th>Target</th>
                                                <th>Max Diff</th>
                                                <th>Min Diff</th>
                                                <th>Average</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td><input  onChange={(e)=>setPoints('pt1_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt1_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt1_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt1_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt1_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('max_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('worst_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('maximum_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('minimum_1',e.target.value)} className='specs-input'/></td>
                                                <td>5.600</td>
                                                <td><input  onChange={(e)=>setPoints('max_diff1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_diff1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('average_1',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td><input  onChange={(e)=>setPoints('pt2_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt2_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt2_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt2_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt2_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('max_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('worst_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('maximum_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('minimum_2',e.target.value)} className='specs-input'/></td>
                                                <td>5.600</td>
                                                <td><input  onChange={(e)=>setPoints('max_diff2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_diff2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('average_2',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>3</td>
                                                <td><input  onChange={(e)=>setPoints('pt3_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt3_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt3_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt3_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt3_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('max_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('worst_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('maximum_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('minimum_3',e.target.value)} className='specs-input'/></td>
                                                <td>5.600</td>
                                                <td><input  onChange={(e)=>setPoints('max_diff3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_diff3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('average_3',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>4</td>
                                                <td><input  onChange={(e)=>setPoints('pt4_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt4_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt4_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt4_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt4_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('max_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('worst_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('maximum_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('minimum_4',e.target.value)} className='specs-input'/></td>
                                                <td>5.600</td>
                                                <td><input  onChange={(e)=>setPoints('max_diff4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_diff4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('average_4',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                            <tr>
                                                <td>5</td>
                                                <td><input  onChange={(e)=>setPoints('pt5_1',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt5_2',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt5_3',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt5_4',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('pt5_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('max_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('worst_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('maximum_5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('minimum_5',e.target.value)} className='specs-input'/></td>
                                                <td>5.600</td>
                                                <td><input  onChange={(e)=>setPoints('max_diff5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('min_diff5',e.target.value)} className='specs-input'/></td>
                                                <td><input  onChange={(e)=>setPoints('average_5',e.target.value)} className='specs-input'/></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <div className='specs-remarks'>
                                        <label>REMARKS:</label><input onChange={(e)=>setData('remarks',e.target.value)}  className='specs-remarks'/>
                                    </div>
                                    <div className='specs-remarks'>
                                        <button onClick={()=>handleSave()}>SAVE</button>
                                    </div>
                                </div>
                        </div>
                    </div>
            }
        </div>
    );
}
