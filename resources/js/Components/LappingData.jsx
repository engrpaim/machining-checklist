import { useState } from "react"
import MassPro from "./MassPro";
import { handleKeyDown } from "../utils/UtilityFunctions";
import GraphControlX from "./GraphControlX"
import GraphControlR from "./GraphControlR"
import HFPDisplay from "./HFPDisplay";
export default function LappingData({currentModel,numberOfPoints = 10, massProForm ,setMassProForm,MassproProcessing, statusNow,edit,hfpData,setHfpData,process}){
    console.log('Lapping Model: ',currentModel,massProForm,statusNow);
    const status = statusNow
    const toDisabled = ['prepared', 'measured', 'approved']
    const allowed = toDisabled.includes(status)

    const [currentStatus,setCurrentStatus] =useState(allowed);
    const [tableOption,setTableOption] = useState('masspro');
    console.log('EDIT OR STATUS',currentStatus,edit,toDisabled.includes(status));
    const getAverage =(massProForm)=>{
        if(!massProForm) return 
        const averageX = []
        const Rpoint = []

        let Rmax = 0
        let Rmin = 0
        Object.entries(massProForm).map(([key,value])=>{
            let average = 0;
            let count = 0;
            let min = false;
            let max = false;
            Object.entries(value).map(([point,data])=>{
                if(Number(data) <= 0) return
                count += 1
                average += Number(data) 
                min = !min || Number(data) < min ? Number(data):min
                max = !max || Number(data) > max ? Number(data):max
                
            })
            console.log('current min: ',min,' current max:',max);
            averageX.push(Number((average/count).toFixed(3)));
            const currentRpoint = max && min ? Number((max - min).toFixed(3)):null
            Rpoint.push(currentRpoint);
         
            Rmax = currentRpoint > Rmax ?currentRpoint:Rmax
            Rmin =  currentRpoint <= Rmin && currentRpoint !== null ?currentRpoint:Rmin
               console.log("R MIN MAX",Rmax,Rmin , currentRpoint < Rmin );
           
        })
        return {average:averageX , r_point:Rpoint , r_max:Rmax , r_min:Rmin}
    }
    const average = getAverage(massProForm)
    console.log('lapcurrrnet: ',massProForm,average);
    return(
        <div>
            <div className="container-row">
                <button onClick={()=>setTableOption('masspro')} className="view-button" >Masspro</button>
                <button onClick={()=>setTableOption('hfp')}  className="view-button" >H-F-P</button>

            </div>
            <div>
                <h1>{tableOption.toUpperCase()} - view</h1>
                <hr/>
            </div>
            {/*Masspro table*/}
            {
                tableOption === 'masspro' ?
                <>
                    <div>
                        <div>
                            <h1>Measuring</h1>
                        </div>
                        {
                            (
                                <MassPro 
                                    numberOfPoints={numberOfPoints} 
                                    max={currentModel.lappingt_max ?? 0}  
                                    min={currentModel.lappingt_min ?? 0}
                                    target={currentModel.lappingt_target ?? 0}
                                    handleKeyDown={handleKeyDown} 
                                    massProForm={massProForm}
                                    setMassProForm={setMassProForm}
                                    dimension="Thickness"
                                    currentStatus={allowed}
                                    edit={edit}
                                />
                            )
                        }
                    </div>
                    <div>
                        <div>
                            <h1>Graph</h1>
                        </div>
                        <div className="container-row">
                            <div>
                                <GraphControlX
                                    max={currentModel.lappingt_max ?? 0}  
                                    min={currentModel.lappingt_min ?? 0}
                                    target={currentModel.lappingt_target ?? 0}
                                    XAverage={average.average}
                                />
                            </div>
                            <div>
                                <GraphControlR data={average.r_point} min={average.r_min} max={average.r_max}/>
                            </div>
                        </div>
                    </div>
                </>
                :tableOption === 'hfp' ?
                <>
                    <div className="container-column">
                        <h1>Measuring</h1>
                        {(currentModel.lappingt_max || currentModel.lappingt_min || currentModel.flatness_lapping) && 
                            (
                                <div className="details-container-white-row">
                                    {
                                        (currentModel.lappingt_max && currentModel.lappingt_min  && currentModel.lappingt_target)   &&
                                        (
                                            <>
                                                <div className="container-row">
                                                    <h1>Target Height Max:</h1>
                                                    <p>{currentModel.lappingt_max}</p>
                                                </div>
                                                <div className="container-row">
                                                    <h1>Target Height:</h1>
                                                    <p>{currentModel.lappingt_target}</p>
                                                </div>
                                                <div className="container-row">
                                                    <h1>Target Height Min:</h1>
                                                    <p>{currentModel.lappingt_min}</p>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        currentModel.flatness_lapping &&
                                        (
                                            <div className="container-row">
                                                <h1>Target Flatness:</h1>
                                                <p>{currentModel.flatness_lapping}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        currentModel.parallelism_lapping &&
                                        (
                                            <div className="container-row">
                                                <h1>Target Parallelism:</h1>
                                                <p>{currentModel.parallelism_lapping}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        <div>
                            <HFPDisplay 
                                    handleKeyDown={handleKeyDown} 
                                    hmax={currentModel.lappingt_max ?? false} 
                                    hmin={currentModel.lappingt_min ?? false}
                                    htarget={currentModel.lappingt_target ?? false}
                                    f={currentModel.flatness_lapping ?? false} 
                                    p={currentModel.parallelism_lapping ?? false} 
                                    magnet={currentModel.histogram_point ? currentModel.histogram_point  : numberOfPoints ? numberOfPoints :false} 
                                    hfpData={hfpData}
                                    setHfpData={setHfpData}
                                    currentStatus={allowed}
                                    edit={edit}
                                    process={process}
                                    flatTarget={currentModel.flatness_lapping ?? 0}
                                    paraTarget={currentModel.parallelism_lapping ?? 0}
                            />
                        </div>
                    </div>
                </>
                :null
            }
            
        </div>
    )
}