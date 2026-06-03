import '../../css/app.css'
import CountingGraph from './CountingGraph';
import GraphControlX from './GraphControlX';
export default function HFPDisplay({hmax=false,hmin =false,htarget=false,f=false,p=false,magnet = 10,handleKeyDown , hfpData , setHfpData,edit,currentStatus,process,max,min,target,flatTarget,paraTarget}){
    console.log('New Data HFP: ', hfpData);


    const heightJudgement=(hfpData,hmax,hmin)=>{
         console.log('Judgement inprocess: ', hfpData);
         const judgement = {}
         const plotFlatness = []
         const plotParallelism = []
         const plotHeight = []
         Object.entries(hfpData).map(([key,values])=>{
            let currentMaxTop = false
            let currentMinTop = false 
            let currentMaxBottom = false
            let currentMinBottom = false 
            console.log('Hello key',key);
            Object.entries(values).map(([valueKey,valueItems])=>{
                
                const currentKey = Number(key)
                console.log(currentKey);
                const valueItem = Number(valueItems)

                if(valueKey.includes('top')) currentMaxTop = !currentMaxTop || valueItem > currentMaxTop ? valueItem:currentMaxTop
                if(valueKey.includes('top')) currentMinTop = !currentMinTop || valueItem < currentMinTop ? valueItem:currentMinTop

                if(valueKey.includes('bottom')) currentMaxBottom = !currentMaxBottom || valueItem > currentMaxBottom ? valueItem:currentMaxBottom
                if(valueKey.includes('bottom')) currentMinBottom = !currentMinBottom || valueItem < currentMinBottom ? valueItem:currentMinBottom

                const flatnessDiffTop = currentMaxTop - currentMinTop
                const flatnessDiffBottom = currentMaxBottom - currentMinBottom
                
                const pointMax = currentMaxTop > currentMaxBottom ?currentMaxTop:currentMaxBottom?currentMaxBottom:currentMaxTop
                const pointMin = currentMinTop < currentMinBottom ? currentMinTop:currentMinBottom?currentMinBottom:currentMinTop

                const parallelismValue = pointMax && pointMin? pointMax - pointMin:null
                const flatnessValue = flatnessDiffTop < flatnessDiffBottom ?flatnessDiffTop:flatnessDiffBottom

                const ftheme = f  && flatnessValue > f - 0.001 ?'FOR ADJUSMENT':flatnessValue >= 0 ?'ACCEPT':false
                const ptheme = p && parallelismValue > p - 0.001 ?'FOR ADJUSMENT':parallelismValue >= 0 ?'ACCEPT':false
                const htheme = pointMax  + 0.01 > hmax || pointMax  - 0.01  < hmin? 'FOR ADJUSMENT':pointMax ? 'ACCEPT':false


                // plot
                plotFlatness[Number(key) - 1] = flatnessDiffBottom
                plotParallelism[Number(key) - 1] = parallelismValue
                plotHeight[Number(key) - 1] = pointMax

                judgement[key] = {
                    heightmax:typeof pointMax === 'number'? pointMax.toFixed(3):null,
                    heightjudgement:pointMax? htheme:null,
                    htheme:pointMax >= 0 && htheme === 'ACCEPT' ? 'accept-masspro':pointMax >= 0 && htheme === 'FOR ADJUSMENT'?'adjust-masspro':null,
                    flatness:typeof flatnessValue === 'number'? flatnessValue.toFixed(3):null,
                    flatnessjudgement: flatnessValue >= 0?ftheme:null,
                    ftheme:flatnessValue >= 0 && ftheme === 'ACCEPT' ? 'accept-masspro':flatnessValue >= 0 && ftheme === 'FOR ADJUSMENT'?'adjust-masspro':null,
                    parallelism:typeof parallelismValue === 'number'?parallelismValue.toFixed(3):null,
                    parallelismjudgement:parallelismValue >= 0 ?ptheme:null,
                    ptheme:parallelismValue >= 0 && ptheme === 'ACCEPT' ? 'accept-masspro':parallelismValue >= 0 && ptheme === 'FOR ADJUSMENT'?'adjust-masspro':null,
                }



            })
            judgement['fplot'] = plotFlatness
            judgement['pplot'] = plotParallelism
            judgement['hplot'] = plotHeight
            console.log(currentMaxTop , currentMinTop ,judgement);
         })
        console.log('Judgeeementts',judgement);

        return judgement

    }
    const judgementResult  = heightJudgement(hfpData,hmax,hmin)
    return(
        <>
            <div className="details-container-white">
                <table className="hfp-table">
                    <thead>
                        <tr>
                            <th rowSpan={2}>S/N</th>
                            <th rowSpan={2}>Position</th>
                            <th colSpan={5}>Data</th>
                            {(hmax || hmin) && (<th colSpan={2}>Height</th>)}
                            { p && (<th colSpan={2}>Parallelism</th>)}
                            { f && (<th colSpan={2}>Flatness</th>)}
                        </tr>
                        <tr>
                            <th>Pt.1</th>
                            <th>Pt.2</th>
                            <th>Pt.3</th>
                            <th>Pt.4</th>
                            <th>Pt.5</th>

                            {(hmax || hmin) && (
                                        <>
                                            <th>Value</th>
                                            <th>Judgement</th>
                                        </>
                                    )}

                            {p && (
                                        <>
                                            <th>Value</th>
                                            <th>Judgement</th>
                                        </>
                                    )}

                            {f&& (
                                        <>
                                            <th>Value</th>
                                            <th>Judgement</th>
                                        </>
                                    )}
                            
                        </tr>
                    </thead>
                    <tbody>
                        {
                        Array.from
                        (
                                {length:magnet},(_,i)=>
                                    
                                        <tr >
                                            <td>{i+1}</td>
                                            <td>
                                                <div>
                                                    <p style={{ background:'#E6F6FF'}}>Top</p>
                                                    <p>Bottom</p>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <input  style={{ background:'#E6F6FF'}}  
                                                            type="number" 
                                                            onKeyDown={(e=>handleKeyDown(e))}
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p1_top"] ? hfpData?.[i+1]["p1_top"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p1_top:e.target.value}
                                                                            }))
                                                                    }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                    <input  type="number"
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p1_bottom"] ? hfpData?.[i+1]["p1_bottom"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p1_bottom:e.target.value}
                                                                            }))
                                                                    }
                                                            onKeyDown={(e=>handleKeyDown(e)) }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <input  style={{ background:'#E6F6FF'}}  
                                                            type="number" 
                                                            onKeyDown={(e=>handleKeyDown(e))} 
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p2_top"] ? hfpData?.[i+1]["p2_top"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p2_top:e.target.value}
                                                                            }))
                                                                    }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                    <input  type="number"
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p2_bottom"] ? hfpData?.[i+1]["p2_bottom"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p2_bottom:e.target.value}
                                                                            }))
                                                                    }
                                                            onKeyDown={(e=>handleKeyDown(e)) }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <input  style={{ background:'#E6F6FF'}}  
                                                            type="number" 
                                                            onKeyDown={(e=>handleKeyDown(e))} 
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p3_top"] ? hfpData?.[i+1]["p3_top"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p3_top:e.target.value}
                                                                            }))
                                                                    }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                    <input  type="number"
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p3_bottom"] ? hfpData?.[i+1]["p3_bottom"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p3_bottom:e.target.value}
                                                                            }))
                                                                    }
                                                            onKeyDown={(e=>handleKeyDown(e)) }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <input  style={{ background:'#E6F6FF'}}  
                                                            type="number" 
                                                            onKeyDown={(e=>handleKeyDown(e))}
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p4_top"] ? hfpData?.[i+1]["p4_top"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p4_top:e.target.value}
                                                                            }))
                                                                    }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                    <input  type="number"
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p4_bottom"] ? hfpData?.[i+1]["p4_bottom"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p4_bottom:e.target.value}
                                                                            }))
                                                                    }
                                                            onKeyDown={(e=>handleKeyDown(e)) }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                </div>
                                            </td>
                                            <td>
                                                <div>
                                                    <input  style={{ background:'#E6F6FF'}}  
                                                            type="number" 
                                                            onKeyDown={(e=>handleKeyDown(e))}
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p1_bottom"] ? hfpData?.[i+1]["p5_top"]:null} 
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p5_top:e.target.value}
                                                                            }))
                                                                    }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                    <input  type="number"
                                                            value ={hfpData?.[i+1] && hfpData?.[i+1]["p1_bottom"] ? hfpData?.[i+1]["p5_bottom"]:null}
                                                            onChange={
                                                                        (e)=> 
                                                                            setHfpData((prev)=>({
                                                                                ...prev,
                                                                                [i+1]:{...prev[i+1],p5_bottom:e.target.value}
                                                                            }))
                                                                    }
                                                            onKeyDown={(e=>handleKeyDown(e)) }
                                                            disabled={(currentStatus) && !(edit)}/>
                                                </div>
                                            </td>

                                            {(hmax || hmin)  && (
                                                <>
                                                    <td className={judgementResult && judgementResult?.[i+1] && judgementResult?.[i+1].htheme ?judgementResult?.[i+1].htheme:null}>
                                                        {judgementResult &&judgementResult?.[i+1] && judgementResult?.[i+1].heightmax ? judgementResult?.[i+1].heightmax :null}
                                                    </td>
                                                    <td className={judgementResult && judgementResult?.[i+1] && judgementResult?.[i+1].htheme ?judgementResult?.[i+1].htheme:null}>
                                                        {judgementResult &&judgementResult?.[i+1] && judgementResult?.[i+1].heightjudgement ? judgementResult?.[i+1].heightjudgement :null}
                                                    </td>
                                                </>
                                            )}
                                            
                                            {p && (
                                                <>
                                                    <td className={judgementResult && judgementResult?.[i+1] && judgementResult?.[i+1].ptheme ?judgementResult?.[i+1].ptheme:null}>
                                                        {judgementResult &&judgementResult?.[i+1] && judgementResult?.[i+1].parallelism >= 0 ? judgementResult?.[i+1].parallelism :null}
                                                    </td>
                                                    <td className={judgementResult && judgementResult?.[i+1] && judgementResult?.[i+1].ptheme ?judgementResult?.[i+1].ptheme:null}>
                                                        {judgementResult &&judgementResult?.[i+1] && judgementResult?.[i+1].parallelismjudgement ? judgementResult?.[i+1].parallelismjudgement :null}
                                                    </td>
                                                </>
                                            )}

                                            {f && (
                                                <>
                                                    <td className={judgementResult && judgementResult?.[i+1] && judgementResult?.[i+1].ftheme ?judgementResult?.[i+1].ftheme:null}>
                                                        {judgementResult &&judgementResult?.[i+1] && judgementResult?.[i+1].flatness >= 0 ? judgementResult?.[i+1].flatness :null}
                                                    </td>
                                                    <td className={judgementResult && judgementResult?.[i+1] && judgementResult?.[i+1].ftheme ?judgementResult?.[i+1].ftheme:null}>
                                                        {judgementResult &&judgementResult?.[i+1] && judgementResult?.[i+1].flatnessjudgement ? judgementResult?.[i+1].flatnessjudgement :null}
                                                    </td>
                                                </>
                                            )}

                                        </tr>
                                
                        )
                        }
                    </tbody>
                </table>
            </div>
            <div className="container-row">
                {
                    htarget && 
                    <div>
                        <GraphControlX target={htarget} max={hmax} min={hmin} XAverage={judgementResult && judgementResult.hplot ? judgementResult.hplot:null}/>
                    </div>
                }
                {
                    f && 
                    <div>
                        <CountingGraph process={process} maxperpen={flatTarget} perpendicularity={judgementResult && judgementResult.fplot ? judgementResult.fplot:null}/>
                    </div>
                }
                {
                    p && 
                    <div>
                        <CountingGraph process={process} maxperpen={paraTarget} perpendicularity={judgementResult && judgementResult.pplot ? judgementResult.pplot:null}/>
                    </div>
                }
            </div>
        </>
    )
  
}