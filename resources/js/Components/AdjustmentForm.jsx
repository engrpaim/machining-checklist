import { useState , useRef} from "react"
import { router } from "@inertiajs/react";
export default function AdjustmentForm({handleKeyDown,adjustmentDetails ,setAdjustmentDetails,batch_number,lot_number,date_shift,process,details,id,adjustmentReset, adjustmentSubmit,adjustment}){
   
    const today = new Date();
    const formated = today.toISOString().split('T')[0]
    const currentHour = new Date().getHours(); 

    const [addAdjustment ,setAddAdjustment] = useState({
                                                            lot_number: details && details.lot_number ? details.lot_number:null ,
                                                            date: formated,
                                                            process: details.process?details.process:null,
                                                            process_number: details.process_number?details.process_number:null,
                                                            model_name: details.model?details.model:null,
                                                            batch_number:batch_number?batch_number:null,
                                                            id:id?id:null
                                                        });
    const [addAdjustmentButton , setAddAdjustmentButton] = useState(false)
    const [currentSpecs ,setCurrentSpecs]  = useState(false);
    let countTr = 0;
    
    console.log('ADJUSTMNET FORM NOW:',adjustmentDetails,currentSpecs,details,currentHour,'ADJUSTMENT LIST: ',adjustment);
    return(
        <div className="container-column">
            <h1>Adjustment Form</h1>
            <div className="details-container-gray">
                <div className="container-row">
                   <div className="container-column">
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Date/Shift:</label>
                            <input value={addAdjustment.date ?addAdjustment.date:null } disabled={true} onKeyDown={(e)=>handleKeyDown(e)}  style={{ width:'12rem' }}/>
                        </div>
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Process:</label>
                            <input value={addAdjustment.process ? addAdjustment.process.toUpperCase():null }  disabled={true} onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'12rem' }}/>
                        </div>
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Model Name:</label>
                            <input value={addAdjustment.model_name ? addAdjustment.model_name:null } disabled={true} onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'12rem' }}/>
                        </div>
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Lot Number:</label>
                            <input value={addAdjustment.lot_number ? addAdjustment.lot_number:null } disabled={true} onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'12rem' }}/>
                        </div>
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Machine:</label>
                            <input value={adjustmentDetails.machine || '' } onChange={(e)=>setAdjustmentDetails('machine',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'12rem' }}/>
                        </div>
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Operator:</label>
                            <input value={adjustmentDetails.operator  || '' }  onChange={(e)=>setAdjustmentDetails('operator',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'12rem' }}/>
                        </div>
                        <div className="details-data" style={{ width:'20rem' }}>
                            <label>Checked By:</label>
                            <input  value={adjustmentDetails.checked_by || '' } onChange={(e)=>setAdjustmentDetails('checked_by',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'12rem' }}/>
                        </div>
                   </div>
                   <div className="container-column-flex">
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.width } onChange={(e)=>setCurrentSpecs({...currentSpecs,width:currentSpecs && currentSpecs.width ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Width (W):</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.width || '' }  onChange={(e)=>setAdjustmentDetails('width',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.width)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.length} onChange={(e)=>setCurrentSpecs({...currentSpecs,length:currentSpecs && currentSpecs?.['length'] ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Length (L):</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails?.['length'] || ''}   onChange={(e)=>setAdjustmentDetails('length',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.length)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.thickness} onChange={(e)=>setCurrentSpecs({...currentSpecs,thickness:currentSpecs && currentSpecs.thickness ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Thickness (T):</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.thickness || '' } onChange={(e)=>setAdjustmentDetails('thickness',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.thickness)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.height}  onChange={(e)=>setCurrentSpecs({...currentSpecs,height:currentSpecs && currentSpecs.height ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Height (H):</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.height || ''} onChange={(e)=>setAdjustmentDetails('height',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.height)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.chamfer}   onChange={(e)=>setCurrentSpecs({...currentSpecs,chamfer:currentSpecs && currentSpecs.chamfer ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Chamfer:</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.chamfer || '' } onChange={(e)=>setAdjustmentDetails('chamfer',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.chamfer)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.center_off}   onChange={(e)=>setCurrentSpecs({...currentSpecs,center_off:currentSpecs && currentSpecs.center_off ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Center-off:</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.center_off || '' } onChange={(e)=>setAdjustmentDetails('center_off',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.center_off)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.angularity}   onChange={(e)=>setCurrentSpecs({...currentSpecs,angularity:currentSpecs && currentSpecs.angularity ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Angularity:</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.angularity || ''} onChange={(e)=>setAdjustmentDetails('angularity',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.angularity)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.perpen}   onChange={(e)=>setCurrentSpecs({...currentSpecs,perpen:currentSpecs && currentSpecs.perpen ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Perpendicularity:</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.perpen || '' } onChange={(e)=>setAdjustmentDetails('perpen',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.perpen)}/><p>mm</p>
                        </div>
                        <div className="adjustment-measurement">
                            <input checked={currentSpecs && currentSpecs.flatness}   onChange={(e)=>setCurrentSpecs({...currentSpecs,flatness:currentSpecs && currentSpecs.flatness ? false:true})}  onKeyDown={(e)=>handleKeyDown(e)} type="checkbox" style={{     width: 'fit-content' }}/>
                            <label>Flatness:</label>&nbsp;
                            <p>±</p><input value={adjustmentDetails.flatness || '' } onChange={(e)=>setAdjustmentDetails('flatness',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'5rem' }} disabled={(!currentSpecs.flatness)}/><p>mm</p>
                        </div>
                   </div>
                   <div>
                        <table>
                            <thead>
                                <tr>
                                    <th style={{ background:'#B8E8FF' }}>MACHINE</th>
                                    <th style={{ background:'#B8E8FF' , width:'8rem' }}>TB# 1</th>
                                    <th style={{ background:'#B8E8FF' , width:'8rem'}}>TB# 2</th>
                                    <th style={{ background:'#B8E8FF' }} rowSpan={6}>CYCLE</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={{ background:'#FEE685' }}>OG/MC/IDG/CG/CCH</td>
                                    <td>1pc.</td>
                                    <td>3pcs.</td>
                                    <td style={{ background:'#C0F6E3' }} rowSpan={6}>NORMAL CYCLE</td>
                                </tr>
                                <tr>
                                    <td style={{ background:'#FEE685' }}>LAPPING</td>
                                    <td>1pc.</td>
                                    <td>3pcs.</td>
                                </tr>
                                <tr>
                                    <td style={{ background:'#FEE685' }}>HDDG</td>
                                    <td>1pc.</td>
                                    <td>3pcs.</td>
                                </tr>
                                <tr>
                                    <td style={{ background:'#FEE685' }}>SG</td>
                                    <td>1pc.</td>
                                    <td>First/Middle/Last</td>
                                </tr>
                                <tr>
                                    <td style={{ background:'#FEE685' }}>CGH</td>
                                    <td>3pcs.</td>
                                    <td>5pcs.</td>
                                </tr>
                                <tr>
                                    <td style={{ background:'#FEE685' }}>SLICING</td>
                                    <td>1st column/jig</td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                   </div>
                </div>
                <table className="measuring-table" style={{ marginBottom:'2rem' }}>
                    <tbody>
                        <tr>
                            <td  colSpan={16}>
                                <div className="container-row" 
                                    style={{  
                                                display:'flex' ,justifyContent:'center',
                                                alignItems:'center',gap:'0.5rem',background:'#EBFAED',
                                                padding:'1rem', borderRadius:'1rem', border: '1px solid #175E23'

                                            }}>
                                    <h1>Add Adjustment</h1>
                                    <button className="add-adjustment" onClick={(e)=>setAddAdjustmentButton(true)}>+</button>
                                </div>
                            </td>
                        </tr>
                        {addAdjustmentButton &&
                            <>
                                <tr>
                                    <td><input value={addAdjustment.deffect ? addAdjustment.deffect:null } onChange={(e)=>setAdjustmentDetails('deffect',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="deffect"/></td>
                                    <td><input value={addAdjustment.adjustment_made ? addAdjustment.adjustment_made:null } onChange={(e)=>setAdjustmentDetails('adjustment_made',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} style={{ width:'25rem' }} placeholder="adjustment"/></td>
                                    <td><input value={addAdjustment.tb_no ? addAdjustment.tb_no:null } onChange={(e)=>setAdjustmentDetails('tb_no',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="TB#"/></td>
                                    <td><input value={addAdjustment.pt_1 ? addAdjustment.pt_1:null }  onChange={(e)=>setAdjustmentDetails('pt_1',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Pt. 1"/></td>
                                    <td><input value={addAdjustment.pt_2 ? addAdjustment.pt_2:null } onChange={(e)=>setAdjustmentDetails('pt_2',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Pt. 2"/></td>
                                    <td><input value={addAdjustment.pt_3 ? addAdjustment.pt_3:null } onChange={(e)=>setAdjustmentDetails('pt_3',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Pt. 3"/></td>
                                    <td><input value={addAdjustment.pt_4 ? addAdjustment.pt_4:null } onChange={(e)=>setAdjustmentDetails('pt_4',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Pt. 4"/></td>
                                    <td><input value={addAdjustment.pt_5 ? addAdjustment.pt_5:null } onChange={(e)=>setAdjustmentDetails('pt_5',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Pt. 5"/></td>
                                    <td><input value={addAdjustment.chamfer_point ? addAdjustment.chamfer_point:null } onChange={(e)=>setAdjustmentDetails('chamfer_point',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Chamfer"/></td>
                                    <td><input value={addAdjustment.center_off_point ? addAdjustment.center_off_point:null } onChange={(e)=>setAdjustmentDetails('center_off_point',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Center-off"/></td>
                                    <td><input value={addAdjustment.angularity_point ? addAdjustment.angularity_point:null } onChange={(e)=>setAdjustmentDetails('angularity_point',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Angularity"/></td>
                                    <td><input value={addAdjustment.perpen_point ? addAdjustment.perpen_point:null } onChange={(e)=>setAdjustmentDetails('perpen_point',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Perpendicularity"/></td>
                                    <td><input value={addAdjustment.flatness_point ? addAdjustment.flatness_point:null } onChange={(e)=>setAdjustmentDetails('flatness_point',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Flatness"/></td>
                                    <td><input value={addAdjustment.appearance_checking ? addAdjustment.appearance_checking:null } onChange={(e)=>setAdjustmentDetails('appearance_checking',e.target.value)}  onKeyDown={(e)=>handleKeyDown(e)} placeholder="Checking"/></td>
                                    <td>
                                        <div className="container-row" style={{  gap:'0.2rem' }}>
                                            OK<input  onChange={(e)=>setAdjustmentDetails({...adjustmentDetails , final_result:'OK' })}  onKeyDown={(e)=>handleKeyDown(e)}  type="radio" name="final-result" style={{ background:'none', width:'fit-content' }} selected={(addAdjustment.checking_point === 'OK' ? true:false)}/>
                                        </div>
                                    </td>
                                    <td> 
                                        <div className="container-row" style={{  gap:'0.2rem' }}>
                                            NG<input onChange={(e)=>setAdjustmentDetails({...adjustmentDetails , final_result:'NG' })}  onKeyDown={(e)=>handleKeyDown(e)}  type="radio" name="final-result"  style={{ background:'none',width:'fit-content' }} selected={(addAdjustment.checking_point === 'NG' ? true:false)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan={16}>
                                        <div className="container-row" style={{ justifyContent:'end' }}>
                                            <button className="status-btn" style={{ background:'red'}}onClick={(e)=>setAddAdjustmentButton(false)}>Cancel</button>
                                            <button className="status-btn" onClick={(e)=>{
                                                        adjustmentSubmit(adjustmentDetails,addAdjustment,currentSpecs)
                                                        setAddAdjustmentButton(false);
                                                        setCurrentSpecs(false);
                                                    }} disabled={!(currentSpecs && adjustmentDetails && Object.keys(adjustmentDetails).length >1)}>Submit</button>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        }
                    </tbody>
                    
                </table>
            </div>
            <div className="details-container-gray">
                <table className="measuring-table" style={{ marginBottom:'2rem' }} >
                    <thead>
                        <tr>
                            <th rowSpan={2} style={{ width:'15rem' }}>SPECS</th>
                            <th rowSpan={2}>DEFFECT</th>
                            <th rowSpan={2} style={{ width:'25rem' }} >ADJUSTMENT MADE</th>
                            <th colSpan={11}>DIMENSION CHECKING (BASE ON OM)</th>
                            <th rowSpan={2} style={{ width:'10rem' }}>APPEARANCE CHECKING (OK/NG)</th>
                            <th rowSpan={2} colSpan={2} style={{ width:'15rem' }}>FINAL RESULT</th>
                        </tr>
                        <tr>
                            <th>TB#</th>
                            <th>Pt. 1</th>
                            <th>Pt. 2</th>
                            <th>Pt. 3</th>
                            <th>Pt. 4</th>
                            <th>Pt. 5</th>
                            <th>Chamfer</th>
                            <th>Center-off</th>
                            <th>Angularity</th>
                            <th>Perpendicularity</th>
                            <th>Flatness</th>
                        </tr>
                    </thead>
                    <tbody>
                         {
                            adjustment && adjustment.data  ?
                            Object.entries(adjustment.data).map(([key,value])=>{
                                if(!value) return
                                const specsList = [ "width" , "length" , "thickness" , "height" , "chamfer" , "center_off" , "angularity" , "perpen" , "flatness" ]
                                countTr += 1
                                return(
                                    <tr style={{ background: countTr % 2 === 0 ? '#E6F6FF':'' }}>
                                        <td>
                                            {
                                                specsList.map((items)=>{
                                                    if(!value?.[items]) return
                                                    return <p>{items.toUpperCase()+ ": " + value?.[items]}</p>
                                                })
                                            }
                                        </td>
                                        <td>{value.deffect || ''}</td>
                                        <td>{value.adjustment_made || ''}</td>
                                        <td>{value.tb_no || ''}</td>
                                        <td>{value.pt_1 || ''}</td>
                                        <td>{value.pt_2 || ''}</td>
                                        <td>{value.pt_3 || ''}</td>
                                        <td>{value.pt_4 || ''}</td>
                                        <td>{value.pt_5 || ''}</td>
                                        <td>{value.chamfer_point || ''}</td>
                                        <td>{value.center_off_point || ''}</td>
                                        <td>{value.angularity_point || ''}</td>
                                        <td>{value.perpen_point || ''}</td>
                                        <td>{value.flatness_point || ''}</td>
                                        <td>{value.appearance_checking || ''}</td>
                                        <td>{value.final_result || ''}</td>
                                    </tr>
                                )
                            }):
                            <tr>
                                <td colSpan={16}>Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
             
                
        </div>
    )
}