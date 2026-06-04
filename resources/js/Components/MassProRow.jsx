
import SlicingGraph from "./SlicingGraph";
export default function MassProRow({category = 3,point = 3,row,data,set,handleKeyDown,target,max,min,layers = 1}){
    const timing = ["Start","Middle","End"]

   
    const judgement =(data,point,row,target,category,layers)=>{
        console.log('Mass pro slicing',data);
        const suffix = layers > 1 ? '_jigs_':null
        let judgementResult={}
        const targetValue = target

        Array.from({length:layers},(_,x)=>{
            Array.from({length:category},(_,i)=>{
                Array.from({length:row},(_,j)=>{

                    let currentMax = false;
                    let currentMin = false;

                    Array.from({length:point},(_,k)=>{
                        console.log('sssx',i+1,k+1,j+1, suffix,x+1 , `p${k+1}_${j+1}${suffix}${x+1}`)

                        const value = data[i+1] && data[i+1][`p${k+1}_${j+1}${suffix}${x+1}`] ? Number(data[i+1][`p${k+1}_${j+1}${suffix}${x+1}`]):null

                        currentMax = !currentMax && value? value:value > currentMax? value:currentMax
                        currentMin = !currentMin && value? value:value < currentMin? value:currentMin
                        

                        let diffMax = currentMax - targetValue
                        let diffMin = targetValue - currentMin
                        
                        const worst = currentMax && currentMin ? 
                                            diffMax > diffMin ? 
                                                currentMax:currentMin
                                    :false
                        
                        judgementResult =  {
                                                ...judgementResult ,
                                                [i+1]:{
                                                        ...(judgementResult[i+1] || {}),
                                                        [j+1+(suffix?`${suffix}${x+1}`:0)]:{
                                                                ...(judgementResult[i+1]?.[k+1] || {}),
                                                                    max:currentMax,
                                                                    min:currentMin,
                                                                    worst:worst
                                                                }  
                                                        }
                                            }
                        console.log(judgementResult);
                    })
                

                })
            })
        })
        console.log('Testing: ',judgementResult);
        return judgementResult
    }

    const judgementResult = judgement(data,point,row,target,category,layers)
    const IsLayerExist = layers > 1 ? layers:1
    const suffix = IsLayerExist > 1 ? '_jigs_':null

    return(
       <>
        <div className="container-row">
            <div className="details-white">
                <div className='container-column'>
                    <div className='container-theme-black'>
                        <h1>Slicing</h1>
                        <p>Minimum:&nbsp;{min}&nbsp;Target:&nbsp;{target}&nbsp;Maximum:&nbsp;{max}</p>
                    </div>
                    <table className='masspro-table' border={1}>
                        <thead>
                            <tr>
                                <th  className="dimension-title" colSpan={5+point+IsLayerExist}>ACTUAL MEASUREMENT</th>
                            </tr>
                            <tr>
                                {
                                    IsLayerExist > 1  && (<th className="sn-color">Jigs</th>)
                                }
                                <th className="sn-color">Row</th>
                                <th className="data-color">No</th>
                                {
                                    Array.from(
                                        {length:point},(_,i)=>
                                        <th className="data-color">Pt.&nbsp;{i+1}</th>
                                    )
                                }
                                <th className="data-color">Max</th>
                                <th className="data-color">Min</th>
                                <th className="data-color">Worst</th>
                                <th className="lower-color">Lower Limit</th>
                                <th className="accepted-color">Accepted</th>
                                <th className="higher-color">Higher Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                Array.from({length:layers},(_,x)=>{
                                    return Array.from({length:category},(_,j)=>(
                                        <>
                                        {
                                                Array.from(
                                                    {length:row},(_,i)=>
                                                    (
                                                        <tr>
                                                            {(j === 0 && i === 0  && layers > 1)&& <td className="sn-color" rowSpan={row * category}>JIGS {x+1}</td>}
                                                            {i === 0  && <td className="sn-color" rowSpan={row}>ROW {j+1}</td>}
                                                            <td>{i+1}</td>
                                                            
                                                            {
                                                                Array.from({length:point},(_,k)=>(
                                                                    <td>
                                                                        <input id={`p${k+1}_${i+1}${suffix}${x+1}`}
                                                                            onKeyDown={(e)=>handleKeyDown(e)}
                                                                            onChange={
                                                                                (e)=>set?.((prev)=>
                                                                                    ({
                                                                                        ...prev,
                                                                                        [j+1]:{
                                                                                            ...prev[j+1],
                                                                                            [`p${k+1}_${i+1}${suffix}${x+1}`]:e.target.value
                                                                                        }
                                                                                    })
                                                                                )
                                                                            } 
                                                                        />
                                                                    </td>
                                                                ))
                                                            }
                                                            <td> {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].max:null}   </td>
                                                            <td> {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].min:null}   </td>
                                                            <td> {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].worst:null} </td>
                                                            <td></td>   
                                                            <td></td> 
                                                            <td></td>                                                  
                                                        </tr> 
                                                    )
                                                )
                                            }
                                        </>
                                    ))
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>


        </>
    )
}