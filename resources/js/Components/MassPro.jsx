import '../../css/app.css'
export default function MassPro({max,min,target,handleKeyDown ,numberOfPoints , dimension ='Thickness' , massProForm ,setMassProForm,currentStatus,edit}){
    console.log("Masspro: ",massProForm,currentStatus);
        
    const MinNum =  Number(min)
    const MaxNum = Number(max)
    const TargetNum = Number(target)
    const statusDecision= {
        Accept:'magnet within specs',
        Max:'magnet within maximum range',
        Min:'magnet within minimum range'
    }
    const judgementPerPoint=(data)=>{
        const dataCompile ={}
        const spcControl = {}
       

        Object.entries(massProForm).map(([key,values])=>{

           let minX = false;
           let max2 =false;
           let count = 0
           let point = 0;
           let average = 0;
           let currentJudgement = false
           let judegementPerPiece = false
           let theme = false
           let rpoint = false
           let countRpoint = 0
           Object.entries(values).map(([key2,values2])=>{
            
                minX = !minX &&  Number(values2) !==  0? Number(values2):  Number(values2) > 0 &&   Number(values2) !==  0 &&  Number(values2) < minX ? Number(values2): minX
                max2 = !max2 &&  Number(values2) !==  0 ? Number(values2):  Number(values2) > 0 &&   Number(values2) !==  0 &&  Number(values2) > max2 ? Number(values2): max2 

                count += 1
                average = point += Number(values2) 
                console.log('MIn' , MinNum , MinNum + 0.01 ,Number(values2) <=  MinNum + 0.01);
                //Per point judgement
                const pointJudegement = 
                          Number(values2) !== 0 &&  Number(values2) <  TargetNum - 0.01  || Number(values2) !== 0 &&  Number(values2)  >=  MaxNum - 0.01 && Number(values2) <= MaxNum ? "For Adjustment"
                        : Number(values2) !== 0 &&  Number(values2) > MaxNum ? "Reject"
                        : Number(values2) !== 0  ? 'Accept'
                        : false

               currentJudgement = pointJudegement
            console.log('judegementttt: ' ,currentJudgement , judegementPerPiece);
               //Judgement Per Piece final judgement
               if(currentJudgement === 'Reject'){ 
                    judegementPerPiece = 'Reject' 
                    theme = 'reject-masspro'
                }else if(currentJudgement === 'For Adjustment' ){
                    judegementPerPiece = 'For Adjustment'
                    theme = 'adjust-masspro'
                }else if(currentJudgement === 'Accept' && (judegementPerPiece !== 'Reject' && judegementPerPiece !== 'For Adjustment') ){
                    judegementPerPiece = 'Accept'
                    theme = 'accept-masspro'
                }
                    
               
               
                
                dataCompile[key] ={
                    ...dataCompile[key],
                    [`p${count}`]: pointJudegement,
                    judegementPerPiece:judegementPerPiece
                    
                }

           })
           

           const currentTarget = Number(target)
           const worst = currentTarget - minX > max2 - currentTarget  ? minX:max2
           const statusWorst = (minX || max2) && currentTarget - minX > max2 - currentTarget  ? 'Min'
                 : (minX || max2) && max2 - currentTarget > currentTarget - minX   ? 'Max'
                 : null

           //R point computation
           if(minX && max2 ){
                rpoint += max2 - minX
           }

           dataCompile[key] = {
                ...dataCompile[key],
                min: minX,
                max: max2,
                r_point: minX && max2 ? rpoint:false,
                average: average > 0 ?average/count:false,
                statusWorst : statusWorst,
                worst:worst,
                theme:theme ? theme :false
            };

        })
       
        return dataCompile;
    }

    const handleAverage =(array,parameter)=>{
        if(!array) return;
        const resultArray = []
        Object.entries(array).map(([key,value])=>{
            console.log('Average: ',key,value?.[parameter]);
            resultArray.push(value?.[parameter])
        })
        return resultArray
    }

    const handleCurrentData =()=>{
        if(!massProForm) return;
        const perPiece = judgementPerPoint(massProForm);
        return perPiece;
    }
    
    const judegement = handleCurrentData(massProForm);
  
   
    console.log('judgement: ' , judegement );
    return(
        <div className="details-white">
            <div className='container-column'>
                <div className='container-theme-black'>
                    <h1>{dimension}</h1>
                    <p>Minimum:&nbsp;{min}&nbsp;Target:&nbsp;{target}&nbsp;Maximum:&nbsp;{max}</p>
                </div>
                <table className='masspro-table' border={1}>
                    <thead>
                        <tr>
                            <th className="dimension-title" colSpan={20}>ACTUAL DIMENSION</th>
                        </tr>
                        <tr>
                            <th className="sn-color" rowSpan={2}>S/N</th>
                            <th className="data-color" colSpan={5}>Data</th>
                            <th className="data-color" colSpan={5}>Judgement</th>
                            <th rowSpan={2} className='judgement-color'>Judgement/Piece</th>
                            <th rowSpan={2} className='status-color'>Status</th>
                            <th rowSpan={2} className='max-color'>MIN</th>
                            <th rowSpan={2} className='min-color'>MAX</th>
                            <th rowSpan={2} className='judgement-color'>Remarks</th>
                            <th rowSpan={2} className="worst">Worst</th>
                        </tr>
                        <tr>
                            <th className='td-color'>Pt. 1</th>
                            <th className='td-color'>Pt. 2</th>
                            <th className='td-color'>Pt. 3</th>
                            <th className='td-color'>Pt. 4</th>
                            <th className='td-color'>Pt. 5</th>
                            <th className='td2-color'>Pt. 1</th>
                            <th className='td2-color'>Pt. 2</th>
                            <th className='td2-color'>Pt. 3</th>
                            <th className='td2-color'>Pt. 4</th>
                            <th className='td2-color'>Pt. 5</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            Array.from
                            (
                                {length:numberOfPoints},(_,i)=>
                                <tr key={i+1}>
                                    <td className='number-count'>{i+1}</td>
                                    <td>    
                                        <input 
                                            value={massProForm[i+1]?.p1}
                                            type="number" 
                                            onChange={(e)=>setMassProForm((prev)=>({
                                                        ...prev,
                                                        [i+1]:{
                                                            ...prev[i+1],
                                                            [`p1`]:e.target.value
                                                        }
                                            }))} 
                                            onKeyDown={(e)=>handleKeyDown(e)}
                                            disabled={(currentStatus || edit)}/>
                                            
                                    </td>
                                    <td>
                                        <input 
                                            type="number"
                                            value={massProForm[i+1]?.p2}
                                            onChange={(e)=>setMassProForm((prev)=>({
                                                        ...prev,
                                                        [i+1]:{
                                                            ...prev[i+1],
                                                            [`p2`]:e.target.value
                                                        }
                                            }))}  
                                            onKeyDown={(e)=>handleKeyDown(e)}
                                            disabled={(currentStatus || edit)}/>
                                    </td>
                                    <td>
                                        <input 
                                            type="number"
                                            value={massProForm[i+1]?.p3}
                                            onChange={(e)=>setMassProForm((prev)=>({
                                                        ...prev,
                                                        [i+1]:{
                                                            ...prev[i+1],
                                                            [`p3`]:e.target.value
                                                        }
                                            }))}  
                                            onKeyDown={(e)=>handleKeyDown(e)}
                                             disabled={(currentStatus && !(edit))}/>
                                    </td>
                                    <td>
                                        <input 
                                            type="number"
                                            value={massProForm[i+1]?.p4}
                                            onChange={(e)=>setMassProForm((prev)=>({
                                                        ...prev,
                                                        [i+1]:{
                                                            ...prev[i+1],
                                                            [`p4`]:e.target.value
                                                        }
                                            }))}  
                                            onKeyDown={(e)=>handleKeyDown(e)}
                                             disabled={(currentStatus && !(edit))}/>
                                    </td>
                                    <td>
                                        <input 
                                            type="number"
                                            value={massProForm[i+1]?.p5}
                                            onChange={(e)=>setMassProForm((prev)=>({
                                                        ...prev,
                                                        [i+1]:{
                                                            ...prev[i+1],
                                                            [`p5`]:e.target.value
                                                        }
                                            }))}  
                                            onKeyDown={(e)=>handleKeyDown(e)}
                                            disabled={(currentStatus && !(edit))}/>
                                    </td>
                                    <td className={judegement[i + 1]?.theme && judegement[i + 1]?.p1?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.p1 !== undefined? judegement[i+1].p1:null}</td>
                                    <td className={judegement[i + 1]?.theme && judegement[i + 1]?.p2?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.p2 !== undefined? judegement[i+1].p2:null}</td>
                                    <td className={judegement[i + 1]?.theme && judegement[i + 1]?.p3?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.p3 !== undefined? judegement[i+1].p3:null}</td>
                                    <td className={judegement[i + 1]?.theme && judegement[i + 1]?.p4?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.p4 !== undefined? judegement[i+1].p4:null}</td>
                                    <td className={judegement[i + 1]?.theme && judegement[i + 1]?.p5? judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.p5 !== undefined? judegement[i+1].p5:null}</td>
                                    <td className={judegement[i + 1]?.theme ?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.judegementPerPiece !== undefined? judegement[i+1].judegementPerPiece:null}</td>
                                    <td className={judegement[i + 1]?.theme ?judegement[i + 1]?.theme :'point-status'}>{judegement && judegement[i + 1]?.judegementPerPiece === 'Accept'?statusDecision?.[judegement[i+1].judegementPerPiece]:judegement[i+1] && judegement[i+1].statusWorst !== undefined?statusDecision?.[judegement[i+1].statusWorst]:null}</td>
                                    <td className={judegement[i + 1]?.theme ?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.min !== undefined? judegement[i+1].min:null}</td>
                                    <td className={judegement[i + 1]?.theme ?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.max !== undefined? judegement[i+1].max:null}</td>
                                    <td className={judegement[i + 1]?.theme ?judegement[i + 1]?.theme :'point-remarks'}>
                                        {
                                            judegement && judegement[i + 1]?.judegementPerPiece !== undefined && judegement[i + 1]?.judegementPerPiece === 'Accept' ? 'GOOD DIMENSION, PROCEED'
                                            :<input disabled={(currentStatus ) && !(edit)}></input>
                                        }
                                    </td>
                                    <td className={judegement[i + 1]?.theme ?judegement[i + 1]?.theme :'point-masspro'}>{judegement && judegement[i + 1]?.worst !== undefined? judegement[i+1].worst:null}</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>            

    )
}