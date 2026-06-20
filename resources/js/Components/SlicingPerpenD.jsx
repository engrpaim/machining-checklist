import CountingGraph from "./CountingGraph";
export default function SlicingPerpenD({jigs = 1 , row = 3,layers = 3,handleKeyDown,status,data,set,setPerpenD,perpenD,perpenTarget = 0.08,side='W-L'}){
   
    const perpenAverage = [];
    const perpenJudgement =(perpenD,jigs,row,layers,perpenTarget)=>{
        console.log('PERPEN DDD:',perpenD,Object.values(perpenD).length);

        const arrayExist = Object.values(perpenD).length
        let judgement = {}
        let AllJudgement = {}
        
        console.log('PERPEN JUDGEMENT: ',judgement);
        Object.entries(perpenD).map(([key,values])=>{
            Array.from({length:row},(_,y)=>{
                console.log(perpenD,'Row number: ',y+1);
                Array.from({length:jigs},(_,x)=>{
                    console.log('Jig: ',x+1)
                    Array.from({length:layers},(_,i)=>{
                        console.log('Layer:' , i+1 , `Key:${key} top1_jig${x+1}_row${y+1}_layer${i+1}` , values?.[`top1_jig${x+1}_row${y+1}_layer${i+1}`])
                        const top1 = Number(values?.[`top1_jig${x+1}_row${y+1}_layer${i+1}`])
                        const top2 = Number(values?.[`top2_jig${x+1}_row${y+1}_layer${i+1}`])
                        const bottom1 = Number(values?.[`bottom1_jig${x+1}_row${y+1}_layer${i+1}`])
                        const bottom2 = Number(values?.[`bottom2_jig${x+1}_row${y+1}_layer${i+1}`])

                        const topHighest = top1 > top2 || top1 === top2 ? top1:top2
                        const bottomHighest = bottom1 > bottom2 || bottom1 === bottom2 ? bottom1:bottom2

                        const maxPerpen = topHighest > bottomHighest || topHighest === bottomHighest ? topHighest:bottomHighest

                        const judgmentPerVlaue  =  maxPerpen < perpenTarget - 0.01? 'ACCEPT': maxPerpen >= perpenTarget - 0.01  ?'FOR ADJUST':'REJECT'
                        let finalJudgement = judgmentPerVlaue === 'ACCEPT' ? 'ACCEPT':judgmentPerVlaue === 'FOR ADJUST' ? 'FOR ADJUST':'REJECT'
                        console.log('asdsadsaas',finalJudgement);
                        const theme = finalJudgement === 'ACCEPT' ? 'accept-masspro':finalJudgement === 'FOR ADJUST' ? 'adjust-masspro':'reject-masspro'


                        finalJudgement = finalJudgement === 'FOR ADJUST' && maxPerpen >= perpenTarget - 0.01  ? 'STOP MAKE ADJUSTMENT':finalJudgement === 'ACCEPT'? 'GOOD PROCEED':finalJudgement
                        const finalTheme = finalJudgement === 'GOOD PROCEED' ? 'accept-masspro':finalJudgement === 'FOR ADJUST' ? 'adjust-masspro':'reject-masspro' 
                        if(maxPerpen){ 
                            judgement ={
                                ...judgement,
                                [x+1]:{
                                    ...(judgement[x+1] || {}),
                                    [y+1]:{
                                        ...(judgement[x+1]?.[y+1] || {}),
                                        [i+1]:{
                                            ...(judgement[x+1]?.[y+1]?.[i+1] || {}),
                                            max: maxPerpen,
                                            judgement: judgmentPerVlaue,
                                            final:finalJudgement,
                                            theme:theme,
                                            finalTheme:finalTheme
                                        }
                                    }
                                }
                            }

                            perpenAverage.push(maxPerpen)


                        }


                        
                    })
                })
            })    
        });
        console.log('JUDGEMENT: ',judgement);
        return judgement
    }

    const judgementPerpen  = perpenJudgement(perpenD,jigs,row,layers,perpenTarget) 
    console.log('cxx',judgementPerpen);
    
    return(
        <div className="container-column">
            <div className="details-white">
                <div className="container-column">
                    <div className='container-theme-black'>
                        <h1>Perpendicularity&nbsp;{side}</h1>
                        <p>Max:&nbsp;{perpenTarget}</p>
                    </div>
                        <table className='masspro-table' border={1}>
                            <thead>
                                <tr>
                                    {jigs > 1 && (<th className="dimension-title" rowSpan={2}>Jig</th>)}
                                    <th className="dimension-title" rowSpan={2} >Row</th>
                                    <th className="dimension-title" rowSpan={2} >Number</th>
                                    <th className="dimension-title" colSpan={4} >Data</th>
                                    <th className="dimension-title" colSpan={2} >Perpendicularity</th>
                                    <th className="dimension-title" colSpan={4} rowSpan={2} style={{  width:'20rem' }}>Final judgement </th>
                                </tr>
                                <tr>
                                    <th className="data-color" style={{  width:'10rem' }} >Top 1</th>
                                    <th className="data-color" style={{  width:'10rem' }} >Bottom 1</th>
                                    <th className="data-color" style={{  width:'10rem' }} >Top 2</th>
                                    <th className="data-color" style={{  width:'10rem' }} >Bottom 2</th>
                                    <th className="data-color" style={{  width:'10rem' }} rowSpan={1} >Value</th>
                                    <th className="data-color" style={{  width:'10rem' }} rowSpan={1} >Judgement</th>
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
                                                                <tr className="highlight-point">
                                                                    {j === 0 && k === 0  && jigs > 1 && <td className="dimension-title" rowSpan={row * layers}>Jig {i+1}</td>}
                                                                    {k === 0  && <td  className="dimension-title" rowSpan={layers}>Row {j+1}</td>}
                                                                    <td>{k+1}</td>
                                                                    <td><input 
                                                                            id={`top1_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                            onChange={(e)=>setPerpenD?.((prev)=>({
                                                                                ...prev,
                                                                                [j+1]:{
                                                                                    ...prev[j+1],
                                                                                    [`top1_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                }
                                                                            }))} 
                                                                            value={perpenD[j+1]?.[`top1_jig${i+1}_row${j+1}_layer${k+1}`]? perpenD[j+1]?.[`top1_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                            onKeyDown={(e)=>handleKeyDown(e)} disabled={status}/></td>
                                                                    <td>
                                                                        <input
                                                                            id={`bottom1_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                            onChange={(e)=>setPerpenD?.((prev)=>({
                                                                                ...prev,
                                                                                [j+1]:{
                                                                                    ...prev[j+1],
                                                                                    [`bottom1_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                }
                                                                            }))}  
                                                                            value={perpenD[j+1]?.[`bottom1_jig${i+1}_row${j+1}_layer${k+1}`]? perpenD[j+1]?.[`bottom1_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                            onKeyDown={(e)=>handleKeyDown(e)} disabled={status}/>
                                                                    </td>
                                                                    <td>
                                                                        <input 
                                                                            id={`top2_jig_${i+1}_row${j+1}_layer${k+1}`}
                                                                            onChange={(e)=>setPerpenD?.((prev)=>({
                                                                                ...prev,
                                                                                [j+1]:{
                                                                                    ...prev[j+1],
                                                                                    [`top2_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                }
                                                                            }))}
                                                                            value={perpenD[j+1]?.[`top2_jig${i+1}_row${j+1}_layer${k+1}`]? perpenD[j+1]?.[`top2_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                            onKeyDown={(e)=>handleKeyDown(e)} disabled={status}/></td>
                                                                    <td>
                                                                        <input
                                                                            id={`bottom2_jig${i+1}_row${j+1}_layer${k+1}`}
                                                                            onChange={(e)=>setPerpenD?.((prev)=>({
                                                                                ...prev,
                                                                                [j+1]:{
                                                                                    ...prev[j+1],
                                                                                    [`bottom2_jig${i+1}_row${j+1}_layer${k+1}`]:e.target.value
                                                                                }
                                                                            }))}  
                                                                            value={perpenD[j+1]?.[`bottom2_jig${i+1}_row${j+1}_layer${k+1}`]? perpenD[j+1]?.[`bottom2_jig${i+1}_row${j+1}_layer${k+1}`]:null}
                                                                            onKeyDown={(e)=>handleKeyDown(e)} disabled={status}/></td>
                                                                    <td className={judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].theme ? judgementPerpen[i+1] ?.[j+1]?.[k+1].theme : null}>
                                                                        {judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].max ? judgementPerpen[i+1] ?.[j+1]?.[k+1].max : null}
                                                                    </td>
                                                                    <td className={judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].theme ? judgementPerpen[i+1] ?.[j+1]?.[k+1].theme : null}>
                                                                        {judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].judgement ? judgementPerpen[i+1] ?.[j+1]?.[k+1].judgement : null}
                                                                    </td>
                                                                    <td className={judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1].finalTheme ? judgementPerpen[i+1] ?.[j+1]?.[k+1].finalTheme : null}>
                                                                        {judgementPerpen && judgementPerpen[i+1] && judgementPerpen[i+1] ?.[j+1] && judgementPerpen[i+1] ?.[j+1]?.[k+1] &&judgementPerpen[i+1] ?.[j+1]?.[k+1].final ? judgementPerpen[i+1] ?.[j+1]?.[k+1].final : null}
                                                                    </td>
                                                                </tr>
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
                <CountingGraph process={'slicing'}  maxperpen={0.08}  perpendicularity={perpenAverage}/>
            </div>
        </div>
    )
}