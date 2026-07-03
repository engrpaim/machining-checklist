import { useState ,useEffect} from "react"
import MassProRow from "./MassProRow";
import SlicingHFP from "./SlicingPerpenD";
import SlicingParallelism from "./SlicingParallelism";
import CountingGraph from "./CountingGraph";
export default function SlicingMeasuring({data,setdata,handleKeyDown,points,statusNow,edit,processing,perpenD,setPerpenD,parallelism,setParallelism,jig,row,layer,slicing_om_specs,om_specs}){
    const [tableOption,setTableOption] = useState('masspro');
    const [currentStatus, setCurrentStatus] = useState(null);
            const toDisabled = ['prepared', 'measured', 'approved']
            useEffect(() => {
                const status = statusNow
                const allowed = toDisabled.includes(status) ? true : false
                setCurrentStatus(allowed);
            }, [statusNow]);
            console.log(statusNow);
    const [slicingState, setSlicingState] = useState(slicing_om_specs ? JSON.parse(slicing_om_specs):null)
    console.log('SLICING: ',slicingState ,om_specs);
    return(
        <div>
            <div className="container-row">
                <button onClick={()=>setTableOption('masspro')} className="view-button" >Masspro</button>
                <button onClick={()=>setTableOption('perpen')}  className="view-button" >Perpendicularity</button>
                <button onClick={()=>setTableOption('parallelism')}  className="view-button" >Parallelism</button>
            </div>
            {
                tableOption === 'masspro' ?
                    <MassProRow 
                                point={points} 
                                layers={jig}
                                row={row}
                                category={layer}
                                data={data} 
                                set={setdata} 
                                handleKeyDown={handleKeyDown} 
                                target={slicingState && slicingState.target ?slicingState.target?.[om_specs]:null} 
                                max={slicingState && slicingState.max ?slicingState.max?.[om_specs]:null} 
                                min={slicingState && slicingState.min ?slicingState.min?.[om_specs]:null} 
                                status ={(currentStatus || processing) && !(edit)}
                                side={slicingState && slicingState.specs ?slicingState.specs?.[om_specs]:null}
                                tolerance={slicingState && slicingState.tol && slicingState.tol?.[om_specs] ?slicingState.tol?.[om_specs]:null}
                    />
                : tableOption === 'perpen' ?
                    <SlicingHFP 
                        perpenD={perpenD}
                        setPerpenD={setPerpenD}
                        jigs={jig}
                        layers={layer}
                        row={row}
                        side={slicingState && slicingState.specs ?slicingState.specs?.[om_specs]:null}
                        status ={(currentStatus || processing) && !(edit)}
                        handleKeyDown={handleKeyDown} 
                        perpenTarget={slicingState && slicingState.perpen ?Number(slicingState.perpen?.[om_specs]):null} 
                    />
                        
                :tableOption === 'parallelism' ?
                    <SlicingParallelism 
                        parallelism={parallelism}
                        setParallelism={setParallelism}
                        jigs={jig}
                        layers={layer}
                        row={row}
                        status ={(currentStatus || processing) && !(edit)}
                        handleKeyDown={handleKeyDown} 
                         side={slicingState && slicingState.specs ?slicingState.specs?.[om_specs]:null}
                        perpenTarget={slicingState && slicingState.para ?Number(slicingState.para?.[om_specs]):null} 
                        max={slicingState && slicingState.max ?Number(slicingState.max?.[om_specs]):null} 
                        min={slicingState && slicingState.min ?Number(slicingState.min?.[om_specs]):null}
                    />
                        
                :null
            }
            
        </div>
    )
}