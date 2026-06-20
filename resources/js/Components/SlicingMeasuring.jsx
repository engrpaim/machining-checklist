import { useState ,useEffect} from "react"
import MassProRow from "./MassProRow";
import SlicingHFP from "./SlicingPerpenD";
import SlicingParallelism from "./SlicingParallelism";
import CountingGraph from "./CountingGraph";
export default function SlicingMeasuring({data,setdata,handleKeyDown,target,max,min,points,statusNow,edit,processing,perpenD,setPerpenD,parallelism,setParallelism}){
    const [tableOption,setTableOption] = useState('masspro');
    const [currentStatus, setCurrentStatus] = useState(null);
            const toDisabled = ['prepared', 'measured', 'approved']
            useEffect(() => {
                const status = statusNow
                const allowed = toDisabled.includes(status) ? true : false
                setCurrentStatus(allowed);
            }, [statusNow]);
            console.log(statusNow);
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
                                layers={2}
                                row={6}
                                category={4}
                                data={data} 
                                set={setdata} 
                                handleKeyDown={handleKeyDown} 
                                target={target} 
                                max={max} 
                                min={min}
                                status ={(currentStatus || processing) && !(edit)}
                    />
                : tableOption === 'perpen' ?
                    <SlicingHFP 
                        perpenD={perpenD}
                        setPerpenD={setPerpenD}
                        jigs={2}
                        layers={6}
                        row={4}
                        status ={(currentStatus || processing) && !(edit)}
                        handleKeyDown={handleKeyDown} 
                        perpen={0.05}
                    />
                        
                :tableOption === 'parallelism' ?
                    <SlicingParallelism 
                        parallelism={parallelism}
                        setParallelism={setParallelism}
                        jigs={2}
                        layers={6}
                        row={4}
                        status ={(currentStatus || processing) && !(edit)}
                        handleKeyDown={handleKeyDown} 
                        perpen={0.05}
                        max={max}
                        min={min}
                    />
                        
                :null
            }
            
        </div>
    )
}