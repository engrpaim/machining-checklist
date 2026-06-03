import { useState } from "react"
import MassProRow from "./MassProRow";
export default function SlicingDetails({data,setdata,handleKeyDown,target,max,min,points}){
    const [tableOption,setTableOption] = useState('masspro');
    return(
        <div>
            <div className="container-row">
                <button onClick={()=>setTableOption('masspro')} className="view-button" >Masspro</button>
                <button onClick={()=>setTableOption('hfp')}  className="view-button" >H-F-P</button>
            </div>
            {
                tableOption === 'masspro' && (
                    <MassProRow 
                                point={points} 
                                row={4}
                                category={7}
                                layers={1}
                                data={data} 
                                set={setdata} 
                                handleKeyDown={handleKeyDown} 
                                target={target} 
                                max={max} 
                                min={min}
                    />
                )
            }
        </div>
    )
}