
import { useState, useEffect } from "react";

export default function LappingDetails({lappingForm , setLappingForm , handleKeyDown,edit,LappingProcessing}){
      const [currentStatus, setCurrentStatus] = useState(null);
        const toDisabled = ['prepared', 'measured', 'approved']
        useEffect(() => {
            const status = lappingForm.status
            const allowed = toDisabled.includes(status) ? true : false
            setCurrentStatus(allowed);
        }, [lappingForm]);
    return(
        <div className="details-container-gray" style={{ height:'100%' }}>
            <div>
                <h1>Lapping Details</h1>
            </div>
            <div className="details-data" style={{ width:'20rem' }}>
                <label>Comparator Serial:</label>
                <input  
                        value={lappingForm.comparator_serial} 
                        onChange={(e)=>setLappingForm('comparator_serial',e.target.value)} 
                        onKeyDown={(e)=>handleKeyDown(e)} 
                        disabled={(currentStatus || LappingProcessing) && !(edit)}
                />
            </div>
        </div>
    )
}