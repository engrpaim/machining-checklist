
import SlicingGraph from "./SlicingGraph";
export default function MassProRow({category = 3,point = 3,row,data,set,handleKeyDown,target,max,min,layers = 1,status,tolerance = 0.01,side}){
    const timing = ["Start","Middle","End"]

   
    const judgement =(data,point,row,target,category,layers,min,max)=>{
        console.log('Mass pro slicing',data);
        const suffix = layers > 1 ? '_jigs_':false
        let judgementResult={}
      
        const targetValue = target
        /*
            layers  - return jigs
            category - return row
            row - return numebr of sampple
            points - return number of point
        */
        Array.from({length:layers},(_,x)=>{
            Array.from({length:category},(_,i)=>{
                Array.from({length:row},(_,j)=>{

                    let currentMax = false;
                    let currentMin = false;
                    let currentLimit = {};
                    let limitValue = '';
                    
                    let lw = 0;
                    let critlw = 0;
                    let crit100lw = 0;
                    let goodPoint = 0;
                    let hw = 0;
                    let crithw = 0;
                    let crit100hw = 0;

                    Array.from({length:point},(_,k)=>{
                        console.log('sssx',i+1,k+1,j+1, suffix,x+1 , `p${k+1}_${j+1}`+(suffix?`${suffix}${x+1}`:''))

                        const value = data[i+1] && data[i+1][`p${k+1}_${j+1}`+(suffix?`${suffix}${x+1}`:'')] ? Number(data[i+1][`p${k+1}_${j+1}`+(suffix?`${suffix}${x+1}`:'')]):null

                        currentMax = !currentMax && value? value:value > currentMax? value:currentMax
                        currentMin = !currentMin && value? value:value < currentMin? value:currentMin
                        console.log('limitttxxx' , min - 0.01 ,Number(min) + 0.01 );
                        limitValue =  value && value > Number(min) + 0.01 &&  value < Number(max) - 0.01 ? 'accept' : value && value < Number(min) + 0.01?'lower':value && value >= Number(max) - 0.01 ?'higher':''
                        currentLimit = {
                            ...currentLimit,
                            [k+1]:limitValue
                        }
                        let diffMax = currentMax - targetValue
                        let diffMin = targetValue - currentMin

                        //lower limit
                        console.log('lower limit:' , Number(min)+ 0.1);
                        value > 0 && value < Number(min) ?lw = value
                            :value >= Number(min) && value <= Number(min)  + 0.005 && crit100lw  < value? crit100lw = value
                                :value >= Number(min)  + 0.005 && value < Number(min)  + 0.01 && critlw  < value? critlw  =value
                                    :value > Number(min)  - 0.001 && value <= Number(target)  && goodPoint  < value ? goodPoint  =value
                                        :null;

                        // higher limit
                        value > 0 && value >= Number(max) ?hw = value
                            :value >=  Number(max) - 0.01  && value <  Number(max)? crit100hw = value
                                :value >=  Number(target) - 0.02  && value <  Number(max)? crithw = value
                                        :null;


                       
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
                                                                    worst:worst,
                                                                    points:currentLimit,
                                                                    lw:lw,
                                                                    hw:hw,
                                                                    crithw:crithw,
                                                                    critlw:critlw,
                                                                    crit100hw:crit100hw,
                                                                    crit100lw:crit100lw,
                                                                    goodPoint:goodPoint
                                                                }  
                                                        }
                                            }
                        console.log(judgementResult);
                    })
                

                })
            })
        })
        console.log('Testing: ',judgementResult,);
        return judgementResult
    }

    const judgementResult = judgement(data,point,row,target,category,layers,min,max)
    const IsLayerExist = layers > 1 ? layers:1
    const suffix = IsLayerExist > 1 ? '_jigs_':null

    const pointJudegement =(point,judgement,array)=>{
        let pointsIncluded = ''
        console.log('points to judege: ' , array);
        if(!array) return; 
       Object.entries(array).map(([key,values])=>{
           console.log(key,values);
           if(values !== judgement) return
           pointsIncluded !== '' ? pointsIncluded += ' , Pt. ' + `${key}` : pointsIncluded += 'Pt. ' + `${key}`
       })

        return pointsIncluded
    }
    console.log('Maassprro',status)
    return(
       <>
        <div className="container-row">
            <div className="details-white">
                <div className='container-column'>
                    <div className='container-theme-black'>
                        <h1>Slicing&nbsp;{side?side:''}</h1>
                        <p>Minimum:&nbsp;{min}&nbsp;Target:&nbsp;{target}&nbsp;Maximum:&nbsp;{max}</p>
                    </div>
                    <table className='masspro-table' border={1}>
                        <thead>
                            <tr>
                                <th  className="dimension-title" colSpan={5+point+IsLayerExist+3}>ACTUAL MEASUREMENT</th>
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
                                                                        <input id={`p${k+1}_${i+1}` + (suffix ? `${suffix}${x+1}`:'')}
                                                                            onKeyDown={(e)=>handleKeyDown(e)}
                                                                            value={data[j+1]?.[`p${k+1}_${i+1}` + (suffix ? `${suffix}${x+1}`:'')]}
                                                                            disabled={status}
                                                                            onChange={
                                                                                (e)=>set?.((prev)=>
                                                                                    ({
                                                                                        ...prev,
                                                                                        [j+1]:{
                                                                                            ...prev[j+1],
                                                                                            [`p${k+1}_${i+1}`+ (suffix ? `${suffix}${x+1}`:'')]:e.target.value
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

            {/*Graph*/}
            <div className="details-white">
                <div className='container-column'>
                    <div className='container-theme-black'>
                        <h1>Slicing</h1>
                        <p>Minimum:&nbsp;{min}&nbsp;Target:&nbsp;{target}&nbsp;Maximum:&nbsp;{max}</p>
                    </div>
                    <table className='masspro-table' border={1}>
                        <thead>
                            <tr>
                                <th  className="dimension-title" colSpan={5+point+IsLayerExist+3}>ACTUAL MEASUREMENT</th>
                            </tr>
                            <tr>
                                
                                <th className="data-color">No</th>
                                <th className="data-color">LW</th>
                                <th className="data-color">100% Checking</th>
                                <th className="data-color">Critical Limit</th>
                                <th className="data-color">Good</th>
                                <th className="data-color">Critical Limit</th>
                                <th className="data-color">100% Checking</th>
                                <th className="data-color">HW</th>
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
                                                           
                                                            <td>{i+1}</td>
                                                            <td 
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].lw > 0? "reject-masspro":"idle-masspro"}>
                                                                   {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].lw > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].lw:''}
                                                            </td>
                                                            <td 
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crit100lw > 0? "adjust-masspro":"idle-masspro"}>    
                                                                {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crit100lw > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crit100lw:''}
                                                            </td>
                                                            <td 
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].critlw > 0? "adjust-masspro":"idle-masspro"}>
                                                                {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].critlw > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].critlw:''}
                                                            </td>
                                                            <td 
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].goodPoint > 0? "accept-masspro":"idle-masspro"}>
                                                                {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].goodPoint > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].goodPoint:''}
                                                            </td>
                                                            <td  
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crithw > 0? "adjust-masspro":"idle-masspro"}>
                                                                    {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crithw > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crithw:''}
                                                            </td>
                                                            <td  
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crit100hw > 0? "reject-masspro":"idle-masspro"}>
                                                                    {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crit100hw > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].crit100hw:''}
                                                            </td>
                                                            <td  
                                                                className={judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].hw > 0? "reject-masspro":"idle-masspro"}>
                                                                    {judgementResult[j+1] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)] && judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].hw > 0 ? judgementResult[j+1]?.[i+1+(suffix?`${suffix}${x+1}`:0)].hw:''}
                                                            </td>
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