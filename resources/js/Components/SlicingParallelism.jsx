import CountingGraph from './CountingGraph'
export default function SlicingParallelism({jigs = 1 , row = 3,layers = 3,max,min,handleKeyDown,status,data,set,setParallelism,parallelism,perpenTarget = 0.05,side='W-L'}){
   
    const perpenAverage =[]
    const perpenJudgement =(parallelism,jigs,row,layers,perpenTarget,max,min)=>{
        
        console.log('PARAAA DDDssss:',parallelism,max,min );

        const currentMax = Number(max)
        const currentMin = Number(min)

        const arrayExist = Object.values(parallelism).length

        let judgement = {}
        let AllJudgement ={}

        console.log('PERPEN JUDGEMENT: ',judgement);
        Object.entries(parallelism).map(([key,values])=>{
            Array.from({length:row},(_,y)=>{
                console.log(parallelism,'Row number: ',y+1);
                Array.from({length:jigs},(_,x)=>{
                    
                    
                    Array.from({length:layers},(_,i)=>{
                        console.log('Layer:' , i+1 , `Key:${key} top1_jig${x+1}_row${y+1}_layer${i+1}` , values?.[`top1_jig${x+1}_row${y+1}_layer${i+1}`])
                        
                        // loop top
                        console.log('Jig: ',x+1)
                        let top1para = 0;
                        let bottom1Para = 0;
                        let currentDiff = 0;
                        let maxDiff = null
                        let paraJudgement =''
                        let finalparaJudgement =''
                        let paratheme =''
                        let finaltheme =''
                        Array.from({length:5},(_,z)=>{
                            console.log(`top${z+1}para loops`, `top${z+1}_jig${x+1}_row${y+1}_layer${i+1}`, Number(values?.[`top${z+1}_jig${x+1}_row${y+1}_layer${i+1}`]),top1para);
                            top1para = !top1para || top1para < Number(values?.[`top${z+1}_jig${x+1}_row${y+1}_layer${i+1}`])  ? Number(values?.[`top${z+1}_jig${x+1}_row${y+1}_layer${i+1}`])  :top1para
                            bottom1Para = !bottom1Para || bottom1Para < Number(values?.[`bottom${z+1}_jig${x+1}_row${y+1}_layer${i+1}`])  ? Number(values?.[`bottom${z+1}_jig${x+1}_row${y+1}_layer${i+1}`])  :bottom1Para
                            
                            maxDiff = top1para > bottom1Para ? top1para - bottom1Para:bottom1Para - top1para 
                            console.log('Judgement parallelism: ',maxDiff , perpenTarget);
                            finalparaJudgement = maxDiff >= 0 &&  maxDiff < perpenTarget - 0.01 ? 'GOOD PARALLELISM PROCCED': 'STOP MAKE ADJUSTMENT'
                            paraJudgement = maxDiff >= 0 &&  maxDiff < perpenTarget - 0.01 ? 'ACCEPT':  maxDiff > perpenTarget - 0.01  &&  maxDiff < perpenTarget?'ADJUST':'REJECT'

                            paratheme = paraJudgement === 'ACCEPT' ? 'accept-masspro':paraJudgement === 'ADJUST' ? 'adjust-masspro':'reject-masspro'
                            finaltheme = finalparaJudgement === 'GOOD PARALLELISM PROCCED' ? 'accept-masspro':finalparaJudgement === 'STOP MAKE ADJUSTMENT' ? 'reject-masspro':'adjust-masspro'
                        })

                        console.log(`top: `,top1para);

                        if(maxDiff >= 0){

                            judgement ={
                                ...judgement,
                                [x+1]:{
                                    ...(judgement[x+1] || {}),
                                    [y+1]:{
                                        ...(judgement[x+1]?.[y+1] || {}),
                                        [i+1]:{
                                            ...(judgement[x+1]?.[y+1]?.[i+1] || {}),
                                            max:maxDiff,
                                            judgement:paraJudgement,
                                            final:finalparaJudgement,
                                            paratheme:paratheme,
                                            finaltheme:finaltheme

                                        }
                                    }
                                }
                            }

                            perpenAverage.push(maxDiff);

                        }
                    })
                })
            })    
        });
        console.log('JUDGEMENT para: ',judgement);
        return judgement
    }

    const judgementPerpen  = perpenJudgement(parallelism,jigs,row,layers,perpenTarget,max,min) 
    console.log('cxx',judgementPerpen);
    return(
        <div className="container-column">
            <div className="details-white">
                <div className="container-column">
                    <div className='container-theme-black'>
                        <h1>Parallelism</h1>
                        <div className='container-row'>
                             <p>Max:&nbsp;{perpenTarget}</p>
                             <p><strong style={{ fontWeight:'bold' }}>Height</strong> Max:&nbsp;{max}&nbsp;Min:&nbsp;{min}</p>
                        </div>
                    </div>
                        <table className='masspro-table' border={1}>
                            <thead>
                                <tr>
                                    {jigs > 1 && (<th className="dimension-title" rowSpan={2}>Jig</th>)}
                                    <th className="dimension-title" rowSpan={2}>Row</th>
                                    <th className="dimension-title" rowSpan={2}>Number</th>
                                    <th className="dimension-title" colSpan={5}>Data</th>
                                    <th className="dimension-title" colSpan={2}>parallelism</th>
                                    <th className="dimension-title" style={{  width:'20rem' }}  colSpan={4} rowSpan={2}>Final judgement </th>
                                </tr>
                                <tr>
                                    <th className="data-color" style={{  width:'10rem' }}>Pt. 1</th>
                                    <th className="data-color" style={{  width:'10rem' }}>Pt. 2</th>
                                    <th className="data-color" style={{  width:'10rem' }}>Pt. 3</th>
                                    <th className="data-color" style={{  width:'10rem' }}>Pt. 4</th>
                                    <th className="data-color" style={{  width:'10rem' }}>Pt. 5</th>
                                    <th className="data-color" style={{  width:'10rem' }} rowSpan={1}>Value</th>
                                    <th className="data-color" style={{  width:'10rem' }} rowSpan={1}>Judgement</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Array.from(
                                        {length:jigs},(_,i)=>
                                            Array.from(
                                                {length:row},(_,j)=>
                                                    Array.from(
                                                        {length:layers},(_,k)=>{
                                                            return(
                                                                <>
                                                                <tr className="highlight-point">
                                                                    {j === 0 && k === 0  && jigs > 1 && <td className="dimension-title" rowSpan={row * layers * 2}>Jig {i+1}</td>}
                                                                    {k === 0  && <td  className="dimension-title" rowSpan={layers * 2}>Row {j+1}</td>}
                                                                    <td rowSpan={2}>{k+1}</td>
                                                                    <td>
                
                                                                            <input 
                                                                                id={`top1_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`top1_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`top1_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`top1_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                    <td>
                
                                                                            <input 
                                                                                id={`top2_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`top2_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`top2_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`top2_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                           
                                                                           <td>
                
                                                                            <input 
                                                                                id={`top3_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`top3_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`top3_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`top3_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                     <td >
                
                                                                            <input 
                                                                                id={`top4_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`top4_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`top4_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`top4_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                    <td>
                
                                                                            <input 
                                                                                id={`top5_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`top5_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`top5_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`top5_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                    </td>
                                                                    
                                                                           
                                                                            
                                                                    
                                                                    
                                                                    <td 
                                                                        className={judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].paratheme ? judgementPerpen[i+1] ?.[j+1]?.[k+1].paratheme : null}
                                                                        rowSpan={2}>{judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].max ? (Math.floor(judgementPerpen?.[i + 1]?.[j + 1]?.[k + 1]?.max * 1000) / 1000).toFixed(3):judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].max === 0?0 : null}</td>
                                                                    <td 
                                                                        className={judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].paratheme ? judgementPerpen[i+1] ?.[j+1]?.[k+1].paratheme : null}
                                                                        rowSpan={2}>{judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].judgement ? judgementPerpen[i+1] ?.[j+1]?.[k+1].judgement : null}</td>
                                                                    <td 
                                                                        className={judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].paratheme ? judgementPerpen[i+1] ?.[j+1]?.[k+1].finaltheme : null}
                                                                        rowSpan={2}>{judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].final ? judgementPerpen[i+1] ?.[j+1]?.[k+1].final : null}</td>
                                                                </tr>
                                                                <tr className="highlight-point">
                                                                     <td>
                
                                                                            <input 
                                                                                id={`bottom1_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`bottom1_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`bottom1_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`bottom1_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                    <td>
                
                                                                            <input 
                                                                                id={`bottom2_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`bottom2_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`bottom2_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`bottom2_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                           
                                                                           <td>
                
                                                                            <input 
                                                                                id={`bottom3_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`bottom3_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`bottom3_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`bottom3_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                     <td>
                
                                                                            <input 
                                                                                id={`bottom4_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`bottom4_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`bottom4_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`bottom4_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    </td>
                                                                    <td>
                
                                                                            <input 
                                                                                id={`bottom5_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                                onChange={(e)=>setParallelism?.((prev)=>({
                                                                                    ...prev,
                                                                                    [j+1]:{
                                                                                        ...prev[j+1],
                                                                                        [`bottom5_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                    }
                                                                                }))} 
                                                                                value={parallelism[j+1]?.[`bottom5_jig${i+1}_row${j+1}_layer${k+1}`]? parallelism[j+1]?.[`bottom5_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                                onKeyDown={(e)=>handleKeyDown(e)} disabled={status}
                                                                            />
                                                                         
                                                                    
                                                                    </td>
                                                                    
                                                                </tr>
                                                                </>
                                                            )
                                                        }
                                                    )
                                            )
                                    )
                                }
                            </tbody>
                        </table>
                    </div>
            </div>
            <div>
                <CountingGraph process={'slicing'}  maxperpen={perpenTarget ?? 0}  perpendicularity={perpenAverage}/>
            </div>
        </div>
    )
}