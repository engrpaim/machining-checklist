export default function SlicingDetails({slicingDetails,setSlicingDetails,handleKeyDown}){
    return(
        <div className="details-container-gray">
            <h1>Slicing Details</h1>
            <div className="details-container-inner">
                <div className="details-part">
                    <div className="details-data">
                        <label>Machine Number:</label>
                        <input value={slicingDetails.machine_number} onChange={(e)=>setSlicingDetails('machine_number',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>
                    <div className="details-data">
                        <label>Pattern:</label>
                        <input value={slicingDetails.pattern} onChange={(e)=>setSlicingDetails('pattern',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>
                    <div className="details-data">
                        <label>Cutting Speed:</label>
                        <input value={slicingDetails.cutting_speed} onChange={(e)=>setSlicingDetails('cutting_speed',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>

                    <div className="details-data">
                        <label>No. of pass</label>
                        <input value={slicingDetails.no_of_pass} onChange={(e)=>setSlicingDetails('no_of_pass',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>
                </div>
                <div className="details-part" >
                    <div className="details-data" style={{ width:'20rem' }}>
                        <label>Motor Load:</label>
                        <input value={slicingDetails.motor_load} onChange={(e)=>setSlicingDetails('motor_load',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>
                    <div className="details-data" style={{ width:'20rem' }}>
                        <label >Micrometer Serial No.:</label>
                        <input value={slicingDetails.micrometer_serial_number} onChange={(e)=>setSlicingDetails('micrometer_serial_number',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>
                    <div className="details-data" style={{ width:'20rem' }}>
                        <label>Checking Condition:</label>
                        <input value={slicingDetails.checking_condition} onChange={(e)=>setSlicingDetails('checking_condition',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>

                    <div className="details-data" style={{ width:'20rem' }}>
                        <label>No. of TB/CYCLE:</label>
                        <input value={slicingDetails.no_of_tb_cycle} onChange={(e)=>setSlicingDetails('no_of_tb_cycle',e.target.value)} onKeyDown={(e)=>handleKeyDown(e)}/>
                    </div>
                </div>
            </div>
            
        </div>
    )
}