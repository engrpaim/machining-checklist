import { useState } from "react"
import MassPro from "./MassPro";
import { handleKeyDown } from "../utils/UtilityFunctions";
import GraphControlX from "./GraphControlX"
import GraphControlR from "./GraphControlR"
import HFPDisplay from "./HFPDisplay";
export default function LappingData({currentModel,numberOfPoints = 10, massProForm ,setMassProForm,MassproProcessing, statusNow,edit,hfpData,setHfpData,process,om_specs}){
    console.log('Lapping Model: ',currentModel,massProForm,statusNow);
    const status = statusNow
    const toDisabled = ['prepared', 'measured', 'approved']
    const allowed = toDisabled.includes(status)
    const [currnetModelState , setCurrentModel] = useState(currentModel?JSON.parse(currentModel.lapping_om_specs):null)
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
    console.log('lapcurrrnet: ',massProForm,average,currnetModelState,om_specs);
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
                                    max={currnetModelState && currnetModelState.max ?Number(currnetModelState.max?.[om_specs]):null}  
                                    min={currnetModelState && currnetModelState.min ?Number(currnetModelState.min?.[om_specs]):null}  
                                    target={currnetModelState && currnetModelState.target ?Number(currnetModelState.target?.[om_specs]):null} 
                                    handleKeyDown={handleKeyDown} 
                                    massProForm={massProForm}
                                    setMassProForm={setMassProForm}
                                    dimension={currnetModelState && currnetModelState.specs ? `${process ? process.toUpperCase():'Not Found'} ${currnetModelState && currnetModelState.specs ? currnetModelState.specs?.[om_specs]:null}`:null} 
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
                                    max={currnetModelState && currnetModelState.max ?Number(currnetModelState.max?.[om_specs]):null}  
                                    min={currnetModelState && currnetModelState.min ?Number(currnetModelState.min?.[om_specs]):null}  
                                    target={currnetModelState && currnetModelState.target ?Number(currnetModelState.target?.[om_specs]):null} 
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
                        { (currnetModelState && currnetModelState.max && currnetModelState.min && currnetModelState.target)  && 
                            (
                                <div className="details-container-white-row">
                                    {
                                        (currnetModelState && currnetModelState.max && currnetModelState.min && currnetModelState.target)   &&
                                        (
                                            <>
                                                <div className="container-row">
                                                    <h1>Target Height Max:</h1>
                                                    <p>{currnetModelState && currnetModelState.max ?currnetModelState.max?.[om_specs]:null}</p>
                                                </div>
                                                <div className="container-row">
                                                    <h1>Target Height:</h1>
                                                    <p>{currnetModelState && currnetModelState.target ?currnetModelState.target?.[om_specs]:null}</p>
                                                </div>
                                                <div className="container-row">
                                                    <h1>Target Height Min:</h1>
                                                    <p>{currnetModelState && currnetModelState.min ?currnetModelState.min?.[om_specs]:null}</p>
                                                </div>
                                            </>
                                        )
                                    }
                                    {
                                        currnetModelState && currnetModelState.flat&&
                                        (
                                            <div className="container-row">
                                                <h1>Target Flatness:</h1>
                                                <p>{currnetModelState && currnetModelState.flat ?Number(currnetModelState.flat?.[om_specs]):null}</p>
                                            </div>
                                        )
                                    }
                                    {
                                        currnetModelState && currnetModelState.para &&
                                        (
                                            <div className="container-row">
                                                <h1>Target Parallelism:</h1>
                                                <p>{currnetModelState && currnetModelState.para ?Number(currnetModelState.para?.[om_specs]):null}</p>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                        <div>
                            <HFPDisplay 
                                    handleKeyDown={handleKeyDown} 
                                    hmax={currnetModelState && currnetModelState.max ?Number(currnetModelState.max?.[om_specs]):null}    
                                    hmin={currnetModelState && currnetModelState.min ?Number(currnetModelState.min?.[om_specs]):null}  
                                    htarget={currnetModelState && currnetModelState.target ?Number(currnetModelState.target?.[om_specs]):null}
                                    f={currnetModelState && currnetModelState.flat ?Number(currnetModelState.flat?.[om_specs]):null} 
                                    p={currnetModelState && currnetModelState.para ?Number(currnetModelState.para?.[om_specs]):null} 
                                    magnet={currentModel.histogram_point ? currentModel.histogram_point  : numberOfPoints ? numberOfPoints :false} 
                                    hfpData={hfpData}
                                    setHfpData={setHfpData}
                                    currentStatus={allowed}
                                    edit={edit}
                                    process={process}
                                    flatTarget={currnetModelState && currnetModelState.flat ?Number(currnetModelState.flat?.[om_specs]):null} 
                                    paraTarget={currnetModelState && currnetModelState.para ?Number(currnetModelState.para?.[om_specs]):null} 
                            />
                        </div>
                    </div>
                </>
                :null
            }
            
        </div>
    )
}